Meteor.methods({
	'checkin': function(student_id) {
		var student = Profiles.findOne({ student_id: student_id });
		Players.upsert({ 
			id: student._id 
		}, {
			id: student._id,
			sid: student.student_id,
			f_name: student.f_name,
			l_name: student.l_name,
			vote: null
		});
		return student;
	}
});
