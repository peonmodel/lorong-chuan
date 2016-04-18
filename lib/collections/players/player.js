/* global Random */
/* global Player: true */
/* global Players: true */

Players = new Mongo.Collection('Players', {
	transform(item){
		return new Player(item);
	}
});

Players.schema = new SimpleSchema({
	game_id: {
		type: String,
		label: 'id of game being played',
	},
	game_type: {
		type: String,
		label: 'the game that is being played',
	},
	user_id: {
		type: String,
		label: 'user id of player',
	},
	team: {
		type: String,
		label: 'team of player', 
	},
	// ??? last action taken timestamp?
	// turn? active?
	// what to include here?
});

Player = function Player(item){
	Object.assign(this, item);
};

Player.collection = Players;

//Object.assign(Player.prototype, {});