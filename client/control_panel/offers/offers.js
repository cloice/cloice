Template.offers.helpers({
	'offersList': function() {
		return Offers.find({
			'userId': Meteor.userId()
		}).fetch();
	},
	offer: function() {
		return Offers.findOne(Session.get('offerId')) || {};
	},
	imageOrPlacholder: function(img) {
		return img || "http://placehold.it/180x180";
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

		if(offer.id)
			Offers.update({
				'_id': offer.id
			}, {
				$set: {
					title: offer.title,
					description: offer.description,
					price: offer.price,
					startDate: offer.startDate,
					endDate: offer.endDate,
					userId: offer.userId
				}
			});
		else {
			delete offer.id;
			Session.set('offerId', Offers.insert(offer));
		}

		if (formElements['image'].files.length) {
			var imageFile = formElements['image'].files[0],
				imageReader = new FileReader(),
				offerId = Session.get('offerId');

			imageReader.onload = function (e) {
				Offers.update({_id: offerId}, {$set: {'image': e.target.result}});
			};
			imageReader.readAsDataURL(imageFile);
		}

		Session.set('offerId', null);
		offerForm.reset();
		$('#imageThumbnail').removeAttr('src');
		alertify.success("Offer saved");
		return false;
	},
	'click .edit': function(e) {
		Session.set('offerId', this._id);
	},
	'click .remove': function(e) {
		Offers.remove({
			'_id': this._id
		})
	},
	'change #image': function(e) {
		var imageFile = e.currentTarget.files[0],
			imageReader = new FileReader();
		imageReader.onload = function (e) {
			$('#imageThumbnail').attr('src', e.target.result);
		};
		imageReader.readAsDataURL(imageFile);
	}
});