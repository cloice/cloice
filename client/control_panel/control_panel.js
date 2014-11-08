Template.controlPanel.events({
	'click .logout-btn': function() {
		Meteor.logout();
	}
});