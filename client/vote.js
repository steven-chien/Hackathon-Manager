Template.Vote.rendered = function() {
	var pattern = new RegExp('\^' + Meteor.absoluteUrl() + 'vote\/(\\w+)$', 'g');
	var matched = pattern.exec(Router.current().url);
	Meteor.call('voted', matched[1], function(err, data) {
		if(data) {
			Session.set('voted', true);
		}
		else {
			Meteor.subscribe('voteGroups');
			Session.set('playerId', matched[1]);
			Session.set('voted', false);
		}
	});
};

Template.Vote.helpers({
	'voted': function() {
		var state = Session.get('voted');
		if(state)
			return "true";
	},
	'voteGroups': function() {
		return Groups.find();
	}
});

Template.Vote.events({
	'click #vote': function(evt) {
		event.preventDefault();
		Meteor.call('vote', Session.get('playerId'), this._id, function(err, data) {
			if(!data) {
				alert('Error');
			}
			Meteor._reload.reload();
		});
	}
})
