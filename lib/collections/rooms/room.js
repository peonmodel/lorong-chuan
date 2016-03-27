/* global Random */
/* global Room: true */

Room = CollectionTools.build({
	collectionName: 'Rooms',
	constructorName: 'Room',

	setRestrictiveAllowDenyDefaults: true,

	// The schema in "SimpleSchema notation"
	// see: https://github.com/aldeed/meteor-simple-schema
	schema: {
		_id: {
			type: String,
			label: 'Collection id',
			defaultValue: () => Random.id()
		},
		is_public: {
			type: Boolean,
			label: 'Is this room public accessible',
			defaultValue: true
		},
		capacity: {
			type: Number,
			label: 'Maximum number of people allowed in the room',
			defaultValue: 8
		},
		occupancy: {
			type: Number,
			label: 'Current number of people in the room',
			defaultValue: 0
		},
	},

	// additional extensions to the prototype
	prototypeExtension: {},
	constructorExtension: {
		findById: function findById(id) {
			// returns specific item with errorhandling
			check(id, String);

			let found = Room.collection.findOne({_id: id});
			if (!found) {
				throw new Meteor.Error('room-not-found','Could not find the room');
			}
			return found;
		}
	},

	// transformation for the collection
	// See: "transform option" on http://docs.meteor.com/#/full/mongo_collection
	transform: function (x) {return x;},

	// The default prefix for generated Meteor methods
	methodPrefix: 'rooms/',

	// Default rate limiting parameters for publications and methods
	defaultRateLimit: 10, // (default: 10; null to not set)
	defaultRateLimitInterval: 1000, // (default: 1000; null to not set)
});
