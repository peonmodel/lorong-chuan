//import { Template } from 'meteor/templating';
//import { ReactiveVar } from 'meteor/reactive-var';
import { CodeNamesWordPool, CodeNamesCollection, CodeNamesWordsCollection } from 'meteor/freelancecourtyard:codenames';

// FIXME: remove this, temp access to console
CodeNamesWordPool_G = CodeNamesWordPool;
CodeNamesCollection_G = CodeNamesCollection;
CodeNamesWordsCollection_G = CodeNamesWordsCollection;
//import './main.html';

function createGuest(username) {
	Accounts.createUser({
		username: username,
//		email: '',
		// set guest password to username so easy to retrieve and remember
		password: username,
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

function createRandomName() {
	function pickFromArray(items) {
		return items[Math.floor(Math.random()*items.length)];
	}
	let colorArray = [
		'Pink',
		'Blue',
		'Orange',
		'Green',
		'Yellow',
		'Fuchsia',
		'Red',
		'Golden',
		'Silver',
		'Brown'
	];
	let sizeArray = [
		'Little',
		'Small',
		'Big',
		'Fat',
		'Tiny',
		'Huge',
		'Mini',
	];
	let emotionArray = [
		'Happy',
		'Sad',
		'Depressed',
		'Excited',
		'Angry',
		'Motivated',
		'Scared',
		'Energized',
		'Surprised',
		'Tired',
	];
	let nounArray = [
		'Diamond',
		'JetPack',
		'Cruiser',
		'Bunny',
		'Lambini',
		'Bird',
		'Elephant',
		'Frog',
		'Player',
		'Lover',
		'Guest',
		'User',
		'Cow',
		'Mustang',
		'Student',
		'Driver',
		'Hawker',
		'Villager',
		'Explorer',
		'Dancer',
		'Stranger',
		'Farmer',
		'Boat',
		'Car',
		'Chicken',
		'Machine',
		'Thing',
	];
	let number = _.sample(_.range(10,2110));
	let tempName = pickFromArray(emotionArray) + pickFromArray(sizeArray) + pickFromArray(colorArray) + pickFromArray(nounArray) + number;
	return tempName;
}

/*Template['layout-main'].onCreated(function(){
	if (!!Meteor.user() && !!Meteor.loggingIn()){
		// creates guest account upon reload if not already logged in
//		createGuest();
	}
});*/

Template['layout-main'].events({
	'click .js-logout'(){
		// TODO: if guest, destroy guest
//		let user_id = Meteor.userId();
		Meteor.logout((err)=>{
			if (err) {
				sAlert.error(`error logging out`);
			} else {
				sAlert.success(`logged out`);
			}
		});
	},
});

Template.GuestLogIn.events({
	'click .js-guestlogin'(event, instance){
		let username = instance.data.tempName;
		createGuest(username);
	},
});

Template.RegisterOrLogin.onCreated(function(){
	let instance = this;
	instance.toggled = new ReactiveVar(!Meteor.user());  // maybe no need

	instance.data.tempName = createRandomName();
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
