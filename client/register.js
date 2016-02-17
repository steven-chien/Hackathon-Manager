Template.Register.rendered = function() {
    Meteor.subscribe('all_participants');
};
Template.Register.helpers({
	participants: function() {
		var userId = Meteor.userId();
		if(userId) {
			var result = Session.get('parsed_csv');
			if(result)
				return result.data;
		}
	},
        all_participants: function() {
                console.log("!!!");
                console.log(Profiles.find());
                return Profiles.find();
        }
});

Template.Register.events({
	'click #read': function(evt, template) {
		var userId = Meteor.userId();
		if(userId) {
			Papa.parse(template.find('#csv-file').files[0], {
				header: true,
				complete: function(results) {
					console.log(results);
					Session.set('parsed_csv', results);
				},
				skipEmptyLines: true
			});
		}
	},
	'click #clear': function(evt) {
		Session.set('parsed_csv', undefined);
	},
	'click #submit': function(evt) {
		var userId = Meteor.userId();
		if(userId) {
			var data = Session.get('parsed_csv');
			if(data) {
				Meteor.call('register', data.data);
				Session.set('parsed_csv', undefined);
			}
		}
	},
	'click #apply': function(evt) {
		var userId = Meteor.userId();
		if(userId) {
			var student_id = $('#student_id').val();
			var name = $('#name').val();
			var year = $('#year').val();
			var email = $('#email').val();
			var phone = $('#phone').val();
			var dept = $('#dept').val();
			Meteor.call('register', [{ StudentID: student_id, Name: name, Year: year, Email: email, Phone: phone, Department: dept }]);
			$('#student_id').val('');
			$('#name').val('');
			$('#year').val('');
			$('#email').val('');
			$('#phone').val('');
			$('#dept').val('');
		}
	}
});
