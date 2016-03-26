function createGuest(){
	Accounts.createUser({
		username: 'user_'+Random.id(7),
//		email: '',
		password: Random.id(),
		profile: {
			is_registered: false,  // is guest user
			date_created: new Date(),
			last_active: new Date(),
		},
	}, (err)=>{
		if (err) {
			console.error(err);
			sAlert.error(`unable to create temporary account`);
		}
	});
}

Template['layout-main'].onCreated(function(){
	if (!!Meteor.user() && !!Meteor.loggingIn()){
		// creates guest account upon reload if not already logged in
//		createGuest();
	}
});

Template['layout-main'].events({
	'click .js-logout'(event){
		// TODO: if guest, destroy guest
		Meteor.logout((err)=>{
			if (err) {
				sAlert.error(`error logging out`);
			} else {
				sAlert.success(`logged out`);
			}
		});
	},
});

// okay
Template.GuestLogIn.events({
	'click .js-guestlogin'(){
		createGuest();
	},
});

Template.RegisterOrLogin.onCreated(function(){
	let instance = this;
	instance.toggled = new ReactiveVar(!Meteor.user());  // maybe no need
	console.log('RegisterOrLogin created')
});

Template.RegisterOrLogin.events({
	'click .js-login'(){
		let instance = Template.instance();
		let toggled = instance.toggled.get();
		console.log('toggled', toggled)

		if (toggled){
			// create account
			let username = $(instance.find('input.username')).val();
			// if username is '', error
			let password = $(instance.find('input.password')).val();
			// if password is '', error or too short
			// if already logged in as guest, change username & password instead

			Meteor.loginWithPassword({username: username}, password, (err)=>{
				if (err) {
					console.error(err.reason);
					sAlert.error(`error logging in: ${err.reason}`);
				}
			});
		} else {
			instance.toggled.set(!toggled);
		}
	},
	'click .js-register'(){
		let instance = Template.instance();
		let toggled = instance.toggled.get();
		console.log('toggled', toggled)
		if (toggled){
			// create account
			let username = $(instance.find('input.username')).val();
			// if username is '', error
			let password = $(instance.find('input.password')).val();
			// if password is '', error or too short
			// if already logged in as guest, change username & password instead

			let user = Meteor.user();
			let guest_id = null;
			if (!!user && user.profile.is_registered === false){
				guest_id = user._id;
			}
				// not logged in at all
			Accounts.createUser({
				username: username,
//				email: email,
				password: password,
				profile: {
					is_registered: true,
					date_created: new Date(),
					last_active: new Date(),
					guest_id: guest_id,
				},
			}, (err)=>{
				if (err) {
					console.error(err);
					sAlert.error(`unable to create account: ${err.reason}`);
				} else {
					sAlert.success(`account registered`);
				}
			});

		} else {
			instance.toggled.set(!toggled);
		}

	},
});

Template.RegisterOrLogin.helpers({
	toggled: function(){
		let instance = Template.instance();
		return instance.toggled.get();
	},
});
