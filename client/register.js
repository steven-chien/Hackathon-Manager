Template.Register.helpers({
	participants: function() {
		var userId = Meteor.userId();
		if(userId) {
			var result = Session.get('parsed_csv');
			if(result)
				return result.data;
		}
	}
});

Template.Register.events({
	'click #read': function(event, template) {
		Papa.parse(template.find('#csv-file').files[0], {
			header: true,
			complete: function(results) {
				console.log(results);
				Session.set('parsed_csv', results);
			},
			skipEmptyLines: true
		});
	},
	'click #clear': function(event) {
		Session.set('parsed_csv', undefined);
	},
	'click #submit': function(event) {
		var data = Session.get('parsed_csv');
		if(data) {
			Meteor.call('register', data.data);
			Session.set('parsed_csv', undefined);
		}
	}
});
