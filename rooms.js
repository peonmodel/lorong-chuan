//Rooms = Mongo.Collection('Rooms');
//Chat = Mongo.Collection('Chat');
//
//if (Meteor.isServer){
//	Meteor.publish('Rooms', function(){
//		return Rooms.find({hidden: false});
//	});
//	Meteor.publish('Chat', function(room_id){
//		if (!room_id) {
//			return Chat.find({room: 'public'}, {
//				sort: {timestamp: 1}
//			});
//		}
//		return Chat.find({room: room_id}, {
//			sort: {timestamp: 1}
//		});
//	});
//}
//
//Meteor.methods({
//	'Rooms/add': function(){
//		let room_id = Rooms.insert({
//			_id: Random.id(5),
//			game: 'codenames',
//			players: 0,
//			status: 'ready',  // filled up or not
//			// stuff?
//		});
//		
//		return room_id;
//	},
//	'Rooms/join': function(room_id){
//		
//	},
//});
//
////room_schema = {
////	_id: 'id of room',
////	accesscode: 'accesscode',
////	hidden: false,
////	capacity: 15,
////  players: [],  // players.length = occupancy, vacancy = capacity - occupancy
////	status: 'busy',
////};
//
////chat_schema = {
////	_id: '',
////	room: 'id of room',  // keep empty for default public room
////	text: '',
////	user: '',
////	timestamp: new Date(),
////};