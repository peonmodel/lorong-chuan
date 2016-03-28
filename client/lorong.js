if (Meteor.isClient) {
	Meteor.startup(function(){
		$(window).bind('beforeunload', ()=>{
			Meteor.call('Main/onBrowserClose');
		});
	});
}
