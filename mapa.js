      if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
                == PackageManager.PERMISSION_GRANTED) {
          mMap.setMyLocationEnabled(true);
      } else {
      }

      function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 18,
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
        var infoWindow = new google.maps.InfoWindow({ map: map });//

        var marcador = new google.maps.Marker({
          title:"Hello World!",
          icon: 'marker.png'
        });
        marcador.setMap(map);

        // Try HTML5 geolocation.
        var contadorDeInicialização = 0;
        if (navigator.geolocation) {
          /*setInterval(*/
          navigator.geolocation.watchPosition(function (position) {

            var posicaoAtualizada = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            
            if(contadorDeInicialização == 0){
              map.setCenter(posicaoAtualizada); 
              contadorDeInicialização++;
            }
            
            centralizarLocalizacao = function(){
              map.setCenter(posicaoAtualizada);
              map.setZoom(18);
            }

            document.getElementById('spanDeCoordenadas').innerHTML = " lat:" + posicaoAtualizada.lat + " lng:" + posicaoAtualizada.lng;
            console.log("latitude:" + posicaoAtualizada.lat + " longitude:" + posicaoAtualizada.lng);
            marcador.setPosition(posicaoAtualizada);
          }, function (Error) {
            handleLocationError(true, infoWindow, map.getCenter());
          }, { enableHighAccuracy: true, maximumAge: 500, timeout: 500});/*
          , 500)*/;
        } else {
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }
      
      function handleLocationError(browserHasGeolocation, infoWindow, posicaoAtualizada) {
      }