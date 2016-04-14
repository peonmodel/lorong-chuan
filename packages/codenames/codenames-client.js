export { CodeNamesCollection };
export { CodeNamesWordPool };
export { CodeNamesWordsCollection };

Template.CodeNames.onRendered(function () {
	let instance = Template.instance();
//	console.log('CodeNames.onRendered instance.data',instance.data)

	instance.subscribe('CodeNames_Games');
//	instance.subscribe('CodeNames_Words', 'id');
	instance.autorun(function (c) {
		if(instance.subscriptionsReady()) {
			console.log('CodeNames_Games subscribed')
			c.stop();
		}
	});
});

Template.CodeNames.helpers({
	getGame(){
		let instance = Template.instance();
		let gameId = instance.data.gameId;
//		console.log('gameId',gameId,instance.data)
		let foundGame = CodeNamesCollection.findOne({_id: gameId});
		return foundGame;
	}
});

Template._CodeNames.onRendered(function () {
	let instance = Template.instance();
//	console.log('_CodeNames.onRendered instance.data',instance.data)
	instance.subscribe('CodeNames_Words', instance.data.game._id);
});

Template._CodeNames.helpers({
	getWords(){
		let instance = Template.instance();
//		console.log('instance.data',instance.data)
		let game_id = instance.data.game._id;
		let wordlist = CodeNamesWordsCollection.find({game_id}).fetch();
//		console.log('wordlist',wordlist)
		return wordlist;
	},
//	revealteam(){
//		let instance = Template.instance();
//		// let option = this
//		return instance.isRevealed.get();
//	},
});

Template._CodeNames.events({
	'click #hide'(){
		let instance = Template.instance();
//		console.log('click #hide', instance.data)
		let game = instance.data.game;
		let gameId = game._id;
		let isRevealed = !game.is_revealed;

		Meteor.call('freelancecourtyard:codenames/revealGame', gameId, isRevealed, function (error, result) {
//			console.log('revealing game:', error, result)
		});
	},
});

Template._CodeNamesWord.helpers({
	showColor() {
		let instance = Template.instance();
//		console.log('showColor',instance.data.isRevealed,instance.data.isChosen)
		return instance.data.isRevealed || instance.data.word.isChosen;
	},
});
Template._CodeNamesWord.events({
	'click .codenames-word'(event){
		let instance = Template.instance();
		console.log(instance.data)
		let word_id = instance.data.word._id;
		Meteor.call('freelancecourtyard:codenames/selectWord', word_id, function(error, result) {
			console.log('clicked word', error, result);
		});
	}
});
