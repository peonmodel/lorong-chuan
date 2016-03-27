Template.RoomListItem.helpers({

});

Template.RoomListItem.events({
	'click .js-jointhisgame': function () {
		if (!Meteor.user()) {
			sAlert.error(`log in required to join room, try login as guest or register an account`);
			return;
		}
		let instance = Template.instance();
		FlowRouter.go('room', {
			accesscode: instance.data.room._id
		});
	},
});
