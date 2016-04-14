'use strict';

/* jshint node: true */

if (Meteor.isServer) {
	Meteor.publish('Messages', function (room_id, limit = 50) {
		return Message.collection.find({room_id}, {
			limit,
			sort: {timestamp: 1},
		});
	});

	Meteor.methods({
		'messages/add': function (text, sender, roomId) {
			let message = {
				room_id: roomId,
				text: text,
				timestamp: new Date(),
				sender: sender,
			};
			return Message.collection.insert(message);
		},
		'messages/remove': function (id) {
			return Message.collection.remove({_id: id});
		},
		'messages/removeAll': function (roomId) {
			return Message.collection.remove({});
		},
	});
}
