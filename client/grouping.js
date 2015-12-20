Template.qrScanner.rendered = function() {
	qrScanner.on('scan', function(err, message) {
		if (message != null) {
			console.log(message);
			var id = Players.findOne({ sid: message });
			if(id) {
				var members = Session.get('members');
				if(members.indexOf(message)==-1) {
					members.push(message);
					Session.set('members', members);
				}
			}
		}
	});
};

Template.Grouping.rendered = function() {
	Meteor.subscribe('playerList');
	Session.set('members', []);
};

Template.Grouping.helpers({
	groupmates: function() {
		var userId = Meteor.userId();
		if(userId) {
			var members = Session.get('members');
			if(members) {
				return Players.find({ sid: { $in: members } });
			}
		}
	}
});
