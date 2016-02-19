Template.Vote.rendered = function() {
	var playerId = Router.current().params._id;
	Meteor.call('voted', playerId, function(err, data) {
		//Ensure the id is valid
		if(err) {
			console.log(err);
			Session.set('valid', false);
			return;
		} else {
			Session.set('valid', true);
		}
		//Check if voted or not
		console.log(data.voted);
		Session.set('voted', data.voted);
		Session.set('profile', data.profile);
		Meteor.subscribe('voteGroups', data.profile.groupId);
	});
};

Template.Vote.helpers({
        // Ensure the id is valid
        'valid': function() {
		var state = Session.get('valid');
		if(state)
			return state;
        },
        // Return the player has voted or not
	'voted': function() {
		if(typeof Session.get('voted')=='undefined')
			return false;
		return true;
	},
        // Return name of the group which the player has voted
	'votedTo': function() {
		return Session.get('voted');
	},
        // Return the group list
	'voteGroups': function() {
		return Groups.find();
	},
	'profile': function() {
		var profile = Session.get('profile');
		return profile;
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
