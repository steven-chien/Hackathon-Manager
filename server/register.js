Meteor.methods({
	'register': function(data) {
		var userId = Meteor.userId();
		if(userId && data) {
			for(var i=0; i<data.length; i++) {
				Players.upsert({
					sid: data[i].StudentId
				},{
					sid: data[i].StudentId,
					name: data[i].Name,
					year: data[i].Year,
					phone: data[i].Phone,
					dept: data[i].Department,
					group: false,
					checked: false
				});
			}
		}
	}
});
