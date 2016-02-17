Template.Vote.rendered = function() {
        var my_id = Router.current().params._id;
	Meteor.call('voted', my_id, function(err, data) {
                //Ensure the id is valid
                if(err) {
                    console.log(err);
	      	    Session.set('valid', false);
                    return;
                } else {
	      	    Session.set('valid', true);
                }
                //Check if voted or not
                Session.set('voted', data);
                Session.set('playerId', my_id);
                Meteor.subscribe('voteGroups');
	});
};

Template.Vote.helpers({
        // Ensure the id is valid
        'valid': function() {
                return Session.get('valid');
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
