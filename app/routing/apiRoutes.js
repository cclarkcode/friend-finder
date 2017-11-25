var express = require('express');
var path = require('path');
var friends = require('../data/friends.js');

var router = express.Router();

router.route('/friends').get(getfriends);
router.route('/friends').post(addfriend);

function getfriends (request,result) {

	console.log('Got here');
	result.json(friends);

}

function addfriend (request,result) {

	var newfriend = request.body;

	console.log(newfriend);

	// Allows postman to add entries
	if (typeof newfriend.scores === 'string') {
			
			newfriend.scores = newfriend.scores.split(',');
		
		}
	

	friends.push(newfriend);

	result.json(findfriend(newfriend));

	

}

function findfriend (current) {

	var matchindex = 0;
	var matchscore = 0;

	
	//Terrible, stupid, inelegant fix to issue involving brackets being included in the 'scores' key name within my survey post object
	if (current.scores === undefined) {
		current.scores = current['scores[]'];
		delete current['scores[]'];
	}

	//Increment over friends array 
	for (var i = 0; i < friends.length-1; i++) {
		var currentscore=0;
		//Increment over scores for each friend
		for (var j = 0; j < 10; j++) {
 		currentscore += Math.abs(parseInt(friends[i].scores[j]) - parseInt(current.scores[j]));
 		}

 		//Check if first comparison to automatically use this score as the benchmark for matching
 		if  (i===0) {
 			matchscore = currentscore
 		} //Otherwise, check if score for current comparison is less than previously found
 		else if(currentscore < matchscore) {
 			matchindex = i;
 			matchscore = currentscore;
 		}
		
	}

	return friends[matchindex];
}


module.exports = router;

