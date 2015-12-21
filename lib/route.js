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

Router.route('/', function() {
	Session.set('navToggle', false);
	this.render('AdminPage');
});

Router.route('/vote/:_id', function() {
	Session.set('navToggle', false);
	this.render('Vote', {
		data: { playerId: this.params._id }
	});
}, { 
	name: 'vote',
});

Router.route('/register', function() {
	Session.set('navToggle', false);
	this.render('Register');
}, {
	name: 'register',
});

Router.route('/checkin', function() {
	Session.set('navToggle', false);
	this.render('CheckIn');
}, {
	name: 'checkin',
});

Router.route('/grouping', function() {
	Session.set('navToggle', false);
	this.render('Grouping');
}, {
	name: 'grouping',
});

Router.route('/polling', function() {
	Session.set('navToggle', false);
	this.render('Polling');
}, {
	name: 'polling',
});

Router.route('/admin', function() {
	Session.set('navToggle', false);
	this.render('AdminPage');
}, {
	name: 'admin',
});
