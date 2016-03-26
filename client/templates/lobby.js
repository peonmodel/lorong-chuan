Template.Lobby.onRendered(function(){
	let instance = this;
});

Template.Lobby.helpers({
	rooms: function(){
		return Room.collection.find({is_public: true});
	},
	messages: function(){
		return Message.collection.find({room_id: 'public'});
	},
	defaultusertext(){
		console.log('user', Meteor.user())
		uu = Meteor.user()
		if (!!Meteor.user()){
			return Meteor.user().username;
		} else {
			return '';
		}
	},
	readonly(){
		if (!!Meteor.user()){
			return 'readonly';
		} else {
			return '';
		}
	},
});

Template.Lobby.events({
	'click .js-createRoom' (event) {
		let roomid = Meteor.call('rooms/add', true, 7, function (error, result) {
			console.log(error,result)
		});
	},
	'click .js-clearAll' (event) {
		event.preventDefault();
		Meteor.call('rooms/removeAll', {}, (err, res)=>{
			if (err) {
				console.log(err);
			} else {
				sAlert.success('Rooms cleared');
			}
		});
		/*Rooms.find().fetch().map(({_id})=>{
			Rooms.remove(_id);
		});*/
	},
	'click .js-join' (event) {
		let instance = Template.instance();
		let accesscode = $(instance.find('.accesscode')).val();
		let target = Room.collection.findOne({_id: accesscode});
		if (!target) {
			sAlert.error('Room not found');
			return;
		}
		if (target.capacity > target.occupancy) {
			// javascript onbeforeunload to decrement, + refresh
			console.log('updating join')
//			Rooms.update(target._id, {$inc: {occupancy: 1}});
			Meteor.call('rooms/join', accesscode, function (error, result) {
				if (error) {
					console.log(error);
				} else {
					FlowRouter.go('room', {accesscode: accesscode});
				}
			});
		} else {
			sAlert.error('Room is full');
		}
	},
	'change input.username' (event) {
		let user = $(event.target).val();
		Session.set('session', user);  // problem, what if duplicate?

	},
});
