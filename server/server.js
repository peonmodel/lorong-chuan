Meteor.startup(function () {
	// code to run on server at startup
//		Players.remove({});
//		Messages.remove({});
//		Rooms.remove({});
//	SyncedCron.start();
	// create public chat/room on start up
	// clear (> 1 hour old) public room messages every hour
});

//SyncedCron.add({
//	name: 'clear inactive Guest accounts',
//	schedule: function(parse){
//		// recur every day, first hour
//		return parse.recur().first().hour();
////		return parse.recur().every(5).second();
//	},
//	job: function(){
//		console.log('first hour of every day');
////		let cleared = Meteor.users._collection.remove({
////			// clear registered: false
////			// && last_active  > 12 hours
////		});
////		console.log(`cleared ${cleared} inactive Guests`);
//	},
//});

Meteor.methods({
	// TODO: remove these and put them in the right file
	'Messages/clear': function(selector){
		return Messages.remove(selector);
	},
	'Rooms/clear': function(selector){
		return Rooms.remove(selector);
	},
	'Main/onBrowserClose': function(){
		// TODO: remove this user from rooms/games etc
//		console.log(Meteor.user());
		console.log('browserclosed')
	},
});

//	Meteor.publish('All_Rooms', function(){
//		return Rooms.find({hidden: false});
//	});
//
//	Meteor.publish('Specific_Room', function(accesscode){
//		return Rooms.find({accesscode: accesscode});
//	});
//
////	Meteor.publish('Players', function(){
////
////	});
//
//	Meteor.publish('Messages', function(room_id){
//		if (!room_id) {
//			return Messages.find({room: 'public'}, {
//				sort: {timestamp: 1}
//			});
//		}
//		return Messages.find({room: room_id}, {
//			sort: {timestamp: 1}
//		});
//	});
