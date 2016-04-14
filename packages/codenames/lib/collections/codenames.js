CodeNamesCollection = new Mongo.Collection('CodeNames');

CodeNamesCollection.schema = new SimpleSchema({
	'_id': {
		type: String,
		label: 'Id of the game'
	},
	/*players: {
		type: [Object],
		label: 'array of players',
	},*/
	'active_team': {
		type: String,
		label: 'Team currently making a move'
	},
	'status': {
		type: String,
		label: 'The status of the game'
	},
	'is_revealed': {
		type: Boolean,
		label: 'Is the game showing the words'
	},

	'teams': {
		type: [Object],
		label: 'array of teams',
	},
	'teams.$.team': {
		type: String,
		label: 'Team name/color',
	},
	'teams.$.cluegiver': {
		type: String,
		label: 'Player who gives the clues',
	},
	'teams.$.teammates': {
		type: [Object],
		label: 'Players in the team',
	},

	// should have teams, players, room/game id
});

// words cannot be an array in the game instance, have to be a collection
//	Minimongo doesn't support operators in projections yet
//	REFERENCE: https://github.com/meteor/meteor/blob/046de405da50d89e4dc59084393f93a3d2561e2a/packages/minimongo/projection.js#L164-L165
//	cannot filter out particular key of object within array e.g. 'words.$.color'
CodeNamesWordsCollection = new Mongo.Collection('CodeNamesWords');

CodeNamesWordsCollection.schema = new SimpleSchema({
	'_id': {
		type: String,
		label: 'Id of the word'
	},
	'word': {
		type: String,
		label: 'word option',
	},
	'game_id': {
		type: String,
		label: 'id of game instance word belongs to'
	},
	'isChosen': {
		type: Boolean,
		label: 'whether word is selected'
	},
	'team': {
		type: String,
		label: 'color/team word belongs to',
		allowedValues: ['red', 'blue', 'black', 'yellow'],
	},
});