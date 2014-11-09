Template.controlPanel.helpers({
	loggedAsMessage: function() {
		return Meteor.user().emails[0].address;
	}
});

Template.controlPanel.events({
	'click .logout-btn': function() {
		Meteor.logout();
	}
});