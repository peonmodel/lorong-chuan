Template.Room.onRendered(function () {
	let instance = this;
	instance.autorun(function (c) {
		instance.subscribe('Rooms');
		if(instance.subscriptionsReady()) {
			instance.accesscode = FlowRouter.getParam('accesscode');

			Players.insert({
				name: Meteor.user().username,
				room: instance.accesscode,
			});
			c.stop();
		}
	});

});
Template.Room.helpers({
	accesscode() {
		let instance = Template.instance();
		return instance.accesscode;
	},
	messages() {
		let instance = Template.instance();
		return Message.collection.find({
			room_id: instance.accesscode
		}, {
			sort: {
				timestamp: 1
			},
			limit: 5,
		});
	},
	occupancy() {
		let instance = Template.instance();
		let foundRoom = Room.collection.findOne({
			_id: instance.accesscode
		});
		return foundRoom && foundRoom.occupancy;
	},
	capacity() {
		let instance = Template.instance();
		let foundRoom = Room.collection.findOne({
			_id: instance.accesscode
		});
		return foundRoom && foundRoom.capacity;
	}
});

Template.Room.events({
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
		console.log('Start game')
	},
});

//Template.Room.onDestroyed(function () {
//	let instance = this;
//	Players.remove({
//		name: instance.user,
//		room: instance.accesscode
//	});
//});
