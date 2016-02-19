Meteor.publish('states', function() {
	if(this.userId) {
		return States.find();
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

Meteor.publish('voteGroups', function(excludeGroup) {
	var list = Groups.find({ _id: { $ne: excludeGroup } }, { fields: { members: 0  }  });
	console.log(list.fetch());
	return list;
});
