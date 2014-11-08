Router.onBeforeAction(function() {
	if (!Meteor.userId()) {
		this.render('landingPage');
	} else {
		this.next();
	}
}, { 
	except: ['hotelPage'] 
});

Router.route('/', function () {	
	this.redirect('/control-panel');
});

Router.route('/control-panel', function () {
	if (Meteor.user() && Meteor.user().profile.profileSetupRequired) {
		this.redirect('/control-panel/profile');
	} else {
		this.redirect('/control-panel/guests');
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

Router.route('/hotel/:hotelId', {
	name: 'hotelPage', 
	action: function () {
		var userModel = Meteor.users.findOne(this.params.hotelId);
		this.render('presentation-page', {data: {hotel: userModel}});
	}
});
