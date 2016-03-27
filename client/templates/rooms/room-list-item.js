Template.RoomListItem.helpers({

});

Template.RoomListItem.events({
	'click .js-jointhisgame': function () {
		let instance = Template.instance();
		FlowRouter.go('room', {
			accesscode: instance.data.room._id
		});
	},
});
