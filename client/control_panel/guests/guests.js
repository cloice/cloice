Template.guests.helpers({
	'guestsList': function() {
		return Guests.find({
			'userId': Meteor.userId()
		}).fetch();
	},
	guest: function() {
		return Guests.findOne(Session.get('guestId')) || {};
	}
});

Template.guests.events({
	'click .save': function(e) {
		var formElements = guestForm.elements,
			guest = {},
			guestId = Session.get('guestId');

		guest.firstName = formElements['first-name'].value;
		guest.lastName = formElements['last-name'].value;
		guest.email = formElements['email'].value;
		guest.arrival = new Date(formElements['arrival'].value);
		guest.departure = new Date(formElements['departure'].value);
		guest.userId = Meteor.userId();

		if(guestId)
			Guests.update({
				'_id': guestId
			}, {
				firstName: guest.firstName,
				lastName: guest.lastName,
				email: guest.email,
				arrival: guest.arrival,
				departure: guest.departure,
				userId: guest.userId
			});
		else {
			Guests.insert(guest, function(err, _id) {
				if (!err) {
					Meteor.call('sendInfoEmail', _id);
				}
			});
		}

		Session.set('guestId', null);
		guestForm.reset();
		return false;
	},
	'click .edit': function(e) {
		Session.set('guestId', this._id);
	},
	'click .remove': function(e) {
		Guests.remove({
			'_id': this._id
		});
	}
});