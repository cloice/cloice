Template.guests.helpers({
	'guestsList': function() {
		return Guests.find({
			'userId': Meteor.userId()
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
		return Guests.findOne(Session.get('guestId')) || {};
	}
});

Template.guests.events({
	'click .save': function(e) {
		var formElements = guestForm.elements,
			guest = {};

		guest.id = formElements['id'].value;
		guest.firstName = formElements['first-name'].value;
		guest.lastName = formElements['last-name'].value;
		guest.email = formElements['email'].value;
		guest.arrival = new Date(formElements['arrival'].value);
		guest.departure = new Date(formElements['departure'].value);
		guest.userId = Meteor.userId();

		// for(var key in guest) {
		// 	if(guest.hasOwnProperty(key) && guest[key].length) {
		// 		return false;
		// 	}
		// }
		if(typeof guest.id === Number && guest.id > 0)
			Guests.update({
				'_id': guest.id
			}, {
				firstName: guest.firstName,
				lastName: guest.lastName,
				email: guest.email,
				arrival: guest.arrival,
				departure: guest.departure,
				'userId': guest.userId
			});
		else {
			delete guest.id;
			Guests.insert(guest);
		}

		Session.set('guestId', null);

		return false;
	},
	'click .edit': function(e) {
		Session.set('guestId', this._id);
	},
	'click .remove': function(e) {
		Guests.remove({
			'_id': this._id
		})
	}
});