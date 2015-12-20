Meteor.publish('states', function() {
	if(this.userId) {
		return States.find();
	}
});
