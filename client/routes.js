
FlowRouter.route('/', {
	name: 'public',
	action(pathParams, queryParams){
		BlazeLayout.render('layout-main', {
//			sidebar: '',
			content: 'Lobby',
		});
	},
});

FlowRouter.route('/room/:accesscode', {
	name: 'room',
	action(pathParams, queryParams){
		if (!Room.collection.findOne(pathParams.accesscode)){
			FlowRouter.go('public');
			sAlert.warning('room not found, redirecting to public lobby');
			return;
		}
		BlazeLayout.render('layout-main', {
			content: 'Room',
		});
	},
});
