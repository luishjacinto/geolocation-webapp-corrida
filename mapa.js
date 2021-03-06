      if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
                == PackageManager.PERMISSION_GRANTED) {
          mMap.setMyLocationEnabled(true);
      } else {
      }
      function degrees_to_radians(degrees)
      {
        var pi = Math.PI;
        return degrees * (pi/180);
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

        var inicio = new google.maps.Marker({
          title:"Hello World!",
          icon: 'inicio.png'
        });

        inicio.setMap(map);

        var final = new google.maps.Marker({
          title:"Hello World!",
          icon: 'final.png'
        });

        final.setMap(map);

        //INICIAR LOCALSTORAGE

        localStorage.latitude = 0;
        localStorage.longitude = 0;
        localStorage.distanciaPercorrida = 0;

        //FUNCOES DE BOTAO PERCURSO
        var contadorClickBotao1 = 0;

        atualizaDadosPercurso = function(lat, lng){
          //var latitudeResultante = (localStorage.latitude - lat)*1852;
          //if(localStorage.latitude == lat || localStorage.latitude == 0) latitudeResultante = 0;
          //var longitudeResultante = (localStorage.longitude - lng)*1852;
          //if(localStorage.longitude == lng || localStorage.longitude == 0) longitudeResultante = 0;

          console.log("Distancia ja percorrida " + localStorage.distanciaPercorrida);

          localStorage.distanciaPercorrida = parseFloat(localStorage.distanciaPercorrida) +
          6371*Math.acos(Math.cos(degrees_to_radians(90-localStorage.latitude))*Math.cos(degrees_to_radians(90-lat))+Math.sin(degrees_to_radians(90-localStorage.latitude))*Math.sin(degrees_to_radians(90-lat))*Math.cos(degrees_to_radians(localStorage.longitude-lng)))*1;
          //Math.sqrt((latitudeResultante * latitudeResultante) + (longitudeResultante * longitudeResultante));

          console.log("Distancia total percorrida " + localStorage.distanciaPercorrida);
          console.log("------------------------");
          //atualizar local storage com ultimas coodernadas
          localStorage.latitude = lat;
          localStorage.longitude = lng;
          document.getElementById('distanciaPercorrida').innerHTML = localStorage.distanciaPercorrida;


          if(localStorage.distanciaUltimaCorrida == undefined){
            document.getElementById('distanciaUltimaCorrida').innerHTML = "-";
          }else{document.getElementById('distanciaUltimaCorrida').innerHTML = localStorage.distanciaUltimaCorrida;
          }

          if(localStorage.velocidadeUltimaCorrida == undefined){
            document.getElementById('velocidadeUltimaCorrida').innerHTML = "-";
          }else{document.getElementById('velocidadeUltimaCorrida').innerHTML = localStorage.velocidadeUltimaCorrida;
          }

        }

        definirStatusPercurso = function(){
          var tempoDePercursoEmSegundos = (parseInt(document.getElementById('distanciaPercorrida').innerHTML)*3600 +
          parseInt(document.getElementById('Minutos').innerHTML)*60 +
          parseInt(document.getElementById('Segundos').innerHTML) +
          parseInt(document.getElementById('Centesimas').innerHTML)/100);

          var velocidadeNoPercurso = parseFloat(localStorage.distanciaPercorrida)/tempoDePercursoEmSegundos;

          document.getElementById('distanciaUltimaCorrida').innerHTML = localStorage.distanciaPercorrida+ "m";
          document.getElementById('velocidadeUltimaCorrida').innerHTML = velocidadeNoPercurso + "m/s";

          localStorage.distanciaUltimaCorrida = localStorage.distanciaPercorrida+ "m";
          localStorage.velocidadeUltimaCorrida = velocidadeNoPercurso + "m/s";

          document.getElementById('distancia').innerHTML = localStorage.distanciaPercorrida+ "m";

          document.getElementById('velocidade').innerHTML = velocidadeNoPercurso + "m/s";

        }



        //CONTADOR PARA QUANDO ACABOU DE ENTRAR NO SITE
        var contadorDeInicialização = 0;

        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(function (position) {
            //WATCH POSITION
            var posicaoAtualizada = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            //SE ACABOU DE ENTRAR NO SITE
            if(contadorDeInicialização == 0){
              map.setCenter(posicaoAtualizada);
              contadorDeInicialização++;
            }

            //ATUALIZAR DADOS DO PERCURSO NO LOCALSTORAGE
            atualizaDadosPercurso(posicaoAtualizada.lat, posicaoAtualizada.lng);


            iniciarPercurso = function(){
              if(contadorClickBotao1 == 0){
                final.setPosition(null);

                inicio.setPosition(posicaoAtualizada);
                document.getElementById("botaoComecarPercurso").innerHTML = "Finalizar Percurso";
                localStorage.latitude = 0;
                localStorage.longitude = 0;
                localStorage.distanciaPercorrida = 0;
                document.getElementById('distanciaPercorrida').innerHTML = localStorage.distanciaPercorrida;
                contadorClickBotao1++;
              }else{

                final.setPosition(posicaoAtualizada);
                definirStatusPercurso();
                document.getElementById("botaoComecarPercurso").innerHTML = "Começar Percurso";
                localStorage.latitude = 0;
                localStorage.longitude = 0;
                localStorage.distanciaPercorrida = 0;
                contadorClickBotao1--;
              }
            }

            fecharResultados = function(){
              inicio.setPosition(null);
              final.setPosition(null);
            }


            //FUNCOES DO BOTAO CENTRALIZAR
            centralizarLocalizacao = function(){
              map.setCenter(posicaoAtualizada);
              map.setZoom(18);
            }

            //COORDENADAS
            document.getElementById('spanDeCoordenadas').innerHTML = " lat:" + posicaoAtualizada.lat + " lng:" + posicaoAtualizada.lng;
            console.log("latitude:" + posicaoAtualizada.lat + " longitude:" + posicaoAtualizada.lng);

            //TROCAR POSICAO DO MARCADOR
            marcador.setPosition(posicaoAtualizada);

          }, function (Error) {
            handleLocationError(true, infoWindow, map.getCenter());
          }, { enableHighAccuracy: true, maximumAge: 0, timeout: 500});
        } else {
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, posicaoAtualizada) {
      }
