$(document).ready(function() {

	var tempC = 0;
	var tempF = 0;
	var desc = "";
	var icon = "";
	var city = "";
	var country = "";
	var degF = true;
	
	$("#units").on("click", function() {
    if (degF == true) {
      degF = false;
      $("#temp").html(tempC);
    } else {
      degF = true;
      $("#temp").html(tempF);
    }
  });

	navigator.geolocation.getCurrentPosition(function(position) {
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;

		$.ajax({
			url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&APPID=bb0c931efd9fb7215b40308f168a8de9',
			type: 'GET',
			data: {},
			datatype: 'json',
			success: function(data) {
				tempC = Math.round(data.main.temp) + "&deg C";
				tempF = Math.round(data.main.temp * 9 / 5 + 32) + "&deg F";
				desc = data.weather[0].description;
				icon = data.weather[0].icon;
				city = data.name;
				country = data.sys.country;
				$("#location").html(city + ", " + country);
				$("#temp").html(tempF);
				$("#desc").html(desc);
				$("#icon").html('<img src="http://openweathermap.org/img/w/' + icon + '.png">');
			},
		});
	});
})