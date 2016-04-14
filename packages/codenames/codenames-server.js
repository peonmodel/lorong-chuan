export { CodeNamesCollection };
export { CodeNamesWordPool };

// publish CodeNamesCollection
import { _ } from 'lodash';

//crypto.getRandomValues(new Uint8Array(1))[0];
// just a vanity better random values
// for purpose of games, _.random is good enough
// generates 0 <= n < bound
function csRandom(bound = 256) {
	let array = null;
	let step = 256;
	
	if (bound <= 256) {
		step = 256;
		array = new Uint8Array(1);
	} else if (bound <= 65536) {
		step = 65536;
		array = new Uint16Array(1);
	} else if (bound <= 4294967296) {
		step = 4294967296;
		array = new Uint32Array(1);
	} else {
		return null;
	}
	let divisor = Math.floor(step/(bound));
	let remainder = step % (bound);
	let random = 0;
	do {
		// reject values that are remainders
		random = crypto.getRandomValues(array)[0];
	} while (random >= (step - remainder));
	return Math.floor(random/divisor);
}

function generateWords(wordcount = 25){
	let first = (_.random(3) % 2) ? 'red' : 'blue';
	let words = _.sampleSize(CodeNamesWordPool, wordcount).map((word, idx)=>{
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

Meteor.publish('CodeNames_Games', function (options = {}) {
	return CodeNamesCollection.find({}, options);
});

//CodeNamesWordsCollection_G = CodeNamesWordsCollection;

//Meteor.publish('CodeNames_Words', function(game_id){
//	
//	function isClueGiver() {
//		// Meteor.userId() > is Cluegiver
//		return false;
//	}
//	
//	let giver = isClueGiver();
//	
//	return CodeNamesWordsCollection.find({game_id}, {
//		transform(obj){
//			if (giver) {return obj;}
//			if (!obj.isChosen) {delete obj.team;}
//			return obj;
//		},
//	});
//		
////	Error: Publish function returned multiple cursors for collection
//});

Meteor.publish('CodeNames_Words(Hidden)', function(game_id){
	
	function isClueGiver() {
		// Meteor.userId() > is Cluegiver
		return false;
	}
	
	let giver = isClueGiver();
	
	return CodeNamesWordsCollection.find({game_id}, {
		fields: {team: 0},
	});
});

Meteor.publish('CodeNames_Words(Chosen)', function(game_id){
	return CodeNamesWordsCollection.find({game_id, isChosen: true}, {});
});

Meteor.methods({
	'freelancecourtyard:codenames/createGame': function(redteam, blueteam, wordcount = 25) {
		//WARNING: work in progress
//		console.log('freelancecourtyard:codenames/createGame',redteam,blueteam,wordcount)
		// team = {cluegiver, others}  // player ids
		let {first, words} = generateWords(wordcount);
		
		let game_id = CodeNamesCollection.insert({
			// TODO: fill in
			active_team: first,
			status: 'waiting for players',
			is_revealed: false,
			teams: [
				// players
				{team: 'red', cluegiver: '', teammates: []},
				{team: 'blue', cluegiver: '', teammates: []},
			],
		});
		
		words.forEach((word, index)=>{
			Object.assign(word, {game_id, index});
			CodeNamesWordsCollection.insert(word);
		});
//		console.log('game_id',game_id)
		return game_id;
	},
	'freelancecourtyard:codenames/removeGame': function(gameId) {
		// TODO: cleanup the CodeNamesWordsCollection too
		return CodeNamesCollection.remove({_id: gameId});
	},
	'freelancecourtyard:codenames/revealGame': function(gameId, isRevealed = true) {
		return CodeNamesCollection.update({_id: gameId}, {$set:{is_revealed: isRevealed}});
	},
	'freelancecourtyard:codenames/selectWord': function(word_id) {
		return CodeNamesWordsCollection.update({_id: word_id}, {$set:{isChosen: true}});
	},
});
