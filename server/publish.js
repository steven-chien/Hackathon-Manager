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

Meteor.publish('groupList', function() {
	if(this.userId) {
		return Groups.find();
	}
});

Meteor.publish('voteGroups', function() {
	var list = Groups.find({}, { fields: { members: 0  }  });
	return list;
});

Meteor.publish('voted', function(playerId) {
	console.log(playerId);
	var player = Players.find(playerId, { fields: { vote: 1 } });
	return player;
});
