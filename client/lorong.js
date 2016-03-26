if (Meteor.isClient) {

	Session.setDefault('session', 'user_'+Random.id(4));
	Session.setDefault('sessionUUID', Random.id());
}
