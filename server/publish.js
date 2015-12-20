Meteor.publish('states', function() {
	if(this.userId) {
		return States.find();
	}
});

Meteor.publish('playerList', function() {
	if(this.userId) {
		return Players.find({ group: false });
	}
});
