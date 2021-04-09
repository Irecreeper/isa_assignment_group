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
	let apiKey = urlData.query["apikey"];

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

	//Special Path: Key Request / Generation. Can be accessed without key verification. For obvious reasons.
	if (method == "GET" && requestType == "/key") {
		
		//First, verify the user's password.
		let notedId = -1;
		let password = urlData.query["password"];
		let username = urlData.query["username"];
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
		function verRip() {console.log("Verification failed...");}
	);

	if (verified) {
		//GET path: gets information from the server (3 branches)
		//users, classes, grades
		if (method == "GET") {
			//First, go select the proper query.
			let sqlGet = "err";
			if (requestType == "/user") { //USER: Obtains information on the specified user. Requires USERNAME.
				//Obtain required elements.
				let username = urlData.query["username"];
				sqlGet = "SELECT * FROM user WHERE username = '" + username + "'";
			} else if (requestType == "/class") { //CLASS: Obtains information on the specified class. Requires CLASSNAME.
				let classname = urlData.query["classname"];
				sqlGet = "";
			} else if (requestType == "/grade") { //GRADES: Obtains information on the specified grade. Requires CLASSNAME, GRADENAME.
				let gradename = urlData.query["gradename"];
				let classname = urlData.query["classname"];
				sqlGet = "";
			} else { //Basically a failure state.
				res.end();
			}
			
			//Perform the query!
			if (sqlGet != "err") {
				db.query(sqlGet, function (err, result) {
					if (err) {
						throw err;
					}

					let item = JSON.stringify(result[0]);
					res.end(item);
				});
			}
		}

		//POST path: puts data onto the server (3 branches)
		//users, classes, grades
		if (method == "POST") {

		}

		//PUT path: edits data that's on the server (2 branches)
		//users, classes, grades
		if (method == "PUT") {

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