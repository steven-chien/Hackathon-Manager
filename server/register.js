Meteor.methods({
	'register': function(data) {
		var userId = Meteor.userId();
		if(userId && data) {
			console.log(data);
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
				var player = Players.findOne({ sid: data[i].StudentId });
				var url = Meteor.absoluteUrl() + 'vote/' + player._id;
				console.log(url);
				try {
					var response = HTTP.post('https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyAtky8NiKEYjCx0p5hiov5E4FYwctPBoe0', { data: { "longUrl": url }, headers: { "content-type": "application/json" } });
					console.log('response: '+response.data.id);
					Players.update({ sid: data[i].StudentId }, { $set: { url: response.data.id } });
				}
				catch(e) {
					console.log(e);
				}
			}
		}
	}
});
