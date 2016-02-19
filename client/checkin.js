Template.CheckIn.onCreated(function(){
	this.subscribe('states'); 
});

Template.CheckIn.helpers({
	checkedPlayer: function() {
		var userId = Meteor.userId();
		if(userId) {
			var checked_player = Session.get('checked_in');
			console.log(checked_player);
			return checked_player;
		}
	},
});

Template.CheckIn.events({
	'click #submit': function(evt) {
		evt.preventDefault();
		$('#code').empty();
		Session.set('checked_in', undefined);
		var student_id = $('#student_id').val().substr(0,9).toLowerCase();
		Meteor.call('checkin', student_id, function(err, data) {
			if (err) {
				alert(err);
				$('#student_id').val('');
			}
			else {
				Session.set('checked_in', data.data);
				$('#student_id').val('');
				$('#student_id').focus();
				$('#code').qrcode(data.data.url);
			}
		});
	},
	'click #clear': function() {
		$('#code').empty();
		$('#student_id').val('');
		Session.set('checked_in', undefined);
	},
});
