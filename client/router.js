Router.onBeforeAction(function() {
	if (!Meteor.userId()) {
		this.render('landingPage');
	} else {
		this.next();
	}
});

Router.route('/', function () {	
	this.redirect('/control-panel');
});

Router.route('/control-panel', function () {
	this.layout('controlPanel');
	console.log(Meteor.user());
	if (Meteor.user() && Meteor.user().profile.profileSetupRequired) {
		this.render('profile');
	} else {
		this.render('guests');
	}
});

Router.route('/control-panel/guests', function () {
	this.layout('controlPanel');
	this.render('guests');
});

Router.route('/control-panel/offers', function () {
	this.layout('controlPanel');
	this.render('offers');
});

Router.route('/control-panel/profile', function () {
	this.layout('controlPanel');
	this.render('profile');
});