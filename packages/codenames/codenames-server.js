export { CodeNamesCollection };
export { CodeNameWords };

// publish CodeNamesCollection
import { _ } from 'lodash';

//crypto.getRandomValues(new Uint8Array(1))[0];
function csRandom(bound = 255) {
	let array = null;
	if (bound <= 255) {
		array = new Uint8Array(1);
	} else if (bound <= 65535) {
		array = new Uint16Array(1);
	} else {
		// 4294967295
		array = new Uint32Array(1);
	}
	let random = crypto.getRandomValues(array)[0];
	// should repeat, remainder discard
	return random;
}

function generateWords(wordcount = 25){
	let first = (_.random(3) % 2) ? 'red' : 'blue';
	let words = _.sampleSize(CodeNameWords, wordcount).map((word, idx)=>{
		//TODO: account for wordcount different from 25
		let team = 'white';  // invalid team
		if (idx === 0){team = 'black';}
		if (1 <= idx && idx <= 8) {team = 'red';}  // 1 to 8 inclusive
		if (9 <= idx && idx <= 16) {team = 'blue';}
		if (17 <= idx && idx <= 23) {team = 'yellow';}
		if (idx === 24) {team = first;}
		return {word, team, isChosen: false};
	});
	words = _.shuffle(words);
	return {first, words};
}

Meteor.publish('CodeNames_Games', function (options) {
	if ( !options ) {
		options = {};
	}

	return CodeNamesCollection.find({},
		options
	);
});

Meteor.methods({
	'freelancecourtyard:codenames/createGame': function(redteam, blueteam, wordcount = 25) {
		//WARNING: work in progress
//		console.log('freelancecourtyard:codenames/createGame',redteam,blueteam,wordcount)
		// team = {cluegiver, others}  // player ids
		let {first, words} = generateWords(wordcount);
		let gameId = CodeNamesCollection.insert({
			// TODO: fill in
			active_team: first,
			status: 'waiting for players',
			is_revealed: false,
			teams: [
				// players
				{team: 'red', cluegiver: '', teammates: []},
				{team: 'blue', cluegiver: '', teammates: []},
			],
			words,
		});
//		console.log('gameId',gameId)
		return gameId;
	},
	'freelancecourtyard:codenames/removeGame': function(gameId) {
		return CodeNamesCollection.remove({_id: gameId});
	},
	'freelancecourtyard:codenames/revealGame': function(gameId, isRevealed = true) {
		return CodeNamesCollection.update({_id: gameId}, {$set:{is_revealed: isRevealed}});
	},
	'freelancecourtyard:codenames/selectWord': function(gameId, index) {
		let wordKey = 'words.'+index+'.isChosen';
		return CodeNamesCollection.update({_id: gameId}, {$set:{[wordKey]: true}});
	},
});
