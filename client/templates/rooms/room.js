/* global Message */
/* global Room */

Template.Room.onRendered(function () {
	let instance = this;
	instance.subscribe('Rooms');
	instance.autorun(function (c) {
		if(instance.subscriptionsReady()) {
			instance.data.accesscode = FlowRouter.getParam('accesscode');
			/*Players.insert({
				name: Meteor.user().username,
				room: instance.data.accesscode,
			});*/
			c.stop();
		}
	});
});
Template.Room.helpers({
	getRoom() {
		let instance = Template.instance();
		let foundRoom = Room.collection.findOne({
			_id: instance.data.accesscode
		});
//		console.log('foundRoom',foundRoom)
		return foundRoom;
	},
});

Template._Room.onRendered(function () {
	let instance = Template.instance();
//	console.log('Template._Room.onRendered',instance.data.room)
	instance.subscribe('Messages', FlowRouter.getParam('accesscode'));
});

Template._Room.helpers({
	messages() {
		let instance = Template.instance();
		let room = instance.data.room;
		return Message.collection.find({
			room_id: room._id
		}, {
			sort: {
				timestamp: 1
			}/*,
			limit: 5,*/
		});
	},
	players: function () {
		let instance = Template.instance();
		let room = instance.data.room;
		let users = room && room.users || [];
		return _.filter(users, function (user) {
			return !!user.is_player;
		});
	},
	spectators: function () {
		let instance = Template.instance();
		let room = instance.data.room;
		let users = room && room.users || [];
		return _.filter(users, function (user) {
			return !user.is_player;
		});
	},
	isRoomAdmin: function () {
		let instance = Template.instance();
		let room = instance.data.room;
		let users = room && room.users || [];
		let user = _.find(users, function (user) {
			return user.user_id === Meteor.userId();
		});
		return !!user && !!user.is_room_admin;
	},
	isPlayer: function () {
		let instance = Template.instance();
		let room = instance.data.room;
		let users = room && room.users || [];
		let user = _.find(users, function (user) {
			return user.user_id === Meteor.userId();
		});
		return !!user && !!user.is_player;
	},
	isGameRunning: function () {
		let instance = Template.instance();
		let room = instance.data.room;
		return !!room.game_id;
	},
});

Template._Room.events({
	'click .js-join-game': function (event, instance) {
		let roomId = instance.data.room._id;
		Meteor.call('rooms/joinGame', roomId, function (error, result) {
			if (error) {
				console.log(error);
			}
		});
	},
	'click .js-leave-game': function (event, instance) {
		let roomId = instance.data.room._id;
		Meteor.call('rooms/leaveGame', roomId, function (error, result) {
			if (error) {
				console.log(error);
			}
		});
	},
	'click .js-leave-room': function (event, instance) {
		let roomId = instance.data.room._id;
		Meteor.call('rooms/leave', roomId, function (error, result) {
			if (error) {
				console.log(error);
			} else {
				FlowRouter.go('public');
			}
		});
	},
	'click .js-start-game': function () {
		let instance = Template.instance();

		let redteam = 'test';
		let blueteam = 'test';
		let wordcount = 25;
		Meteor.call('freelancecourtyard:codenames/createGame',redteam, blueteam, wordcount, function(error, gameId){
//			console.log('creating game',error, gameId);
			let foundRoom = instance.data.room;
//			console.log('instance',instance.data)
			Meteor.call('rooms/setGameId',foundRoom._id, gameId, function (error, result) {
				console.log('Updated room gameId', error, result);
			});
		});
	},
	'click .js-stop-game': function () {
		let instance = Template.instance();
		let foundRoom = instance.data.room;
		Meteor.call('rooms/setGameId',foundRoom._id, null, function (error, result) {
			let gameId = foundRoom.game_id;
			console.log('Updated room gameId', error, result);
			Meteor.call('freelancecourtyard:codenames/removeGame', gameId, function(error, gameId){
				console.log('Stopped gameId ' + gameId, error, result);
			});
		});

	},
});

//Template.Room.onDestroyed(function () {
//	let instance = this;
//	Players.remove({
//		name: instance.user,
//		room: instance.accesscode
//	});
//});
