if (Meteor.isClient) {

	var gMap, gGeocoder, gMarker;

	Template.profile.rendered = function () {
		gMap = new google.maps.Map(document.getElementById('map-canvas'), {
			center: {lat: 0, lng: 0},
			zoom: 1
		});
		gGeocoder = new google.maps.Geocoder();

		this.autorun(function () {
			var userModel = Meteor.user();
			if (userModel && userModel.profile && userModel.profile.location) {
				var location = new google.maps.LatLng(userModel.profile.location.lat, userModel.profile.location.lng);
				gMap.setCenter(location);
				gMap.setZoom(16);
				gMarker = new google.maps.Marker({
					map: gMap,
					position: location
				});
			}
		});
	};
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
		hotelLink: function () {
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
			gGeocoder.geocode({'address': template.find('#addressInput').value}, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					Meteor.users.update({_id: Meteor.userId()}, {
						$set: {
							'profile.location.lat': results[0].geometry.location.lat(),
							'profile.location.lng': results[0].geometry.location.lng()
						}
					});
				}
			});
			return false;
		},
		'keyup #addressInput': function (e) {
			gGeocoder.geocode({'address': e.currentTarget.value}, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					gMap.setCenter(results[0].geometry.location);
					gMap.setZoom(16);
					if (!gMarker) {
						gMarker = new google.maps.Marker({
							map: gMap,
							position: results[0].geometry.location
						});
					} else {
						gMarker.setPosition(results[0].geometry.location);
					}
				}
			});
		},
		'change #logoInput': function(e){
			var logoFile = e.currentTarget.files[0],
				logoReader = new FileReader();
			logoReader.onload = function (e) {
				$('#logoThumbnail').attr('src', e.target.result);
				$('#logoThumbnail').show();
				$('#logoButton').hide();
			};
			logoReader.readAsDataURL(logoFile);
		},
		'change #coverInput': function(e){
			var coverFile = e.currentTarget.files[0],
				coverReader = new FileReader();
			coverReader.onload = function (e) {
				$('#coverThumbnail').attr('src', e.target.result);
				$('#coverThumbnail').show();
				$('#coverButton').hide();
			};
			coverReader.readAsDataURL(coverFile);
		}
	});
}
