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

function generateWords(){
	let first = (_.random(3) % 2) ? 'red' : 'blue';
	let words = _.sampleSize(CodeNameWords, 25).map((word, idx)=>{
		let team = 'white';  // invalid team
		if (idx === 0){team = 'black';}
		if (1 <= idx && idx <= 8) {team = 'red';}  // 1 to 8 inclusive
		if (9 <= idx && idx <= 16) {team = 'blue';}
		if (17 <= idx && idx <= 23) {team = 'yellow';}
		if (idx === 24) {team = first;}
		return {word, team, ischosen: false};
	});
	words = _.shuffle(words);
	return {first, words};
}

Meteor.methods({
	'freelancecourtyard:codenames/createGame': function(redteam, blueteam, wordcount = 25){
		// team = {cluegiver, others}  // player ids
		let {first, words} = generateWords();
		return CodeNamesCollection.insert({
			// TODO: fill in
			teams: [
				// players
				{team: 'red', cluegiver: '', teammates: []},
				{team: 'blue', cluegiver: '', teammates: []},
			],
			active_team: first,
			words,
			status: 'waiting for players',
		});
	},
});