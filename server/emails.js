Meteor.methods({
	sendInfoEmail: function(guestId) {
		this.unblock();
		MailManager.sendInfoEmail(this.userId, guestId);
	}
});

MailManager = {
	sendInfoEmail: function(hotelId, guestId) {
		var guest = Guests.findOne(guestId),
			subject = 'Hello!',
			html;

		var hotel = Meteor.users.findOne(hotelId);
		var offers = Offers.find({userId: hotel._id}).fetch();

		var templateObj = {
			hotel_name: hotel.profile.name,
			hotel_url: Meteor.absoluteUrl() + 'hotel/' + hotel._id,
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