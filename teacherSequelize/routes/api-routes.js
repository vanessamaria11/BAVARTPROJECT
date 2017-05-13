var path = require("path");
var multer  = require('multer')
var upload = multer({ dest: './public/uploads/' });
var fs = require("fs");
var basename  = path.basename(module.filename);
var db = require("../models");

// var env       = process.env.NODE_ENV || 'development';
// var config    = require(__dirname + '/../config/config.json')[env];
// var db        = {};
// var express    = require('express'),
// 	 mysql      = require('mysql');

// // Application initialization

// var connection = mysql.createConnection({
//         host     : 'localhost',
//         user     : 'vanessaotto',
//         password : 'L2lah2l2lah2',
//         database: 'teacher_sequelize'
//     });
// connection.connect();

module.exports = function(app) {
	// Each of the below routes just handles the HTML page that the user gets sent to.

	// index route loads view.html
	// app.get("/", function(req, res) {
	// 	//res.sendFile(path.join(__dirname, "../public/blog.html"));
	// 	res.end("Hello");
	// });
	// POST route for saving a new post
	app.post("/api/image", upload.array('photos', 12), function(req, res, next) {
		//db.Post.create(req.body).then(function(dbPost) {
			//res.json(dbPost);
		//});
		//req.files
		var upload = req.files[0];
		var extArray = upload.originalname.split('.');
		var record = [
			upload.originalname,
			upload.mimetype,
			extArray[extArray.length - 1],
			upload.path
		];
		console.log(db.image);
		db.image.create({ 
			name: upload.originalname, 
			type: upload.mimetype, 
			extension: extArray[extArray.length - 1], 
			data: upload.path
		}).then(function(record){
			console.log(record);
		})
		// connection.query('INSERT INTO images SET `name` = ?, `type` = ?, extension = ?, `data` = ?, createdAt = NOW(), updatedAt = NOW() ', record, 
	 //        function (err, result) {
	 //        	if (err) throw err;
	 //            res.send('User added to database with ID: ' + result.insertId);
	 //        }
	 //    );	
		console.log(req.files);
		// res.json({
		// 	result: "new upload with data"
		// });
		res.redirect("/");
	});
	app.get("/api/getimage/:imagefilename", function(req, res){
		//fullsizeoutput_1b0c.jpeg
		db.image.findOne({
			where:{
				name: req.params.imagefilename
			}
		}).then(function(imageRecord){
			var simple = imageRecord.get({plain:true});
			// console.log(simple);
			var imageData = fs.readFileSync(__dirname + '/../'+ simple.data);
			//res.writeHead({"Content-Type" : simple.type});
     		res.writeHead(200, {'Content-Type': simple.type });
     		res.end(imageData, 'binary');
			//this is what we need to work on^^^ "writeHead"
 		
		});
		
	// fs.readdir(__dirname + '/../public/uploads', function (error, images){
 //    console.log(images);

 //    var randomImg = images[Math.floor((Math.random()*images.length)+1)]
 //    console.log(randomImg);
 //    var imageData = fs.readFileSync(__dirname + '/../public/uploads/'+ randomImg);
 //    res.send(imageData);
  //});

	})
};