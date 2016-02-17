Meteor.methods({
	addGroup: function(name, members) {
		var userId = Meteor.userId();
		if(userId) {
			console.log(members);
			Players.update({ _id: { $in: members } }, { $set: { group: true } }, { multi: true });
			Groups.insert({ name: name, members: members });
		}
	},
        delgroup: function(gid) {
                console.log(gid);
                var my_group = Groups.remove({_id:gid});
                console.log(my_group);
        }
});
