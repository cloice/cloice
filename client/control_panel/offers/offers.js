Template.offers.helpers({
	'offersList': function() {
		return Offers.find({
			'userId': Meteor.userId()
		}).fetch();
	},
	offer: function() {
		return Offers.findOne(Session.get('offerId')) || {};
	}
});

Template.offers.events({
	'click .save': function(e) {
		var formElements = offerForm.elements,
			offer = {};

		offer.id = Session.get('offerId');
		offer.title = formElements['title'].value;
		offer.description = formElements['description'].value;
		offer.price = formElements['price'].value;
		offer.startDate = new Date(formElements['start-date'].value);
		offer.endDate = new Date(formElements['end-date'].value);
		offer.userId = Meteor.userId();

		if (formElements['image'].files.length) {
			var imageFile = formElements['image'].files[0];
			var imageReader = new FileReader();
			imageReader.onload = function (e) {
				Offers.update({_id: offer.id}, {$set: {'image': e.target.result}});
			};
			imageReader.readAsDataURL(imageFile);
		}

		if(offer.id)
			Offers.update({
				'_id': offer.id
			}, {
				title: offer.title,
				description: offer.description,
				price: offer.price,
				startDate: offer.startDate,
				endDate: offer.endDate,
				userId: offer.userId
			});
		else {
			delete offer.id;
			Offers.insert(offer);
		}

		Session.set('offerId', null);
		offerForm.reset();
		return false;
	},
	'click .edit': function(e) {
		Session.set('offerId', this._id);
	},
	'click .remove': function(e) {
		Offers.remove({
			'_id': this._id
		})
	}
});