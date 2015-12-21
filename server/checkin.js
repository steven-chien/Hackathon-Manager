Meteor.methods({
	'checkin': function(student_id) {
		var userId = Meteor.userId();
		if(userId) {
			var student = Profiles.findOne({ student_id: student_id });
			if(student) {
				var player = Players.findOne({ id: student._id });
				if(player) {
					return { data: student, id: player._id };
				}
				else {
					Players.insert({
						id: student._id,
						sid: student.student_id,
						f_name: student.f_name,
						l_name: student.l_name,
						vote: null,
						group: false
					}, function(err, result) {
						return { data: student, id: result };
					});
				}
			}
			else {
				throw new Meteor.Error(400,'ID not registered!');
			}
	
		}
	}
});
