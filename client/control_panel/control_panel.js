Template.controlPanel.events({
	'click .logout-btn': function(e) {
		e.preventDefault();
		Meteor.logout();
	}
});