Meteor.methods({
	'checkin': function(student_id) {
		var userId = Meteor.userId();
		if(userId) {
			var student = Profiles.findOne({ student_id: student_id });
			if(student) {
				var affected = Players.upsert({ 
					id: student._id 
				}, {
					id: student._id,
					sid: student.student_id,
					f_name: student.f_name,
					l_name: student.l_name,
					vote: null,
					group: false
				});
	
				if(affected.insertId) {
					return { data: student, id: affected.insertId };
				}
				else {
					var id = Players.findOne({ sid: student.student_id });
					return { data: student, id: id._id };
				}
			}
			else {
				throw new Meteor.Error(400,'ID not registered!');
			}
	
		}
	}
});
