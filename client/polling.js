Template.Polling.helpers({
	statistics: function() {
		var userId = Meteor.userId();
		if(userId) {
			var result = Session.get('vote_result', data);
			return result;
		}
	}
});

Template.Polling.events({
	'click #count': function(evt) {
		var userId = Meteor.userId();
		if(userId) {
			Meteor.call('countVotes', function(err, data) {
				if(!err && data) {
					console.log(data);
					Session.set('vote_result', data);
				}
			});
		}
	}
});
