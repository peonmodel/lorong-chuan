'use strict';

/* global Random: true */
/* global Room: true */
/* jshint node: true */

if (Meteor.isServer) {
	Meteor.publish('Rooms', function (options) {
//		check(options, Match.Optional(Object));
		if ( !options ) {
			options = {};
		}

		return Room.collection.find({},
			options
		);
	});

	Meteor.methods({
		'rooms/add': function (isPublic = true, capacity = 8) {
			// TODO: add created by and created date
			// TODO: add room name
			return Room.collection.insert({
				_id: Random.id(3),
				is_public: isPublic,
				capacity: capacity,
				occupancy: 0,
				game_id: '',
			});
		},
		'rooms/remove': function (roomId) {
			return Room.collection.remove({_id: roomId});
		},
		'rooms/removeAll': function () {
			// TODO: remove chat associated aswell
			return Room.collection.remove({});
		},
		'rooms/join': function (roomId/*, userId*/) {
			return Room.collection.update({_id: roomId}, {$inc: {occupancy: 1}});
		},
		'rooms/leave': function (roomId/*, userId*/) {
			return Room.collection.update({_id: roomId}, {$inc: {occupancy: -1}});
		},
		'rooms/setGameId': function (roomId, gameId) {
			return Room.collection.update({_id: roomId}, {$set:{game_id: gameId}});
		},
	});
}
