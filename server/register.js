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
				var player = Players.findOne({ sid: data[i].StudentId });
				var url = Meteor.absoluteUrl() + 'vote/' + player._id;
				console.log(url);
				try {
					//var response = HTTP.post('https://www.googleapis.com/urlshortener/v1/url?key='+Meteor.settings.googleApiKey, { data: { "longUrl": url }, headers: { "content-type": "application/json" } });
					var response = HTTP.post('https://www.googleapis.com/urlshortener/v1/url?key='+Meteor.settings.public.googleApiKey, { data: { "longUrl": url }, headers: { "content-type": "application/json" } });
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
