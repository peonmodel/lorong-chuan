/* global Random */
/* global Message: true */

Message = CollectionTools.build({
	collectionName: 'Messages',
	constructorName: 'Message',

	setRestrictiveAllowDenyDefaults: true,

	// The schema in "SimpleSchema notation"
	// see: https://github.com/aldeed/meteor-simple-schema
	schema: {
		_id: {
			type: String,
			label: 'Collection id',
			defaultValue: () => Random.id()
		},
		room_id: {
			type: String,
			label: 'Chat room id',
			defaultValue: 'public'
		},
		text: {
			type: String,
			label: 'The message content',
			defaultValue: ''
		},
		sender: {
			type: String,
			label: 'The name of the sender',
			defaultValue: ''
		},
		timestamp: {
			type: Date,
			label: 'The timestamp when the message was sent',
			defaultValue: () => new Date()
		},
	},

	// additional extensions to the prototype
	prototypeExtension: {},
	constructorExtension: {
		findById: function findById(id) {
			// returns specific item with errorhandling
			check(id, String);

			let found = Message.collection.findOne({_id: id});
			if (!found) {
				throw new Meteor.Error('message-not-found','Could not find the message');
			}
			return found;
		}
	},

	// transformation for the collection
	// See: "transform option" on http://docs.meteor.com/#/full/mongo_collection
	transform: function (x) {},

	// The default prefix for generated Meteor methods
	methodPrefix: 'messages/',

	// Default rate limiting parameters for publications and methods
	defaultRateLimit: 10, // (default: 10; null to not set)
	defaultRateLimitInterval: 1000, // (default: 1000; null to not set)
});
