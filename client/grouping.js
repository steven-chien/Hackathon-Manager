Template.qrScanner.rendered = function() {
	qrScanner.on('scan', function(err, message) {
		if (message != null) {
			HTTP.get('https://www.googleapis.com/urlshortener/v1/url', { params: { "key": Meteor.settings.public.googleApiKey, "shortUrl": message } }, function(err, data) {
				if(!err && data.statusCode==200) {
					var url = data.data.longUrl;
					var pattern = new RegExp(Session.get('pattern'), 'g');
					var matched = pattern.exec(url);
					var profile = Players.findOne(matched[1]);
					if(profile && profile.group==false) {
						var members = Session.get('members');
						if(members.indexOf(matched[1])==-1) {
							members.push(matched[1]);
							Session.set('members', members);
						}
					}
				}
				else {
					alert(err);
				}
			});
		      
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
                                groupNames[i].namelist = '';
                                g.members.forEach(function(h) {
                                    var h_name = Players.findOne({_id: h});
                                    if(typeof h_name != 'undefined')
                                        groupNames[i].namelist += h_name.sid+' '+h_name.name+'<br>';
                                });
				groupNames[i]._id = g._id;
				i++;
			});
			return groupNames;
		}
	}
});

Template.Grouping.events({
	'click #add': function(evt) {
		evt.preventDefault();
		Meteor.subscribe('playerList');

		var sid = $('#new-sid').val();
		var profile = Players.findOne({ sid: sid });

		if(profile && profile.group==false) {
			//check if the player is already in other team
			if(Groups.find({'members':id._id}).count()>0) {
				alert(sid+" already in other groups");
				return;
			}

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
				Session.set('members', []);
			}
		}
	},
        'click #delgroup': function(evt) {
		event.preventDefault();
		Meteor.call('delGroup', this._id, function(err, data) {
	//		Meteor._reload.reload();
			console.log('del');
		});
        }
});
