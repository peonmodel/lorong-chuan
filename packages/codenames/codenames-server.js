// publish CodeNamesCollection

Meteor.methods({
	'freelancecourtyard:codenames/createGame': function(redteam, blueteam, wordcount = 25){
		// team = {cluegiver, others}  // player ids
		return CodeNamesCollection.insert({
			// TODO: fill in
		});
	},
});