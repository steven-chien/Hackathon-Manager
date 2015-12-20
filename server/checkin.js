Meteor.methods({
	'checkin': function(student_id) {
		var student = Profiles.findOne({ student_id: student_id });
		return student;
	}
});
