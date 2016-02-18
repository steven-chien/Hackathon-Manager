Meteor.methods({
	'checkin': function(student_id) {
		var userId = Meteor.userId();
		if(userId) {
			var player = Players.findOne({ sid: student_id });
			if(player && player.present!=true) {
				Players.update({ sid: student_id }, { $set: { checked: true } });
				return { data: player };
			}
			else {
				throw new Meteor.Error(400,'ID not registered!');
			}
	
		}
	}
});
