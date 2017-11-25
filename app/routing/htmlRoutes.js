
var express = require('express');
var path = require('path');

var router = express.Router();

router.route('/:path').get(otherpaths);
router.route('/').get(homepage)

function homepage (request,result) {

	result.sendFile(path.join(__dirname, "../public/home.html"));

}

function otherpaths (request,result) {

	switch (request.params.path.toLowerCase()) {
		case 'survey':
			result.sendFile(path.join(__dirname, "../public/survey.html"));
		break;
		default:
			result.redirect('/');
	}

}

module.exports = router;