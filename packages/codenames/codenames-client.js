export { CodeNamesCollection };
export { CodeNameWords };

Template.CodeNamesSmartTemplate.onCreated(function(){
	const instance = this;
//	let game_subscription = instance.subscribe();
//	game_subscription.ready(function(){});
	instance.currentGame = new ReactiveVar(null);
});

Template.CodeNamesSmartTemplate.helpers({
	getGame(){
		return CodeNamesCollection.find();
	},
});

Template.CodeNamesSmartTemplate.events({
	createGame(){
		//meteor call
//		Meteor.call('freelancecourtyard:codenames/createGame', 1,1,1,()=>{
//			
//		});
	},
});

Template.CodeNames.onCreated(function(){
	let instance = this;
	instance.isRevealed = new ReactiveVar(false);
});

Template.CodeNames.helpers({
	getWords(){
		let firstteam = (_.random(9) % 2) ? 'red' : 'blue';
		
		let wordlist = _.sampleSize(CodeNameWords, 25).map((word, idx)=>{
			let team = 'white';
			if (idx === 0) {team = 'black';}
			if (1 <= idx && idx <= 8) {team = 'red';}  // 1 to 8 inclusive
			if (9 <= idx && idx <= 16) {team = 'blue';}
			if (17 <= idx && idx <= 23) {team = 'yellow';}
			if (idx === 24) {team = firstteam;}
			return {word, team, ischosen: false};
		});
		return _.shuffle(wordlist);
	},
//	revealteam(){
//		let instance = Template.instance();
//		// let option = this
//		return instance.isRevealed.get();
//	},
});

Template.CodeNames.events({
	'click .codenames-word'(event){
		let option = this;
		option.ischosen = true;
		console.log(this)
	},
	'click #hide'(){
		let instance = Template.instance();
		let reveal = instance.isRevealed.get();
		instance.isRevealed.set(!reveal);
	},
});