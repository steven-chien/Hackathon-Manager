Meteor.methods({
	'checkin': function(student_id) {
		var userId = Meteor.userId();
		if(userId) {
			var player = Players.findOne({ sid: student_id });
			if(player) {
				Players.update(player._id, { $set: { checked: true } });
			}
			else {
				throw new Meteor.Error(400,'ID not registered!');
			}
			return { data: player }
		}
	}
});
