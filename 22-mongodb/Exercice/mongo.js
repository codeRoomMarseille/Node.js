var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db("raspberry");
	var d = new Date();
	var n = d.toString();
	var myobj = { led: "on", date: n };
	dbo.collection("etat").insertOne(myobj, function(err, res) {
		if (err) throw err;
		console.log("1 document inserted");
	});
	dbo.collection("etat").findOne({}, function(err, result) {
		if (err) throw err;
		console.log(result.led);
		console.log(result.date);
		db.close();
	});
});
