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
//				occupancy: 0,
				players: [],
				spectators: [],
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
			let currentUser = {
				user_id: Meteor.userId(),
				nick_name: Meteor.user().username
			};
			return Room.collection.update({_id: roomId}, {$push: {spectators: currentUser}});
		},
		'rooms/leave': function (roomId/*, userId*/) {
			let userId = Meteor.userId();
			return Room.collection.update({_id: roomId}, {$pull: {spectators: {user_id: userId}}});
		},
		'rooms/setGameId': function (roomId, gameId) {
			return Room.collection.update({_id: roomId}, {$set:{game_id: gameId}});
		},
	});
}
