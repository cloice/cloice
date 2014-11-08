Template.guests.events({
	'click .logout-btn': function() {
		Meteor.logout();
	}
});