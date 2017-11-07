(function($) {
  "use strict"; // Start of use strict


    var mesh, renderer, scene, camera;


    initVis();
    render();

    function linspace(a,b,n) {
        if(typeof n === "undefined") n = Math.max(Math.round(b-a)+1,1);
        if(n<2) { return n===1?[a]:[]; }
        var i,ret = Array(n);
        n--;
        for(i=n;i>=0;i--) { ret[i] = (i*b+(n-i)*a)/n; }
        return ret;
    }


    function initVis() {

      
//      var container = document.createElement( 'div' );
      /*
      document.body.appendChild( container );
      var info = document.createElement( 'div' );
      info.style.position = 'absolute';
      info.style.top = '20px';
      info.style.width = '100%';
      info.style.textAlign = 'center';
      info.style.fontSize = '2.8em';
      info.style.fontFamily = 'Arial';
      info.style.backgroundColor = 'coral';
      info.innerHTML = 'Patricia\'s<br/>Playhouse';
      container.appendChild( info );
*/ 
/*
      // linspace of the day
      var lnsp = document.createElement( 'div' );
      lnsp.style.position = 'absolute';
      lnsp.style.top = '120px';
      lnsp.style.width = '100%';
      lnsp.style.textAlign = 'bottom';
      lnsp.style.fontSize = '1.2em';
      lnsp.style.fontFamily = 'Arial';
      lnsp.style.color = 'black';
      lnsp.style.backgroundColor = 'white';
      let date = new Date();
      let month = date.getMonth()+1;
      let day  = date.getDate();
      let year = date.getFullYear()-2000;
      var message = 'The linspace of the day is linspace(';
      message += month + ', ' + day + ', ' + year + ') = <br/>';
      var arr = linspace(month,day,year);
      message += '[';
      for (let a of arr) {
        message += a + ', '
      }
      message += ']';
      lnsp.innerHTML = message;
      container.appendChild( lnsp );
*/      

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );

      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
      camera.position.set( 0, 0, 40 );
      scene.add( camera );

      var geometry = new THREE.SphereGeometry( 100, 32, 32 );

      var loader = new THREE.TextureLoader();
      var texture = loader.load( 'assets/PANO_20170729_094826.jpg', render );
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.x = -1;

      //texture.matrixAutoUpdate = false; // set this to false to update texture.matrix manually

      var material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.BackSide } );

      mesh = new THREE.Mesh( geometry, material );
      mesh.rotation.y = 1.0;

      scene.add( mesh );

      //updateUvTransform();

      //initGui();

      window.addEventListener( 'resize', onWindowResize, false );

    }

    function render() {

      mesh.rotation.y += 0.0002;
      renderer.render( scene, camera );

      requestAnimationFrame(render);

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

      render();

    }


      //////////////////


  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

})(jQuery); // End of use strict

// Google Maps Scripts
var map = null;
// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);
google.maps.event.addDomListener(window, 'resize', function() {
  map.setCenter(new google.maps.LatLng(47.668266, -122.31801));
});

function init() {
  // Basic options for a simple Google Map
  // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
  var mapOptions = {
    // How zoomed in you want the map to start at (always required)
    zoom: 16,

    // The latitude and longitude to center the map (always required)
    center: new google.maps.LatLng(47.668266, -122.31801), // New York

    // Disables the default Google Maps UI components
    disableDefaultUI: true,
    scrollwheel: false,
    draggable: false,

    // How you would like to style the map.
    // This is where you would paste any style found on Snazzy Maps.
    styles: [{
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 17
      }]
    }, {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 20
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 17
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 29
      }, {
        "weight": 0.2
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 18
      }]
    }, {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 16
      }]
    }, {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 21
      }]
    }, {
      "elementType": "labels.text.stroke",
      "stylers": [{
        "visibility": "on"
      }, {
        "color": "#000000"
      }, {
        "lightness": 16
      }]
    }, {
      "elementType": "labels.text.fill",
      "stylers": [{
        "saturation": 36
      }, {
        "color": "#000000"
      }, {
        "lightness": 40
      }]
    }, {
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 19
      }]
    }, {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 20
      }]
    }, {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 17
      }, {
        "weight": 1.2
      }]
    }]
  };

  // Get the HTML DOM element that will contain your map
  // We are using a div with id="map" seen below in the <body>
  var mapElement = document.getElementById('map');

  // Create the Google Map using out element and options defined above
  map = new google.maps.Map(mapElement, mapOptions);

  // Custom Map Marker Icon - Customize the map-marker.png file to customize your icon
  var image = 'img/map-marker.svg';
  var myLatLng = new google.maps.LatLng(47.668626, -122.31801);
  var beachMarker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: image
  });
}
