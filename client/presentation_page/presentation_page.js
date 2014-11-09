if (Meteor.isClient) {

	var gMap, gMarker;

	Template.presentationPage.rendered = function () {
		var hotelId = this.data.hotelId;
		this.autorun(function () {
			var hotel = Meteor.users.findOne(hotelId);

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

				$.simpleWeather({
					location: hotel.profile.location.lat + ', ' + hotel.profile.location.lng,
					woeid: '',
					unit: 'f',
					success: function(weather) {
						html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
						html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
						html += '<li class="currently">'+weather.currently+'</li>';
						html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';
				
						$("#weather").html(html);
					},
					error: function(error) {
						$("#weather").html('<p>'+error+'</p>');
					}
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
