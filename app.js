/* jshint esversion: 8 */
const http = require("http");
const url = require("url")
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
	};
});

http.createServer(function (req, res) {
	//Get some information on the URL. Just in case.
	let urlData = url.parse(req.url, true);
	let requestType = urlData.query["type"];

	//Define some headers to accept all kinds of requests.
	const headers = {
		"Content-Type": "text/html", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, OPTIONS"
	};
	res.writeHead(200, headers);

	//OPTIONS path: properly translates into a different kind of request
	if (req.method == "OPTIONS") {
		res.writeHead(204, headers);
		res.end();
		return;
	}

	//Special Path: Key Request / Generation. Can be accessed without verification.
	if (req.method == "GET" && requestType == "key") {
		//Generate a key!
		let key = keyGen(25);
		
		//Add the key to the database.
		let sqlInsert = "INSERT INTO api_keys(key_actual) VALUES ('" + key + "')";
		db.query(sqlInsert, function (err, result) {
			if (err) {
				throw err;
			}
			console.log("Key added.");
		});

		//Return the key to the user.
		res.end(key);
	}

	//Get verification before continuing. Check if key is on server.
	let verified = false;

	if (verified) {
		//GET path: gets information from the server (3 branches)

		//POST path: puts data onto the server (3 branches)

		//PUT path: edits data that's on the server (2 branches)

		//DELETE path: deletes data that's on the server (2 branches)
	}
}).listen(8888);
console.log("App is running...");

//Helper functions.
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function keyGen(keylen) {
	let key = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < keylen; i++) {
		let position = getRandomInt(possible.length);
		key += possible.charAt(position);
	}
	return key;
}