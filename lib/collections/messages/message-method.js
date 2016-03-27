'use strict';

/* jshint node: true */

if (Meteor.isServer) {
	Meteor.publish('Messages', function (options) {
//		check(options, Match.Optional(Object));
		if ( !options ) {
			options = {};
		}

		return Message.collection.find({},
			options
		);
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
