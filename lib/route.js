Router.onBeforeAction(function() {
	if(!Meteor.userId()) {
		this.render('Login');
	}
	else {
		this.next();
	}
}, { except: ['vote'] });

Router.configure({
	layoutTemplate: 'ApplicationLayout',
	notFoundTemplate: 'NotFound'
});

Router.route('/vote/:_id', function() {
	this.render('Vote');
}, { 
	name: 'vote',
});

Router.route('/register', function() {
	this.render('Register');
}, {
	name: 'register',
});

Router.route('/checkin', function() {
	this.render('CheckIn');
}, {
	name: 'checkin',
});

Router.route('/grouping', function() {
	this.render('Grouping');
}, {
	name: 'grouping',
});

Router.route('/polling', function() {
	this.render('Polling');
}, {
	name: 'polling',
});

Router.route('/admin', function() {
	this.render('AdminPage');
}, {
	name: 'admin',
});
