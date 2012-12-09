/**
 *  This Module Abstracts the generate.js module, to generate new files with just a 1 line of Code.
 */

/**
 *  Load Dependencies.
 */
var fs = require('fs'),
	createDocs = require('../lib/generate').createDocs();


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
 *	Abstracts the generate.js module, to create New Documents on the fly with POST Data inside.
 *
 *	@param {Object} req - Native node.js HTTP Request Object
 *	@param {Object} res - Native node.js HTTP Response Object
 *	@param {Function} callback - A function callback that will do some stuff.
 *	@return {String} editHash - A hashed String. This is the name of the new created (editable) file.
 */
exports.post = function (req, res, callback) {
	var publicHash = createHash(),
		editHash = createHash(),
		dataReceived = null,
		mode = null,
		theme = null,
		TAContent = null,
		CMContent = null;

	// This piece of code enables page re-saves.
	if (req.body.saveToEdit && req.body.saveToPublic) {
		console.log('Public: ' + req.body.saveToPublic)
		console.log('Editable: ' + req.body.saveToEdit)

		var editFilename = process.cwd() + '/public/editableDocsURLs/' + req.body.saveToEdit,
			publicFilename = process.cwd() + '/public/publicUserSavedDocsURLs/' + req.body.saveToPublic;
	} else {		
		var editFilename = process.cwd() + '/public/editableDocsURLs/' + editHash,
			publicFilename = process.cwd() + '/public/publicUserSavedDocsURLs/' + publicHash;
	}

	// 1. There's text ONLY on the TextArea div.
	if (req.body.textArea && !req.body.textAreaCode) {
		dataReceived = req.body.textArea;

		createDocs.textArea({ edit: editFilename, public: publicFilename, hash: publicFilename.slice(publicFilename.lastIndexOf('/') + 1), content: dataReceived }, function () {

			callback();
		});

		console.log('There is text ONLY on the TextArea div');
	}

	// 2. There's text ONLY on the CodeMirror Div
	if (req.body.textAreaCode && !req.body.textArea) {
		dataReceived = req.body.textAreaCode;
		theme = req.body.theme;
		mode = req.body.mode;

		createDocs.codeMirror({ edit: editFilename, public: publicFilename, hash: publicFilename.slice(publicFilename.lastIndexOf('/') + 1), content: dataReceived, mode: mode, theme: theme }, function () {

			callback();
		});

		console.log('There is text ONLY on the CodeMirror Div');
	}

	// 3. There's text on BOTH TextArea and TextAreaCode Div.
	if (req.body.textArea && req.body.textAreaCode) {
		TAContent = req.body.textArea;
		CMContent = req.body.textAreaCode;
		theme = req.body.theme;
		mode = req.body.mode;

		createDocs.both({ edit: editFilename, public: publicFilename, hash: publicFilename.slice(publicFilename.lastIndexOf('/') + 1), TAContent: TAContent, CMContent: CMContent, mode: mode, theme: theme }, function () {

			callback();
		});

		console.log('There is text on BOTH TextArea and TextAreaCode Div.');
	}

	return editFilename.slice(editFilename.lastIndexOf('/') + 1);
};