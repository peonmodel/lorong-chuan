Template.RoomListItem.helpers({

});

Template.RoomListItem.events({
	'click .js-jointhisgame': function (event, instance) {
		if (!Meteor.user()) {
			sAlert.error(`log in required to join room, try login as guest or register an account`);
			return;
		}
		let roomId = instance.data.room._id;
		// TODO: check if room is full
		Meteor.call('rooms/join', roomId, (error, result)=>{
			if (error) {
				console.log(error);
			} else {
				FlowRouter.go('room', {accesscode: roomId});
			}
		});
	},
});
