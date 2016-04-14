'use strict';

/* global Random: true */
/* global Room: true */
/* jshint node: true */

if (Meteor.isServer) {
	Meteor.publish('Rooms', function (options = {}) {
		return Room.collection.find({}, options);
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
//				players: [],
				users: [],
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
				nick_name: Meteor.user().username,
				is_player: false
			};
			let foundRoom = Room.collection.findOne({_id: roomId});

			if (!foundRoom) {
				throw new Meteor.Error('room-not-found', 'The room was not found!');
			}
			// Check if atleast 1 user has room admin powers
			let existingAdmins = _.filter(foundRoom.users, function (user) {
				return !!user.is_room_admin;
			});
			if (_.isArray(existingAdmins) && existingAdmins.length < 1) {
				currentUser.is_room_admin = true;
			}

			if (foundRoom.capacity > foundRoom.users.length) {
				return Room.collection.update({_id: roomId}, {$push: {users: currentUser}});
			} else {
				throw new Meteor.Error('room-full', 'The room is full!');
			}
		},
		'rooms/leave': function (roomId/*, userId*/) {
			let userId = Meteor.userId();
			let foundRoom = Room.collection.findOne({_id: roomId});

			if (!foundRoom) {
				throw new Meteor.Error('room-not-found', 'The room was not found!');
			}

			let result = Room.collection.update({_id: roomId}, {$pull: {users: {user_id: userId}}});
			foundRoom = Room.collection.findOne({_id: roomId});
			// Check if atleast 1 user has room admin powers
			let existingAdmins = _.filter(foundRoom.users, function (user) {
				return !!user.is_room_admin;
			});
			if (_.isArray(existingAdmins) && existingAdmins.length < 1) {
				// Nobody has admin rights, assign to first user
				let newAdmin = foundRoom.users[0];
				if (!!newAdmin) {
					result = Room.collection.update({
						_id: roomId,
						'users.user_id': newAdmin.user_id
					}, {
						$set: {
							'users.$.is_room_admin': true
						}
					});
				}
			}

			return result;
		},
		'rooms/setGameId': function (roomId, gameId) {
			return Room.collection.update({_id: roomId}, {$set:{game_id: gameId}});
		},
		'rooms/joinGame': function (roomId /*, userId*/ ) {
			// TODO: add checks if game is ready
			// TODO: add checks if game is full

			return Room.collection.update({
				_id: roomId,
				'users.user_id': Meteor.userId()
			}, {
				$set: {
					'users.$.is_player': true
				}
			});
		},
		'rooms/leaveGame': function (roomId /*, userId*/ ) {
			return Room.collection.update({
				_id: roomId,
				'users.user_id': Meteor.userId()
			}, {
				$set: {
					'users.$.is_player': false
				}
			});
		},
	});
}
