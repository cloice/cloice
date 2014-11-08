Meteor.methods({
	sendInfoEmail: function(guestId) {
		this.unblock();
		MailManager.sendInfoEmail(guestId);
	}
});

MailManager = {
	sendInfoEmail: function(guestId) {
		var guest = Guests.findOne(guestId),
			subject = 'Hello!',
			html;

		var hotel = Meteor.users.findOne(this.userId);
		var offers = Offers.find({user_id: hotel._id});

		var templateObj = {
			hotel_name: hotel.profile.name,
			hotel_url: Meteor.absoluteUrl() + '/hotel/' + hotel._id,
			offers: offers
		}

		html = Handlebars.templates['info_email'](templateObj);

		if (guest && guest.email) {
			Email.send({
				to: guest.email,
				from: Constants.fromEmail,
				subject: subject,
				html: html
			});	
		}
	}
};