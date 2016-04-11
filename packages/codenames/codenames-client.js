export { CodeNamesCollection };
export { CodeNameWords };

Template.CodeNames.onRendered(function () {
	let instance = Template.instance();
//	console.log('CodeNames.onRendered instance.data',instance.data)

	instance.subscribe('CodeNames_Games');
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

/*Template._CodeNames.onRendered(function () {
	let instance = Template.instance();
	console.log('_CodeNames.onRendered instance.data',instance.data)
});*/

Template._CodeNames.helpers({
	getWords(){
		let instance = Template.instance();
		let wordlist = [];
//		console.log('instance.data',instance.data)
		let gameId = instance.data.game._id;
		let foundGame = CodeNamesCollection.findOne({_id: gameId});
//		console.log('foundGame',foundGame)
		wordlist = instance.data.game.words;
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
		return instance.data.isRevealed || instance.data.isChosen;
	},
});
Template._CodeNamesWord.events({
	'click .codenames-word'(event){
		let instance = Template.instance();
//		console.log('click .codenames-word', instance)
		let gameId = instance.data.gameId;
		let index = instance.data.index;
		Meteor.call('freelancecourtyard:codenames/selectWord', gameId, index, function(error, result) {
//			console.log('clicked word',error,result)
		});
	}
});
