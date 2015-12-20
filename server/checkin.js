Meteor.methods({
	'checkin': function(student_id) {
		var student = Profiles.findOne({ student_id: student_id });
		if(student) {
			var affected = Players.upsert({ 
				id: student._id 
			}, {
				id: student._id,
				sid: student.student_id,
				f_name: student.f_name,
				l_name: student.l_name,
				vote: null
			});
			console.log(affected);
			return student;
		}
		else {
			throw new Meteor.Error(400,'ID not registered!');
		}
	}
});
