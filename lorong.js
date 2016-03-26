_ = lodash;

Players = new Mongo.Collection('Players');
Messages = new Mongo.Collection('Messages');
Rooms = new Mongo.Collection('Rooms');

if (Meteor.isClient) {
	
	Session.setDefault('session', 'user_'+Random.id(4));
	Session.setDefault('sessionUUID', Random.id());
	
	Template.Lobby.onCreated(function(){
		let instance = this;
	});
	
  Template.Lobby.helpers({
		rooms: function(){
			return Rooms.find({public: true});
		},
		messages: function(){
			return Messages.find({roomid: 'public'});
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
    'click button.createRoom'(event) {
			let roomid = Rooms.insert({
				_id: Random.id(3),
				public: true,
				capacity: 7,
				occupancy: 0,
			});
    },
		'click button.clearAll'(event) {
			event.preventDefault();
      // increment the counter when button is clicked
			Meteor.call('Rooms/clear', {}, (err, res)=>{
				if (err) {
					console.log(err);
				} else {
					sAlert.success('rooms cleared');
				}
			});
			Rooms.find().fetch().map(({_id})=>{
				Rooms.remove(_id);
			});
    },
		'click button.submit'(){
			let instance = Template.instance();
			let msg_input = $(instance.find('.msg'));
			let msg = msg_input.val();
			Messages.insert({
				roomid: 'public',
				text: msg,
				timestamp: new Date(),
				originator: Session.get('session'),
			});
		},
		'click button.join'(){
			let instance = Template.instance();
			let accesscode = $(instance.find('.accesscode')).val();
			let target = Rooms.findOne(accesscode);
			if (!target){
				sAlert.error('room not found');
				return;
			}
			if (target.capacity > target.occupancy) {
				// javascript onbeforeunload to decrement, + refresh
				Rooms.update(target._id, {$inc: {occupancy: 1}});
				FlowRouter.go('room', {accesscode: accesscode});
			} else {
				sAlert.error('room is full');
			}
		},
		'change input.username'(event){
			let user = $(event.target).val();
			Session.set('session', user);  // problem, what if duplicate?

		},
  });
	
	Template.RoomListItem.helpers({
		
	});
	
	Template.RoomListItem.events({
		'click button.jointhisgame': function(){
			let instance = Template.instance();
			FlowRouter.go('room', {accesscode: instance.data._id});
		},
	});
	
	Template.Room.onCreated(function(){
		let instance = this;
		console.log(instance)
		instance.accesscode = FlowRouter.getParam('accesscode');
		instance.user = Session.get('session');
		let taken = Players.findOne({
			name: instance.user,
			room: instance.accesscode,
		});
		if (!!taken) {
			let new_user = instance.user + Random.id(4);
			sAlert.error(`username ${instance.user} already taken, renaming to ${new_user}`);
			Session.set('session', new_user);
			instance.user = new_user;
		}
		Players.insert({
			name: instance.user,
			room: instance.accesscode,
		});
//		instance.subscribe();
	});
	
	Template.Room.helpers({
		accesscode(){
			let instance = Template.instance();
			return instance.accesscode;
		},
		messages(){
			let instance = Template.instance();
			return Messages.find({roomid: instance.accesscode}, {
				sort: {timestamp: 1},
				limit: 5,
			});
		},
		parseTime(arg){
			return moment(arg).format('LT');
		},
	});
	
	Template.Room.events({
		'click button.send'(event){
//			console.log(event)
			let instance = Template.instance();
			let reply = $(instance.find('.reply')).val();
			Messages.insert({
				roomid: instance.accesscode,
				text: reply,
				timestamp: new Date(),
				originator: Session.get('session'),
			});
		},
	});
	
	Template.Room.onDestroyed(function(){
		let instance = this;
		Players.remove({
			name: instance.user, 
			room: instance.accesscode
		});
	});
}
