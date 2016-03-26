Meteor.startup(function () {
    // code to run on server at startup
//		Players.remove({});
//		Messages.remove({});
//		Rooms.remove({});
});
	
Meteor.methods({
	'Messages/clear': function(selector){
		return Messages.remove(selector);
	},
	'Rooms/clear': function(selector){
		return Rooms.remove(selector);
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