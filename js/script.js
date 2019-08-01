if (!navigator.geolocation) {  
     console.log("Nincs adat")}
else {
  navigator.geolocation.getCurrentPosition(function(position) {
$(document).ready(function() {
   var lat=position.coords.latitude;
   var lon=position.coords.longitude;
    $.getJSON('https://fcc-weather-api.glitch.me/api/current?lat='+ lat +'&lon='+ lon, function(json) {
         
          var mymap=L.map('mapdiv');
          mymap.setView([lat, lon],12);
          var backgroundLayer=L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target=_blank>OpenStreetMap közreműködők</a>'});
          mymap.addLayer(backgroundLayer);
          mymap.on('mousemove', function (e){
            str="Északi-szélesség: "+e.latlng.lat.toFixed(5)+" Keleti-hosszúság: "+e.latlng.lng.toFixed(5)+" Nagyítás szint: "+mymap.getZoom();
          $("#map_coords").html(str);
          });
          var geolocation= L.marker([lat, lon]);
          geolocation.addTo(mymap);
          var toggleC = false;
          var temp = json.main.temp;
		var tempC = Math.round(temp);
	     var tempF = Math.round(temp*9/5 + 32);
          var html='';
          
          html+= '<p>'+ json.name+ ', ' + json.sys.country+ '</p>' + '<p>' + 'Hőmérséklet: '+ '<span id="temp">' + parseInt(json.main.temp).toFixed(0) +  ' &deg;'+'</span>' + '<span id="gomb">' + 'C  ' + '</span>' + '<br>'+ '<p>'+ 'Légnedvesség: '+ json.main.humidity+' %'+'</p>' + '<p>' + json.weather[0].main + '</p>' + '</p>' + '<p><img src=' + json.weather[0].icon + '></p>'; // add data to the left side, humidity, temperature, town, icon (temp) convert to number and fixed 0 decimal value
         
         
          $(".message").html(html);
        
          $("#gomb").on("click", function(e) {
				
			    if (!toggleC) { 
					$("#gomb").html("F ");
                         $("#temp").html(tempF+" &deg;");
                         toggleC=true;
				} else {
					$("#gomb").html("C ");
                         $("#temp").html(tempC +" &deg;"); 
                         toggleC=false;
                    }
            });
       });
     });
   });
};
