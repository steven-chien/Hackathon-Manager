Meteor.methods({
	'register': function(data) {
		var userId = Meteor.userId();
		if(userId && data) {
			for(var i=0; i<data.length; i++) {
				Profiles.upsert({
					student_id: data[i].StudentId
				},{
					student_id: data[i].StudentID,
					f_name: data[i].FirstName,
					l_name: data[i].LastName,
					dept: data[i].Department
				});
			}
		}
	}
});
