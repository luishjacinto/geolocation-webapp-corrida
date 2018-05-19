      // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
                == PackageManager.PERMISSION_GRANTED) {
          mMap.setMyLocationEnabled(true);
      } else {
          // Show rationale and request permission.
      }

      function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 17,
          mapTypeControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
          zoomControl: false,

          styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
        });
        var infoWindow = new google.maps.InfoWindow({ map: map });

        var marker = new google.maps.Marker({
          title:"Hello World!",
          icon: 'marker.png'
        });
        marker.setMap(map);

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          setInterval(
          navigator.geolocation.watchPosition(function (position) {
            console.log(position);

            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            //infoWindow.setPosition(pos);
            //infoWindow.setContent('Local Encontrado.');
            
            var x = 0;        //Para setar o mapa na sua posição inicialmente
            if(x == 0){
              map.setCenter(pos); 
              x++;
            }                 ///////////////////////

            myloc = function(){   //Setar o centro do mapa na sua posição
              map.setCenter(pos);
            }                     //////////////////////

            marker.setPosition(pos);
          }, function (Error) {
            handleLocationError(true, infoWindow, map.getCenter());
          }, { enableHighAccuracy: true, maximumAge: 500, timeout: 500})
          , 500);
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }
      map.setCenter(pos);


      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        //infoWindow.setPosition(pos);
        //infoWindow.setContent(browserHasGeolocation ?
         // 'Error: The Geolocation service failed.' :
         // 'Error: Your browser doesn\'t support geolocation.');
      }