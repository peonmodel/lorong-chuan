Template.Chat.onRendered(function () {
	let instance = this;
	// Keep track of what the previous message was
	instance.prevMessage = {};

	instance.autorun(function (c) {
		instance.subscribe('Messages');
		if(instance.subscriptionsReady()) {
			c.stop();
		}
	});
});

Template.Chat.helpers({
	accesscode(){
		let instance = Template.instance();
		return instance.data.accesscode;
	},
	messages(){
		let instance = Template.instance();
		let messages = Message.collection.find({room_id: instance.data.accesscode}, {
			sort: {timestamp: -1},
			limit: 5,
		}).fetch();
		let checkedMessages = _.each(messages, (message) => {
			if (instance.prevMessage && instance.prevMessage.sender !== message.sender) {
				message.isDifferentAuthor = true;
			}
			instance.prevMessage = message;
			return message;
		});
		messages = messages.reverse();
		return checkedMessages;
	},
});

Template.Chat.events({
	'click .js-send': function (event){
		let instance = Template.instance();
		let reply = $(instance.find('.reply')).val();
		let sender = Meteor.user().username;
		Meteor.call('messages/add', reply, sender, instance.data.accesscode, function (error, result) {
			console.log(error,result)
		});
	},
});
