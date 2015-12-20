Template.CheckIn.helpers({
	checkedPlayer: function() {
		var userId = Meteor.userId();
		if(userId) {
			var checked_player = Session.get('checked_in');
			return checked_player;
		}
	},
})

Template.CheckIn.events({
	'click #submit': function(evt) {
		evt.preventDefault();
		var student_id = $('#student_id').val();
		Meteor.call('checkin', student_id, function(err, data) {
			if (err) {
				console.log(err);
			}
			else {
				$('#code').qrcode("https://www.google.com.hk");
				Session.set('checked_in', data);
			}
		});
	},
	'click #clear': function() {
		$('#code').empty();
		Session.set('checked_in', undefined);
	},
});
