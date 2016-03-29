/* global Random */
/* global Message: true */
/* global Messages: true */

Messages = new Mongo.Collection('Messages', {
	transform(item){
		return new Message(item);
	},
});

Messages.schema = new SimpleSchema({
//	_id: {
//		type: String,
//		label: 'Collection id',
//		defaultValue: () => Random.id()
//	},
	room_id: {
		type: String,
		label: 'Chat room id',
		defaultValue: 'public'
	},
	text: {
		type: String,
		label: 'The message content',
		defaultValue: ''
	},
	sender: {
		type: String,
		label: 'The name of the sender',
		defaultValue: ''
	},
	timestamp: {
		type: Date,
		label: 'The timestamp when the message was sent',
		defaultValue: () => new Date()
	},
});

//Rooms.deny({
//	insert(){
//		return true;
//	},
//	update(){
//		return true;
//	},
//	remove(){
//		return true;
//	},
//});

Message = function Message(item){
	Object.assign(this, item);
};

Message.collection = Messages;

//Object.assign(Message.prototype, {});
