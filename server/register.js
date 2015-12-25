Meteor.methods({
	'register': function(data) {
		var userId = Meteor.userId();
		if(userId && data) {
			for(var i=0; i<data.length; i++) {
				Profiles.upsert({
					student_id: data[i].StudentID
				},{
					student_id: data[i].StudentID,
					name: data[i].Name,
					year: data[i].Year,
					email: data[i].Email,
					phone: data[i].Phone,
					dept: data[i].Department
				});
			}
		}
	}
});
