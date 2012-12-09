/**
 *	This Module Does the Actual Uploading for the upload Request Handler function.
 */

/**
 *	Load Dependencies.
 */
var fs = require('fs'),
	mime = require('mime'),
	HTML = require('../lib/HTMLStrings').HTML,
	exec = require('child_process').exec;


/**
 *	Creates A Unique Hash
 *
 * @return {String} - Returns a unique hashed string. 
 */

function createHash() {
	'use strict';

	var alphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"], hash = alphabets[Math.floor(Math.random() * 26)].toUpperCase() + Math.floor(Math.random() * 26) + alphabets[Math.floor(Math.random() * 26)] + new Date().getTime() + alphabets[Math.floor(Math.random() * 26)] + new Date().getDate() + alphabets[Math.floor(Math.random() * 26)] + new Date().getMonth() + alphabets[Math.floor(Math.random() * 26)] + alphabets[Math.floor(Math.random() * 26)].toUpperCase() + new Date().getFullYear() + alphabets[Math.floor(Math.random() * 26)] + alphabets[Math.floor(Math.random() * 26)] + Math.floor(Math.random() * 100000);

    hash += alphabets[Math.floor(Math.random() * 26)];

    return hash;
}


/**
 *	Uploads files from the client to server at the path "C:/tmp"
 *
 * @Functionality: By default formidable puts my uploaded file in a path thats hard to find, 
	// and gives it a hashed name, therefore i should rename it to a folder i want ("tmp")
	// and generate a unique hash which would be its name.
 *
 * @param {Object} req - Native node.js HTTP Request Object
 * @param {Object} res - Native node.js HTTP Response Object
 */
exports.upload = function (req, res) {

	// by default formidable puts my uploaded file in a path thats hard to find, 
	// and gives it a hashed name, therefore i should rename it to a folder i want ("tmp")
	// and generate a unique hash which would be its name.
	var hash = createHash(),
		files = req.files,
		contentType = files.load.type,
		extension = mime.extension(contentType),
		basePath = process.cwd() + '/public/uploads/',
		path = 'C:/tmp/' + hash + "." + extension,
		loadTo = req.body.loadTo;


	fs.rename(files.load.path, path, function (err) {
		if (err) {
			throw err;
		}

		// If the user uploaded an image, then handle the rendering differently.
		if (contentType.match(/image/g) && contentType.match(/image/g) !== null) {
			res.render('uploadImage', {title: 'Algiz', path: 'load/' + hash + "." + extension });

		} else if (files.load.name.slice(files.load.name.lastIndexOf('.') + 1).match(/doc/g)) {			
			// if am working with a pdf file, i'll have to first convert it to a text file, then load the text.
			var h = createHash();
			console.log('file save to: ' + basePath + h + '.txt')
			var child = exec('antiword ' + path + ' > ' + basePath + h + '.txt', function(error, stdout, stderr) {
			    fs.readFile(basePath + h + '.txt', function (err, file) {
					var string = "";
					if (err) {
						res.writeHead(500, {"Content-Type": "text/plain"});
						res.end('404 Not Found!' + "\n");
						return;
					}

					string = file.toString();
					res.render('uploadText', {title: 'Algiz', text: string, loadTo: loadTo });
				});
			});

		} else {
			fs.readFile(path, function (err, file) {
				var string = "";
				if (err) {
					res.writeHead(500, {"Content-Type": "text/plain"});
					res.end(err.message + "\n");
					string = err.message;
					return;
				}

				string = file.toString();
				res.render('uploadText', {title: 'Algiz', text: string, loadTo: loadTo });
			});
		}
	});

	console.log(files);
	console.log("Final Content-Type: " + contentType);
	console.log("Final extension: " + extension);
	console.log("Read Path: " + path);
	console.log("Load to: " + req.body.loadTo);
};


/**
 *	For GET '/load/:path' Requests, this module gets/reads the actual files. 
 *
 * @param {Object} req - Native node.js HTTP Request Object
 * @param {Object} res - Native node.js HTTP Response Object
 */
exports.show = function (req, res, path) {
	var basePath = "C:/tmp/",
		ext = mime.lookup(path.substr(path.lastIndexOf(".") + 1));

	console.log(path);
	console.log(ext);

	if (ext.match(/image/g)) {
		fs.readFile(basePath + path, "binary", function (err, file) {
			if (err) {
				res.writeHead(500, {"Content-Type": "text/plain"});
				res.write('404 Not Found!'+ "\n");
				res.end();
				return;
			}

			res.writeHead(200, {"Content-Type": ext});
			res.write(file, "binary");
			res.end();
		});
	} else if (ext.match(/text/g)) {
		fs.readFile(basePath + path, function (err, file) {
			if (err) {
				res.writeHead(500, {"Content-Type": "text/plain"});
				res.end('404 Not Found!' + "\n");
				return;
			}

			res.writeHead(200, {"Content-Type": "text/plain"});
			res.end(file);
		});
	} else if (path.match(/doc/g)) {
		// if am working with a pdf file, i'll have to first convert it to a text file, then load the text.
		var hash = createHash();
		var child = exec('antiword ' + basePath + path + ' > ' + basePath + hash + '.txt', function(error, stdout, stderr) {
		    fs.readFile(basePath + hash + '.txt', function (err, file) {
				if (err) {
					res.writeHead(500, {"Content-Type": "text/plain"});
					res.end('404 Not Found!' + "\n");
					return;
				}

				res.writeHead(200, {"Content-Type": "text/plain"});
				res.end(file);
			});
		});
	} else {
		fs.readFile(basePath + path, function (err, file) {
			if (err) {
				res.writeHead(500, {"Content-Type": "text/plain"});
				res.end('404 Not found!' + "\n");
				return;
			}

			res.writeHead(200, {"Content-Type": ext});
			res.end(file);
		});
	}
};
