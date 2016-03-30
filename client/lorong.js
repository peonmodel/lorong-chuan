import {CodeNameWords} from "meteor/freelancecourtyard:codenames";
import { _ } from "lodash";
//import { moment } from "moment";

if (Meteor.isClient) {
	Meteor.startup(function(){
		
		$(window).bind('beforeunload', ()=>{
			Meteor.call('Main/onBrowserClose');
		});
		
	});
}
