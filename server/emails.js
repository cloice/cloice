var nodemailer = Meteor.npmRequire('nodemailer');

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
		var offers = Offers.find({userId: hotel._id}, {limit:3}).fetch();

		var templateObj = {
			hotel_cover: hotel.profile.cover,
			hotel_name: hotel.profile.name,
			hotel_logo: hotel.profile.logo,
			hotel_description: hotel.profile.description,
			hotel_address: hotel.profile.address,
			hotel_directions: hotel.profile.directions,
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