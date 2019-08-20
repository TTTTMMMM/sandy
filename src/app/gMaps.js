import './../lib/styles/style.css';
import './../lib/styles/styleGMaps.css';
import '../lib/scripts/headerStyling.js';
import '../lib/scripts/footerStyling.js';
import {api_key} from '../lib/scripts/apikey.js';
import {rentalAgents} from '../lib/scripts/rentalAgents.js';
import {mapStyle1} from '../lib/scripts/mapStyle1.js';
import {theIWArray} from '../lib/scripts/rentalAgents.js';
import {theBeachesKeyedByState} from '../lib/scripts/rentalAgents.js';

// console.log(`${Object.keys(theBeachesKeyedByState)[1]}: ${JSON.stringify(theBeachesKeyedByState[Object.keys(theBeachesKeyedByState)[1]])}`);

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
        styles: mapStyle1,
        mapTypeControl: false,
        streetViewControl: false,
        restriction: {
        latLngBounds: EAST_COAST_BOUNDS,
        strictBounds: false,
        },
    });

    // Put 4 Buttons on the Google map that automatically zoom to the beach
    let centerControlDiv1 = document.createElement('div');
    CenterControl(centerControlDiv1, map, 'Jersey Shore', joiseyShore, 9 );

    let centerControlDiv2 = document.createElement('div');
    CenterControl(centerControlDiv2, map, 'Maryland/Delaware', ocmd, 10 );
    
    let centerControlDiv3 = document.createElement('div');
    CenterControl(centerControlDiv3, map, 'Virginia Beach/OBX', vabeach, 9 );
    
    let centerControlDiv4 = document.createElement('div'); 
    CenterControl(centerControlDiv4, map, 'Carolina Beaches', ncBeaches, 9 );
    
    // Put an "instructions" label on the map
    let instructionControlDiv = document.createElement('div');
    anotherControl(instructionControlDiv);
    
    // Place Beach Buttons Top Left
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(centerControlDiv1);
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(centerControlDiv2);
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(centerControlDiv3);
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(centerControlDiv4);
    
    // Place Instruction Label Top Center
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(instructionControlDiv);

    // This is the image that will be put onto the google map, scaled appropriately
    let url = `./lib/images/longMascotIcon.png`;
        let image = {
        url: url, 
        scaledSize: new google.maps.Size(38, 38),
    };

    /* put a marker on the map for each location, using the SH logo defined above */
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
  
    // Don't let the user zoom in too close or too far
    map.addListener('zoom_changed', function () {
        if(map.getZoom() < 6) {
            map.setZoom(6);
            }
            if(map.getZoom() > 13) {
            map.setZoom(13);
            }
    });
}
// Done with initMap()
// Do not delete! //
window.initMap = initMap;
// Do not delete! //

/* 
    Let's throw some states and their beaches on the map, shall we?
 */

const ulStates = document.querySelector("body > main > section:nth-of-type(3) > div > ul");

/*  const theStates = Object.keys(theBeachesKeyedByState);
 theStates.forEach(s => {
    const stateListItem = document.createElement("li");
    const stateDiv = document.createElement("div");
    stateListItem.appendChild(stateDiv);
    const h4 = document.createElement("h4");
    stateDiv.appendChild(h4);
    h4.innerHTML = s;
    ulStates.appendChild(stateListItem);
    theBeachesKeyedByState[s].forEach(bb => {
        const ptagBeach = document.createElement("p");
        stateDiv.appendChild(ptagBeach);
        ptagBeach.innerHTML = bb.beach;
    });  
 });
 */

const plusMinusButtons = document.querySelectorAll("body > main > section:nth-of-type(3) > div > ul > li > div > div > button"); // plusMinus button next to beach name
const plusMinusButtonsArray = Array.from(plusMinusButtons);
const questionLinks  = document.querySelectorAll("body > main > section:nth-of-type(3) > div > ul > li > div > div > div > a"); // each question in the FAQ
const questionLinksArray = Array.from(questionLinks);
/* plusMinus button hocus pocus */
function morphTheButton(e) {
    /*  if(this.className.includes('active')) {
          this.removeAttribute('class');
      } else {
          this.className += 'active';
      } */
      let theAnswer = this.parentElement.querySelector(".accordion-container .accordion-content"); // as seen from the plusMinus <button>
      if(theAnswer.style.opacity == 0) {
          theAnswer.style.maxHeight = "500px";
          theAnswer.style.opacity = 1;
          this.className += 'active';
      } else {
          theAnswer.style.maxHeight = 0;
          theAnswer.style.opacity = 0;
          this.removeAttribute('class');
      }
  };

/* this function toggles the answer (accordian-content) to the FAQ question   */
/* the class name of the answer must be 'accordion-content'                   */
function toggleAccordionContent(e) {
    let theAnswer = this.parentElement.querySelector(".accordion-content");   // as seen from the question <a> tag
    let theButton = this.parentElement.parentElement.querySelector("button"); // as seen from the question <a> tag

    if(theAnswer.style.opacity == 0) {
        theAnswer.style.maxHeight = "500px";
        theAnswer.style.opacity = 1;
        theButton.className += 'active';
    } else {
        theAnswer.style.maxHeight = 0;
        theAnswer.style.opacity = 0;
        theButton.removeAttribute('class');
    }
};
  

plusMinusButtonsArray.forEach(x => {
    x.addEventListener("click", morphTheButton);
});

questionLinksArray.forEach(x => {
    x.addEventListener("click", toggleAccordionContent);
});


