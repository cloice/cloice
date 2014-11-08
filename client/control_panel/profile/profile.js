if (Meteor.isClient) {
	Template.profile.helpers({
		logo: function () {
			var userModel = Meteor.users.findOne(Meteor.userId());
			if (userModel) {
				return userModel.profile.logo;
			}
		},
		cover: function () {
			var userModel = Meteor.users.findOne(Meteor.userId());
			if (userModel) {
				return userModel.profile.cover;
			}
		},
		hotelLink: function(){
			return location.origin + '/hotel/' + Meteor.userId();
		}
	});
	Template.profile.events({
		'submit form': function (e, template) {
			e.preventDefault();
			if (template.find('#logoInput').files.length) {
				var logoFile = template.find('#logoInput').files[0];
				var logoReader = new FileReader();
				logoReader.onload = function (e) {
					Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.logo': e.target.result}});
				};
				logoReader.readAsDataURL(logoFile);
			}
			if (template.find('#coverInput').files.length) {
				var coverFile = template.find('#coverInput').files[0];
				var coverReader = new FileReader();
				coverReader.onload = function (e) {
					Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.cover': e.target.result}});
				};
				coverReader.readAsDataURL(coverFile);
			}
			var userData = {};
			userData['profile.name'] = template.find('#nameInput').value;
			userData['profile.description'] = template.find('#descriptionInput').value;
			userData['profile.address'] = template.find('#addressInput').value;
			userData['profile.directions'] = template.find('#directionsInput').value;
			Meteor.users.update({_id: Meteor.userId()}, {$set: userData, $unset: {'profile.profileSetupRequired': ''}});
			return false;
		}
	});
}
