Template.Grouping.rendered = function() {
	/* hardcode for testing */
	var url = Meteor.absoluteUrl();
	var url = '\^' + url + 'vote\/(\\w+)$';
	Session.set('pattern', url);
	Meteor.subscribe('playerList');
	Session.set('members', []);
};

Template.Grouping.helpers({
	groupmates: function() {
		var userId = Meteor.userId();
		if(userId) {
			var members = Session.get('members');
			if(members) {
				return Players.find({ _id: { $in: members } });
			}
		}
	},
	groups: function () {
		var userId = Meteor.userId();
		if(userId) {
		}
	}
});

Template.Grouping.events({
	'click #scan': function(evt) {
		var userId = Meteor.userId();
		if(userId) {
			cordova.plugins.barcodeScanner.scan(
				function(result) {
					if(!result.cancel) {
						Meteor.call('log', result.text);
						var pattern = new RegExp(Session.get('pattern'), 'g');
						Meteor.call('log', Session.get('pattern'));
						var matched = pattern.exec(result.text);
						Meteor.call('log', matched);
						var id = Players.findOne(matched[1]);
						if(id) {
							var members = Session.get('members');
							if(members.indexOf(matched[1])==-1) {
								members.push(matched[1]);
								Session.set('members', members);
							}
						}
					}
					else {
						alert('Scan cancelled!');
					}
				},
				function(error) {
					alert(error);
				}
			);
		}
	},
	'click #add': function() {
		var sid = $('#new-sid').val();
		var record = Profiles.find({student_id: sid});
		console.log(record);
	},
	'click .player': function(evt) {
		var userId = Meteor.userId();
		if(userId) {
			var members = Session.get('members');
			Meteor.call('log', this._id);
			Meteor.call('log', members.indexOf(this._id));
			var index = members.indexOf(this._id);
			if(index!=-1) {
				members.splice(index, 1);
				Session.set('members', members);
			}
		}
	},
	'click #submit': function(evt) {
		var userId = Meteor.userId();
		if(userId) {
			var members = Session.get('members');
			var name = $('#name').val();
			if(name!='' && members.length!=0) {
				Meteor.call('addGroup', name, members);
			}
		}
	}
});
