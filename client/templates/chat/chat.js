Template.Chat.onRendered(function () {
	let instance = this;
	// Keep track of what the previous message was
	instance.prevMessage = {};
});

Template.Chat.helpers({
	accesscode(){
		let instance = Template.instance();
		return instance.data.accesscode;
	},
	messages(){
		let instance = Template.instance();
		return Message.collection.find({room_id: instance.data.accesscode}, {
			sort: {timestamp: -1},
			limit: 5,
		});
	},
	differentAuthor(message){
		let instance = Template.instance();
		let isDifferentAuthor = instance.prevMessage.originator !== message.originator;
		instance.prevMessage = message;
		return isDifferentAuthor;
	},
});

Template.Chat.events({
	'click .js-send': function (event){
		let instance = Template.instance();
		let reply = $(instance.find('.reply')).val();
		/*let message = {
			room_id: instance.data.accesscode,
			text: reply,
			timestamp: new Date(),
			originator: Session.get('session'),
		};
		Messages.insert(message);*/
		let sender = Session.get('session');
		Meteor.call('messages/add', reply, sender, instance.data.accesscode, function (error, result) {
			console.log(error,result)
		});
	},
});
