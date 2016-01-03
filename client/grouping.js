Template.qrScanner.rendered = function() {
	qrScanner.on('scan', function(err, message) {
		if (message != null) {
			console.log(message);
			alert(message);
			var pattern = new RegExp(Session.get('pattern'), 'g');
			console.log(pattern);
			var matched = pattern.exec(message);
			console.log(matched);
			var id = Players.findOne(matched[1]);
			console.log(id);
			if(id) {
				var members = Session.get('members');
				if(members.indexOf(matched[1])==-1) {
					members.push(matched[1]);
					Session.set('members', members);
				}
			}
		      
		}
	});
};

Template.Grouping.rendered = function() {
	/* hardcode for testing */
	var url = Meteor.absoluteUrl();
	url = '\^' + url + 'vote\/(\\w+)$';
	Session.set('pattern', url);
	Meteor.subscribe('playerList');
	Meteor.subscribe('groupList');
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
			var groups = Groups.find();
			var groupNames = [];
			var i = 0;
			groups.forEach(function(g) {
				groupNames[i] = Object();
				groupNames[i].name = g.name;
				groupNames[i].count = g.members.length;
				i++;
			});
			console.log(groupNames);
			return groupNames;
		}
	}
});

Template.Grouping.events({
	'click #add': function(evt) {
		evt.preventDefault();
		var sid = $('#new-sid').val();
		var id = Players.findOne({ sid: sid });

		if(id) {
			var members = Session.get('members');
			if(members.indexOf(id._id)==-1) {
				members.push(id._id);
				Session.set('members', members);
			}
		}
		else {
			alert(sid+" not found!");
		}

		$('#new-sid').val('');
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
		evt.preventDefault();
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
