CodeNamesCollection = new Mongo.Collection('CodeNames');

CodeNamesCollection.schema = new SimpleSchema({
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
	'words.$.isChosen': {
		type: Boolean,
		label: 'whether word is selected',
	},
});
