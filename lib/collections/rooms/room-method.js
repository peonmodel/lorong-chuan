'use strict';

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
			return Room.collection.insert({
				_id: Random.id(3),
				is_public: isPublic,
				capacity: capacity,
				occupancy: 0,
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
	});
}
