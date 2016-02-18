Meteor.methods({
	addGroup: function(name, members) {
		var userId = Meteor.userId();
		if(userId) {
			console.log(members);
			var groupId = Groups.insert({ name: name, members: members });
			Players.update({ _id: { $in: members } }, { $set: { group: groupId } }, { multi: true });
		}
	},
        delGroup: function(groupId) {
		Players.update({ group: groupId }, { $set: { group: false } }, { multi: true });
                Groups.remove(groupId);
        }
});
