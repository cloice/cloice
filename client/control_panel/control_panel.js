Template.controlPanel.helpers({
	loggedAsMessage: function() {
		return Meteor.user().emails[0].address;
	}
});

Template.controlPanel.events({
	'click .logout-btn': function(e) {
		e.preventDefault();
		Meteor.logout();
	}
});