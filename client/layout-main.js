Template['layout-main'].events({
	'click button.register'(event){
		let instance = Template.instance();
		let registerAs = $(instance.find('input.loginAs')).val();
		console.log('registerAs', registerAs);
		Accounts.createUser({
			username: registerAs,
//				email: '',
			password: Session.get('sessionUUID'),
			profile: {
//					date_created: new Date(),
//					last_active: new Date(),
//					registered: false,  // is temp
			},
		}, (err)=>{
			console.log(err);
//				sAlert()
		});			
	},
	'click button.login'(event){
		let instance = Template.instance();
		let loginAs = $(instance.find('input.loginAs')).val();
		console.log('loginAs', loginAs);
		Meteor.loginWithPassword(
			{username: loginAs}, 
			Session.get('sessionUUID'), 
			(err)=>{
				console.log('log in', err)
			}
		);
	},
	'click button.logout'(event){
		Meteor.logout((err)=>{
			if (err) {
				sAlert.error(`error logging out`);
			} else {
				sAlert.success(`logged out`);
			}
		});
	},
});