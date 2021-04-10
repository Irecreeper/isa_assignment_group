/* jshint esversion: 8 */
const http = require("http");
const url = require("url");
const mysql = require("mysql");

const db = mysql.createConnection({
	host: "localhost",
	user: "bcitchai_admin",
	password: "admin4242",
	database: "bcit_ruingrader"
});

db.connect(function (err) {
	if (err) {
		throw err;
	}
});

http.createServer(function (req, res) {
	//Get some information on the URL. Just in case.
	let urlData = url.parse(req.url, true);
	let method = req.method; //get, post, put, delete
	let requestType = urlData.pathname; //key, user, class, grade
	let apiKey = urlData.query.apikey;

	//Define some headers to accept all kinds of requests.
	const headers = {
		"Content-Type": "text/html", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, OPTIONS"
	};
	res.writeHead(200, headers);

	//OPTIONS path: properly translates into a different kind of request
	if (method == "OPTIONS") {
		res.writeHead(204, headers);
		res.end();
		return;
	}

	//Special Path: User Generation. Can be accessed without an account or a key.
	if (method == "POST" && requestType == "/user") {
		 //Get and translate the "send" data.
		 let item = "";
		 req.on('data', chunk => {
			 item += chunk;
		 });
		 
		//Wait for the item to finish building.
		req.on('end', () => {
			//Assemble.
			let json_object = JSON.parse(item);
			let username = json_object.username;
			let password = json_object.password; 
			let fname = json_object.fname;
			let lname = json_object.lname;

			//Add to the database.
			let sqlPost = "INSERT INTO user (username, password_hashed, fname, lname) VALUES ('" + username + "', '" + password + "', '" + fname + "', '" + lname + "')";
			db.query(sqlPost, function(err, result) {
				if (err != null) {
					res.end("Post failed.");
					throw err;
				}

				res.end("Post succeeded!");
			});
		});
	}

	//Special Path: Key Request / Generation. Can be accessed without key verification.
	if (method == "GET" && requestType == "/key") {
		
		//First, verify the user's password.
		let notedId = -1;
		let password = urlData.query.password;
		let username = urlData.query.username;
		let passwordCheck = new Promise(function(verSuc, verRip) {
			let sqlCheck = "SELECT password_hashed, user_id FROM user WHERE username = '" + username + "'";
			db.query(sqlCheck, function (err, result){
				if (err) {
					verRip();
					throw err;
				}

				if (result.length > 0 && result[0].password_hashed == password) {
					notedId = result[0].user_id;
					verSuc();
				} else {
					verRip();
				}
			});
		});

		//If we verified, go forth and give the user a key. Otherwise, rippp
		passwordCheck.then(
			function verSuc() {
				//Generate a key!
				let key = keyGen(25);
				
				//Add the key to the database.
				let sqlInsert = "INSERT INTO api_keys(key_actual, user_id) VALUES ('" + key + "', '" + notedId + "')";
				db.query(sqlInsert, function (err, result) {
					if (err) {
						throw err;
					}
					console.log("Key added.");
				});

				//Return the key to the user.
				res.end(key);
			},
			function verRip() {
				console.log("Password verification failed.");
				res.end("Failure...");
			}
		);
	}

	//Get verification before continuing. Check if key is on server.
	let verified = false;
	let notedId = -1;
	let verification_check = new Promise(function(verSuc, verRip) {
		let sqlSelect = "SELECT key_actual, user_id FROM api_keys WHERE key_actual = '" + apiKey + "'";
		db.query(sqlSelect, function (err, result) {
			if (err) {
				verRip();
				throw err;
			}

			if (result.length > 0 && result[0].key_actual == apiKey) {
				notedId = result[0].user_id;
				verSuc();
			} else {
				verRip();
				res.end(); //early death
			}
		});
	});

	verification_check.then(
		function verSuc() {verified = true; console.log("Verification succeeded!~");},
		function verRip() {res.end(); console.log("Verification failed...");}
	);

	if (verified) {
		//GET path: gets information from the server (3 branches)
		//users, classes, grades
		if (method == "GET") {
			//First, go select the proper query.
			let sqlGet = "err";
			if (requestType == "/user") { //USER: Obtains information on the user with the key. Requires nothing special.
				//Obtain required elements.
				sqlGet = "SELECT * FROM user WHERE user_id = " + notedId;
			} else if (requestType == "/class") { //CLASS: Obtains information on all the classes. Requires nothing special.
				sqlGet = "SELECT * FROM class WHERE class.user_id = " + notedId;
			} else if (requestType == "/grade") { //GRADES: Obtains information on grades for a class. Requires CLASSNAME.
				let classname = urlData.query.classname;
				sqlGet = "SELECT grade.grade_id, grade.class_id, grade.name, grade.score " + 
				"FROM grade " +
				"INNER JOIN class ON grade.class_id = class.class_id " +
				"WHERE class.user_id = " + notedId + " AND class.name = '" + classname + "'";
			} else { //Basically a failure state.
				res.end();
			}
			
			//Perform the query!
			if (sqlGet != "err") {
				db.query(sqlGet, function (err, result) {
					if (err) {
						res.end();
						throw err;
					}

					let item = JSON.stringify(result[0]);
					res.end(item);
				});
			}
		}



		//POST path: puts data onto the server (3 branches)
		//classes, grades (user is handled elsewhere)
		if (method == "POST") {
			//Get and translate the "send" data.
			let item = "";
			req.on('data', chunk => {
				item += chunk;
			});
			
		   	//Wait for the item to finish building.
		   	req.on('end', () => {
			   	//Assemble.
			   	let json_object = JSON.parse(item);

				//Select the proper query.
				let sqlPost = "err";
				if (requestType == "/class") { //CLASS: Posts the class. Requires nothing special.
					let classname = json_object.name;
					sqlPost = "INSERT INTO class (name, user_id) VALUES ('" + classname + "', " + notedId + ")";
				} else if (requestType == "/grade") { //GRADE: Posts the grade. Requires the class to associate it with.
					let classname = urlData.query.classname;
					let gradename = json_object.name;
					let score = json_object.score;
					sqlPost = "INSERT INTO grade (class_id, name, score) " + //subquery!
					"SELECT class_id, '" + gradename + "', " + score + " FROM class " +
					"WHERE name = '" + classname + "' AND user_id = " + notedId;
				}	
				
				if (sqlPost != "err") {
					//Add to the database.
					db.query(sqlPost, function(err, result) {
						if (err != null) {
							res.end("Post failed.");
							throw err;
						}
						res.end("Post succeeded!");
					});
				} else {
					res.end("Post failed.");
				}
		  	});
		}



		//PUT path: edits data that's on the server (2 branches)
		//users, classes, grades
		if (method == "PUT") {
			//Get and translate the "send" data.
			let item = "";
			req.on('data', chunk => {
				item += chunk;
			});
			
		   	//Wait for the item to finish building.
		   	req.on('end', () => {
			   	//Assemble.
			   	let json_object = JSON.parse(item);

				//Select the proper query.
				let sqlPut = "err";
				if (requestType == "/user") { //USER: Edits the user. Requires nothing special.
					let username = json_object.username;
					let password = json_object.password; 
					let fname = json_object.fname;
					let lname = json_object.lname;
					sqlPut = "UPDATE user SET username = '" + username + "', password_hashed = '" +  password + "', fname = '" + fname +  "', lname = '" + lname + "' " +
					"WHERE user_id = " + notedId;
				}else if (requestType == "/class") { //CLASS: Edits the class. Requires CLASSNAME.
					let oldclass = urlData.query.classname;
					let classname = json_object.name;
					sqlPut = "UPDATE grade SET name = '" + classname + "' WHERE user_id = " + notedId + " AND name = '" + oldclass + "'";
				} else if (requestType == "/grade") { //GRADE: Edits the grade. Requires CLASSNAME and GRADENAME. You CANNOT move grades between classes.
					let classbelong = urlData.query.classname;
					let oldgrade = urlData.query.gradename;
					let gradename = json_object.name;
					let score = json_object.score;
					sqlPut = "UPDATE grade SET name = '" + gradename + "', score = " + score + " " +
					"WHERE name = '" + oldgrade + "' AND class_id IN " + 
					"(SELECT class_id FROM class WHERE user_id = " + notedId + " AND name = '" + classbelong + "')";
				}	
				
				if (sqlPut != "err") {
					//Add to the database.
					db.query(sqlPost, function(err, result) {
						if (err != null) {
							res.end("Put failed.");
							throw err;
						}
						res.end("Put succeeded!");
					});
				} else {
					res.end("Put failed.");
				}
		  	});
		}



		//DELETE path: deletes data that's on the server (2 branches)
		//classes, grades
		if (method == "DELETE") {

		}
	}

}).listen(8888);
console.log("App is running...");

// = = = = = Helper functions.
//Generates a random int.
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

//Generates a key.
function keyGen(keylen) {
	let key = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < keylen; i++) {
		let position = getRandomInt(possible.length);
		key += possible.charAt(position);
	}
	return key;
}