Template.Message.helpers({
/*	accesscode(){
		let instance = Template.instance();
		return instance.accesscode;
	},*/
	/*messages(){
		let instance = Template.instance();
		return Messages.find({roomid: instance.accesscode}, {
			sort: {timestamp: 1},
			limit: 5,
		});
	},*/
	parseTime(arg){
		return moment(arg).format('LT');
	},
});
