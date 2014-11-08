SSR.compileTemplate('infoEmail', Assets.getText('info_email.html'));

Meteor.methods({
	sendInfoEmail: function(guestId) {
		this.unblock();
		MailManager.sendInfoEmail(guestId);
	}
});

MailManager = {
	sendInfoEmail: function(guestId) {
		var guest = Guests.findOne(guestId),
			subject = 'Hey!',
			html = SSR.render('infoEmail', {
				firstName: 'John', 
				lastName: 'Anderson'
			});

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