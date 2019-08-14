import './../lib/styles/style.css';
import './../lib/styles/styleGMaps.css';
import '../lib/scripts/headerStyling.js';
import '../lib/scripts/footerStyling.js';


var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}
window.initMap = initMap;
