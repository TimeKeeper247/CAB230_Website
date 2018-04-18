function initMap() {
  var map;
  var bounds = new google.maps.LatLngBounds();
  var mapOptions = {
      mapTypeId: 'roadmap'
  };

  // Display a map on the page
  map = new google.maps.Map(document.getElementById("resultsMap"), mapOptions);
  map.setTilt(45);

  // Multiple Markers
  var markers = [
      ['New Farm Library Wifi', -27.46736574, 153.0495841],
      ['New Farm Park Wifi', -27.47046, 153.05223]
  ];

  // Info Window Content
  var infoWindowContent = [
      ['<div class="info_content">' +
      '<h3>New Farm Library Wifi</h3>' +
      '<p>Location: 135 Sydney Street, New Farm, 4005</p>' +
      '<p><a href="individual.html">Click to view wifi hotspot</a></p>' +
      '</div>'],
      ['<div class="info_content">' +
      '<h3>New Farm Park Wifi</h3>' +
      '<p>Location: Brunswick, New Farm, 4005</p>' +
      '<p><a href="individual.html">Click to view wifi hotspot</a></p>' +
      '</div>']
  ];

  // Display multiple markers on a map
  var infoWindow = new google.maps.InfoWindow(), marker, i;

  // Loop through our array of markers & place each one on the map
  for( i = 0; i < markers.length; i++ ) {
      var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
      bounds.extend(position);
      marker = new google.maps.Marker({
          position: position,
          map: map,
          title: markers[i][0]
      });

      // Allow each marker to have an info window
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
              infoWindow.setContent(infoWindowContent[i][0]);
              infoWindow.open(map, marker);
          }
      })(marker, i));

      // Automatically center the map fitting all markers on the screen
      map.fitBounds(bounds);
  }

  // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
  var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
      this.setZoom(14);
      google.maps.event.removeListener(boundsListener);
  });
}
