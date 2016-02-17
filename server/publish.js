Meteor.publish('states', function() {
	if(this.userId) {
		return States.find();
	}
});

Meteor.publish('all_participants', function() {
	if(this.userId) {
		return Profiles.find();
	}
});

Meteor.publish('playerList', function() {
	if(this.userId) {
		//return Players.find({ group: false });
		return Players.find();
	}
});

Meteor.publish('groupList', function() {
	if(this.userId) {
		return Groups.find();
	}
});

Meteor.publish('voteGroups', function() {
	var list = Groups.find({}, { fields: { members: 0  }  });
	return list;
});
