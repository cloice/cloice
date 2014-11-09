if (Meteor.isClient) {

	var gMap, gMarker;

	Template.presentationPage.rendered = function () {
		var hotelId = this.data.hotelId;
		this.autorun(function () {
			var hotel = Meteor.users.findOne(hotelId);
			console.log(hotel);
			if (hotel && hotel.profile && hotel.profile.location) {
				gMap = new google.maps.Map(document.getElementById('map-canvas'), {
					center: {lat: 0, lng: 0},
					zoom: 1
				});
				var location = new google.maps.LatLng(hotel.profile.location.lat, hotel.profile.location.lng);
				gMap.setCenter(location);
				gMap.setZoom(16);
				gMarker = new google.maps.Marker({
					map: gMap,
					position: location
				});
			}
		});
	};


	Template.presentationPage.helpers({
		offersList: function() {
			return Offers.find({ 'userId': Meteor.userId() }).fetch() || [];
		}
	});
}
