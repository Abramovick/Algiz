/**
 *	This Module contains Request Handlers for ALL Get & POST Requests
 */

/**
 *	Load Dependencies.
 */
var fs = require('fs'),
	postHandler = require('../lib/post').post,
	uploadHandler = require('../lib/upload').upload,
	showHandler = require('../lib/upload').show;


/**
 *	Handles GET '/' Request by serving index.jade
 * 
 * @param {Object} req - Native node.js HTTP Request Object
 * @param {Object} res - Native node.js HTTP Response Object
 */
exports.index = function (req, res) {
	res.render('index', {title: 'Algiz'});
};


/**
 *	Handles POST '/post' Request
 * 
 * @param {Object} req - Native node.js HTTP Request Object
 * @param {Object} res - Native node.js HTTP Response Object
 */
exports.postData = function (req, res) {
	var path = postHandler(req, res, function () {
		res.redirect(path);
	});
};


/*
 *	Handles GET '/:path' Request
 * 
 *	@param {Object} req - Native node.js HTTP Request Object
 *	@param {Object} res - Native node.js HTTP Response Object
 */
exports.handlePath = function (req, res) {
	var editableDocsURLs = process.cwd() +  "/public/editableDocsURLs/" + req.params.path,
		publicUserSavedDocsURLs = process.cwd() +  "/public/publicUserSavedDocsURLs/" + req.params.path;

	// Asynchronously check if the file Requested on the path exists inside "/public/editableDocsURLs/" 
	fs.exists(editableDocsURLs, function (exists) {
		// If it doesnt exist there, then it must be inside "/public/publicUserSavedDocsURLs/"
		if (!exists) {
			fs.exists(publicUserSavedDocsURLs, function (exist) {
				// If its not there either, then there's no such file on disk.
				if (!exist) {
					res.writeHead(404, {"Content-Type": "text/plain"});
					res.end("404 Not Found!");
					return;
				}

				var readStream = fs.createReadStream(publicUserSavedDocsURLs);
				readStream.pipe(res);
			});

			return;
		}

		var rs = fs.createReadStream(editableDocsURLs);
		rs.pipe(res);
	});
};


/*
 *	Handles POST '/upload' Request.
 * 
 * @param {Object} req - Native node.js HTTP Request Object
 *	@param {Object} res - Native node.js HTTP Response Object
 */
exports.upload = function (req, res) {
	uploadHandler(req, res);
};


/*
 *	Handles GET '/load/:path' Request.
 * 
 * @param {Object} req - Native node.js HTTP Request Object
 * @param {Object} res - Native node.js HTTP Response Object
*/
exports.show = function (req, res) {
	showHandler(req, res, req.params.path);
};