Router.onBeforeAction(function() {
	if(!Meteor.userId()) {
		this.render('Login');
	}
	else {
		this.next();
	}
});

Router.configure({
	layoutTemplate: 'ApplicationLayout'
});

Router.route('/register', function() {
	this.render('Register');
});

Router.route('/admin', function() {
	this.render('AdminPage');
});
