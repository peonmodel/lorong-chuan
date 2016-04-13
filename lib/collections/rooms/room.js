/* global Random */
/* global Room: true */
/* global Rooms: true */

Rooms = new Mongo.Collection('Rooms', {
	transform(item){
		return new Room(item);
	},
});

Rooms.schema = new SimpleSchema({
//	_id: {
//		type: String,
//		label: 'Collection id',
//		defaultValue: () => Random.id()
//	},
	is_public: {
		type: Boolean,
		label: 'Is this room public accessible',
		defaultValue: true
	},
	capacity: {
		type: Number,
		label: 'Maximum number of people allowed in the room',
		defaultValue: 8
	},
	/*occupancy: {
		type: Number,
		label: 'Current number of people in the room',
		defaultValue: 0
	},*/
	/*players: {
		type: [Object],
		label: 'The people in the room who are playing the game',
		defaultValue: []
	},*/
	users: {
		type: [Object],
		label: 'The people in the room',
		defaultValue: []
	},
	game_id: {
		type: String,
		label: 'Current id of game being played in the room',
		defaultValue: ''
	},
});

//Rooms.deny({
//	insert(){
//		return true;
//	},
//	update(){
//		return true;
//	},
//	remove(){
//		return true;
//	},
//});

Room = function Room(item){
	Object.assign(this, item);
};

Room.collection = Rooms;

//Object.assign(Room.prototype, {});
