import './../lib/styles/style.css';
import './../lib/styles/styleGMaps.css';
import '../lib/scripts/headerStyling.js';
import '../lib/scripts/footerStyling.js';
import {api_key} from '../lib/scripts/apikey.js';
import {rentalAgents} from '../lib/scripts/rentalAgents.js';
// import {rentalAgentsKeyedByBeach} from '../lib/scripts/rentalAgents.js';
import {theIWArray} from '../lib/scripts/rentalAgents.js';

// console.log(`${JSON.stringify(rentalAgentsKeyedByBeach["Ocean City, MD"])}`);


let myStyle = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#1b7499"
            },
            {
                "visibility": "on"
            }
        ]
    }
];

var map;
var vabeach = {lat: 36.50, lng: -75.9};
var ocmd = {lat: 38.5, lng: -75.04};
var joiseyShore = {lat: 39.41, lng: -74.60};
var ncBeaches = {lat: 34.00, lng: -78.35};

var EAST_COAST_BOUNDS = {
    north: 42.0,
    south: 30.0,
    west: -80.00,
    east: -72.00,
};

function CenterControl(controlDiv, map, cityName, latlng, zLevel) {
    let controlUI = document.createElement('div');
    controlUI.classList.add("dOuter");
    controlDiv.appendChild(controlUI); 
    
    let controlText = document.createElement('div');
    controlText.classList.add("dInner");
    controlText.innerHTML = cityName;
    controlText.style.fontFamily = "Josefin Sans, monotype";
    controlUI.appendChild(controlText);
  
    controlUI.addEventListener('click', function() {
        map.panTo(latlng);
        map.setZoom(zLevel);
    });
}
  
function anotherControl(controlDiv) {
    let controlUI = document.createElement('div');
    controlUI.classList.add("dInstructionOuter");
    controlDiv.appendChild(controlUI); 
    
    let controlText = document.createElement('div');
    controlText.classList.add("dInstructionInner");
    controlText.innerHTML = `Zoom in on beach and click on icons for rental info.`;
    controlText.style.fontFamily = "Josefin Sans, monotype";
    controlUI.appendChild(controlText);
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: ocmd,
        styles: myStyle,
        mapTypeControl: false,
        streetViewControl: false,
        restriction: {
        latLngBounds: EAST_COAST_BOUNDS,
        strictBounds: false,
        },
    });

    let centerControlDiv1 = document.createElement('div');
    CenterControl(centerControlDiv1, map, 'Jersey Shore', joiseyShore, 9 );

    let centerControlDiv2 = document.createElement('div');
    CenterControl(centerControlDiv2, map, 'Maryland/Delaware', ocmd, 10 );
    
    let centerControlDiv3 = document.createElement('div');
    CenterControl(centerControlDiv3, map, 'Virginia Beach/OBX', vabeach, 9 );
    
    let centerControlDiv4 = document.createElement('div'); 
    CenterControl(centerControlDiv4, map, 'Carolina Beaches', ncBeaches, 9 );
    
    let instructionControlDiv = document.createElement('div');
    anotherControl(instructionControlDiv);
    
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(centerControlDiv1);
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(centerControlDiv2);
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(centerControlDiv3);
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(centerControlDiv4);
    
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(instructionControlDiv);

    let url = `./lib/images/longMascotIcon.png`;
        let image = {
        url: url, 
        scaledSize: new google.maps.Size(38, 38),
    };

    /* put a marker on the map for each location, using the SH logo  */
    rentalAgents.forEach(agent => agent.locations.forEach(loc => {
        /* create a marker with the SH logo at every location based on rentalAgents[] */
        let rentMarker = new google.maps.Marker({
            position: new google.maps.LatLng(loc.location),
            map: map,
            icon: image,
        })

        /* create an infoWindow, which shows when the markers are clicked  */
        let contentString = theIWArray[loc.beach].outerHTML;
        let iw = new google.maps.InfoWindow({
                content: contentString, 
            });
        
        /* create the listener for each marker, which displays the infoWindow content */
        rentMarker.addListener('click', function () {
            let theIWDiv = theIWArray[loc.beach];
            /* toggle opening and closing of infowWindow object */
            if(theIWDiv.style.visibility === 'hidden') {  
                theIWDiv.style.visibility = 'visible';
                let contentString = theIWArray[loc.beach].outerHTML;
                iw.content =  contentString;
                iw.open(map, rentMarker);
            } else {
                iw.close(map, rentMarker);
                theIWDiv.style.visibility = 'hidden';
            }
        })
    })); 
  
    map.addListener('zoom_changed', function () {
        if(map.getZoom() < 6) {
            map.setZoom(6);
            }
            if(map.getZoom() > 13) {
            map.setZoom(13);
            }
    });
}

// Do not delete! //
window.initMap = initMap;
// Do not delete! //
