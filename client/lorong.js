import { _ } from "lodash";
// note, moment package dont support import ES6 syntax
// reference: https://github.com/moment/moment/issues/2608
//import { moment } from "moment";
//moment = require('moment');

if (Meteor.isClient) {
	Meteor.startup(function(){
		
		$(window).bind('beforeunload', ()=>{
			Meteor.call('Main/onBrowserClose');
		});
		
	});
}
