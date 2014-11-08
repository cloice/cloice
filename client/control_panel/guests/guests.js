Template.guests.helpers({
	'guestsList': function() {
		return Guests.find({
			'user_id': Meteor.userId()
		}).fetch();
	},
	'tempGuest': function() {
		return {
			id: 0,
			firstName: '',
			lastName: '',
			email: '',
			arrival: '',
			departure: ''
		}
	},
	guest: function() {
		Guests.findOne();{}
	}
});

Template.guests.events({
	'click .save': function(e) {

	}
});