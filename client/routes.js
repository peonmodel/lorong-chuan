BlazeLayout.setRoot('body');

FlowRouter.route('/', {
	name: 'public',
	action(pathParams, queryParams){
		BlazeLayout.render('layout-main', {
//			sidebar: '',
			content: 'Lobby',
		});
	},
});

FlowRouter.route('/:accesscode', {
	name: 'room',
	action(pathParams, queryParams){
		if (!Rooms.findOne(pathParams.accesscode)){
			FlowRouter.go('public');
			sAlert.warning('room not found, redirecting to public lobby');
			return;
		}
		BlazeLayout.render('layout-main', {
			content: 'Room',
		});
	},
});