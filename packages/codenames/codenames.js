//export const CodeNamesCollection = CodeNamesCollection;

CodeNamesCollection = new Mongo.Collection('CodeNames');

CodeNamesCollection.schema = new SimpleSchema({
	players: {
		type: [Object],
		label: 'array of players',
	},
	
	// should have teams, players, room/game id
	'words': {
		type: [Object],
		label: 'array of words',
	},
	'words.$.word': {
		type: String,
		label: 'word option',
	},
	'words.$.team': {
		type: String,
		label: 'color/team word belongs to',
		allowedValues: ['red', 'blue', 'yellow', 'black'],
	},
	'words.$.ischosen': {
		type: Boolean,
		label: 'whether word is selected',
	},
});
