Template.Room.onRendered(function () {
	let instance = this;
	instance.subscribe('Rooms');
	instance.autorun(function (c) {
		if(instance.subscriptionsReady()) {
			instance.data.accesscode = FlowRouter.getParam('accesscode');
			Players.insert({
				name: Meteor.user().username,
				room: instance.data.accesscode,
			});
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

/*Template._Room.onRendered(function () {
	let instance = Template.instance();
//	console.log('Template._Room.onRendered',instance.data.room)
});*/
Template._Room.helpers({
	messages() {
		let instance = Template.instance();
		return Message.collection.find({
			room_id: instance.data.room._id
		}, {
			sort: {
				timestamp: 1
			},
			limit: 5,
		});
	},
});

Template._Room.events({
	'click .js-joingame': function () {
		console.log('Join game')
	},
	'click .js-leavegame': function () {
		console.log('Leave game')
	},
	'click .js-leaveroom': function () {
		console.log('Leave room')
		Meteor.call('rooms/leave', function (error, result) {
			if (error) {
				console.log(error);
			} else {
				FlowRouter.go('public');
			}
		});
	},
	'click .js-start': function () {
		let instance = Template.instance();

		let redteam = 'test';
		let blueteam = 'test';
		let wordcount = 25;
		console.log('going to create game')
		Meteor.call('freelancecourtyard:codenames/createGame',redteam, blueteam, wordcount, function(error, gameId){
//			console.log('creating game',error, gameId);
			let foundRoom = instance.data.room;
//			console.log('instance',instance.data)
			Meteor.call('rooms/setGameId',foundRoom._id, gameId, function (error, result) {
				console.log('Updated room gameId',error, result);
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
