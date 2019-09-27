/* eslint-disable new-cap */
/* eslint-disable quotes */
import "./../lib/styles/style.css";
import "./../lib/styles/styleGMaps.css";
import "../lib/scripts/headerStyling.js";
import "../lib/scripts/footerStyling.js";
import { rentalAgents } from "../lib/scripts/rentalAgents.js";
import { rentalAgentsKeyedByBeach } from "../lib/scripts/rentalAgents.js";
import { mapStyle1 } from "../lib/scripts/mapStyle1.js";
import { mapStyle2 } from "../lib/scripts/mapStyle2";
import { mapStyle3 } from "../lib/scripts/mapStyle3";
import { theIWArray } from "../lib/scripts/rentalAgents.js";
import { theBeachesKeyedByState } from "../lib/scripts/rentalAgents.js";
import style3Map from "./../lib/images/style3Map.png";
import style2Map from "./../lib/images/style2Map.png";
import style1Map from "./../lib/images/style1Map.png";

// console.log(`${Object.keys(theBeachesKeyedByState)[1]}: ${JSON.stringify(theBeachesKeyedByState[Object.keys(theBeachesKeyedByState)[1]])}`);

let map;
const vabeach = { lat: 36.5, lng: -75.9 };
const ocmd = { lat: 38.5, lng: -75.04 };
const joiseyShore = { lat: 39.41, lng: -74.6 };
const ncBeaches = { lat: 34.0, lng: -78.35 };

const EAST_COAST_BOUNDS = {
   north: 42.0,
   south: 30.0,
   west: -80.0,
   east: -72.0,
};

/* the images that show up in the bottom left of google maps that let you choose a map style */
document.querySelector("#style1").src = style1Map;
document.querySelector("#style2").src = style2Map;
document.querySelector("#style3").src = style3Map;

function CenterControl(controlDiv, map, cityName, latlng, zLevel) {
   const controlUI = document.createElement("div");
   controlUI.classList.add("dOuter");
   controlDiv.appendChild(controlUI);

   const controlText = document.createElement("div");
   controlText.classList.add("dInner");
   controlText.innerHTML = cityName;
   controlText.style.fontFamily = "Josefin Sans, monotype";
   controlUI.appendChild(controlText);

   controlUI.addEventListener("click", function() {
      map.panTo(latlng);
      map.setZoom(zLevel);
   });
}

function anotherControl(controlDiv) {
   const controlUI = document.createElement("div");
   controlUI.classList.add("dInstructionOuter");
   controlDiv.appendChild(controlUI);

   const controlText = document.createElement("div");
   controlText.classList.add("dInstructionInner");
   controlText.innerHTML = `Click on icons`;
   controlText.style.fontFamily = "Josefin Sans, monotype";
   controlUI.appendChild(controlText);
}

function initMap() {
   map = new google.maps.Map(document.getElementById("map"), {
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
   const centerControlDiv1 = document.createElement("div");
   CenterControl(centerControlDiv1, map, "Jersey Shore", joiseyShore, 9);

   const centerControlDiv2 = document.createElement("div");
   CenterControl(centerControlDiv2, map, "Maryland/Delaware", ocmd, 9);

   const centerControlDiv3 = document.createElement("div");
   CenterControl(centerControlDiv3, map, "Virginia Beach/OBX", vabeach, 8);

   const centerControlDiv4 = document.createElement("div");
   CenterControl(centerControlDiv4, map, "Carolina Beaches", ncBeaches, 9);

   // Put an "instructions" label on the map
   const instructionControlDiv = document.createElement("div");
   anotherControl(instructionControlDiv);

   // Put the two style-pickers on the map
   const ms1 = document.querySelector("#style1");
   const ms2 = document.querySelector("#style2");
   const ms3 = document.querySelector("#style3");

   // Place Beach Buttons Top Left
   map.controls[google.maps.ControlPosition.LEFT_TOP].push(centerControlDiv1);
   map.controls[google.maps.ControlPosition.LEFT_TOP].push(centerControlDiv2);
   map.controls[google.maps.ControlPosition.LEFT_TOP].push(centerControlDiv3);
   map.controls[google.maps.ControlPosition.LEFT_TOP].push(centerControlDiv4);

   // Place Instruction Label Top Center
   map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      instructionControlDiv
   );

   // Place style-pickers Left Bottom
   map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(ms1);
   map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(ms2);
   map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(ms3);

   /* style1 picker */
   ms1.addEventListener("click", function() {
      map.setOptions({ styles: mapStyle1 });
      ms1.style.border = "4px solid  hsla(12, 95%, 47%, 0.93)";
      ms2.style.border = "2px solid black";
      ms3.style.border = "2px solid black";
   });

   /* style2 picker */
   ms2.addEventListener("click", function() {
      map.setOptions({ styles: mapStyle2 });
      ms2.style.border = "4px solid  hsla(12, 95%, 47%, 0.93)";
      ms1.style.border = "2px solid black";
      ms3.style.border = "2px solid black";
   });

   /* style1 picker */
   ms3.addEventListener("click", function() {
      map.setOptions({ styles: mapStyle3 });
      ms3.style.border = "4px solid  hsla(12, 95%, 47%, 0.93)";
      ms2.style.border = "2px solid black";
      ms1.style.border = "2px solid black";
   });

   // This is the image that will be used for the google map markers, scaled appropriately
   const url = `./longMascotIcon.png`;
   const image = {
      url: url,
      scaledSize: new google.maps.Size(38, 38),
   };

   let openInfoWindow = null; /* keeps track of the open info window, so I can close it when the next icon is clicked (only one IW open at a time)
    /* put a marker on the map for each location, using the SH logo defined above */
   rentalAgents.forEach(agent =>
      agent.locations.forEach(loc => {
         /* create a marker with the SH logo at every location based on rentalAgents[] */
         const rentMarker = new google.maps.Marker({
            position: new google.maps.LatLng(loc.location),
            map: map,
            icon: image,
         });

         /* create an infoWindow, which shows when the markers are clicked  */
         const contentString = theIWArray[loc.beach].outerHTML;
         const iw = new google.maps.InfoWindow({
            content: contentString,
         });

         /* create the listener for each marker, which displays the infoWindow content when the marker is clicked */
         rentMarker.addListener("click", function() {
            openInfoWindow ? openInfoWindow.close() : null;
            iw.open(map, rentMarker);
            openInfoWindow = iw;
         });
      })
   );

   // Don't let the user zoom in too close or too far
   map.addListener("zoom_changed", function() {
      if (map.getZoom() < 6) {
         map.setZoom(6);
      }
      if (map.getZoom() > 13) {
         map.setZoom(13);
      }
   });
}
// Done with initMap()
// Do not delete! the HTML page (call to Google maps api) needs to see the initMap function //
window.initMap = initMap;
// Do not delete! //

/*
    Let's throw some states and their beaches on section 3, shall we?
 */

const ulStates = document.querySelector(
   "body > main > section:nth-of-type(3) > div > ul"
);

const theStates = Object.keys(theBeachesKeyedByState);
theStates.forEach(s => {
   const stateListItem = document.createElement("li");
   const stateH4 = document.createElement("h4");
   stateH4.innerHTML = s;
   stateListItem.appendChild(stateH4);
   ulStates.appendChild(stateListItem);
   theBeachesKeyedByState[s].forEach(bb => {
      const innerAccordionListItem = document.createElement("li");
      ulStates.appendChild(innerAccordionListItem);
      const divInnerAccordion = document.createElement("div");
      divInnerAccordion.classList.add("inner-accordion");
      const divBeachline = document.createElement("div");
      divBeachline.classList.add("beachline");
      const plusMinusButton = document.createElement("button");
      const spanPlus = document.createElement("span");
      const spanMinus = document.createElement("span");
      plusMinusButton.appendChild(spanPlus);
      plusMinusButton.appendChild(spanMinus);
      spanPlus.classList.add("plus");
      spanMinus.classList.add("minus");
      const iFramePlus = document.createElement("i");
      const iFrameMinus = document.createElement("i");
      spanPlus.appendChild(iFramePlus);
      spanMinus.appendChild(iFrameMinus);
      iFramePlus.classList.add("fa", "fa-plus");
      iFrameMinus.classList.add("fa", "fa-minus");
      const divAccordionContainer = document.createElement("div");
      divAccordionContainer.classList.add("accordion-container");
      const anchorButton = document.createElement("a");
      anchorButton.style.role = "button";
      anchorButton.innerHTML = bb.beach;
      const divAccordionContent = document.createElement("div");
      divAccordionContent.classList.add("accordion-content");
      divAccordionContent.style.opacity = 0;
      divAccordionContent.style.maxHeight = 0;
      innerAccordionListItem.appendChild(divInnerAccordion);
      divInnerAccordion.appendChild(divBeachline);
      divBeachline.appendChild(plusMinusButton);
      divBeachline.appendChild(divAccordionContainer);
      divAccordionContainer.appendChild(anchorButton);
      divAccordionContainer.appendChild(divAccordionContent);
      // Display Rental Agent Information below
      // divAccordionContent.innerHTML = `${bb.beach} rental info here`;
      rentalAgentsKeyedByBeach[bb.beach].forEach(ra => {
         const divIWDiv = document.createElement("div");
         divIWDiv.classList.add("IWdiv");
         divAccordionContent.appendChild(divIWDiv);

         const theRentalAgentsList = document.createElement("ul");
         theRentalAgentsList.classList.add("IWul");
         divIWDiv.appendChild(theRentalAgentsList);

         const theRentalAgentsListItemName = document.createElement("li"); // each rental agent will be an item on the unordered list
         theRentalAgentsListItemName.classList.add("IWliName");
         theRentalAgentsListItemName.style.fontFamily =
            "Josefin Sans, monotype";
         theRentalAgentsListItemName.innerHTML = ra.rentalAgent;
         theRentalAgentsList.appendChild(theRentalAgentsListItemName);

         const theRentalAgentsListItemPhone = document.createElement("li"); // get the phone #
         theRentalAgentsListItemPhone.classList.add("IWliPhone");
         theRentalAgentsListItemPhone.style.fontFamily =
            "Josefin Sans, monotype";
         theRentalAgentsListItemPhone.innerHTML = ra.phone;
         theRentalAgentsList.appendChild(theRentalAgentsListItemPhone);

         const theRentalAgentsListItemEmail = document.createElement("li"); // get the email address
         const theEmailLink = document.createElement("a");
         theEmailLink.setAttribute("href", "mailto:" + ra.email);
         theEmailLink.innerHTML = ra.email;
         theRentalAgentsListItemEmail.appendChild(theEmailLink);
         theRentalAgentsListItemEmail.classList.add("IWliEmail");
         theRentalAgentsListItemEmail.style.fontFamily =
            "Josefin Sans, monotype";
         theRentalAgentsList.appendChild(theRentalAgentsListItemEmail);

         const theRentalAgentsListItemURL = document.createElement("li"); // get the URL (make it a link that opens in a new tab)
         const theWebsiteLink = document.createElement("a");
         theWebsiteLink.setAttribute("href", ra.url);
         theWebsiteLink.setAttribute("target", "_blank");
         theWebsiteLink.innerHTML =
            "Click/tap this link for info, pricing and reservations";

         theRentalAgentsListItemURL.appendChild(theWebsiteLink);
         theRentalAgentsListItemURL.classList.add("IWliURL");
         theRentalAgentsListItemURL.style.fontFamily = "Josefin Sans, monotype";
         theRentalAgentsList.appendChild(theRentalAgentsListItemURL);

         const theRentalAgentsListItemNotes = document.createElement("li"); // grab the notes
         theRentalAgentsListItemNotes.classList.add("IWliNotes");
         theRentalAgentsListItemNotes.style.fontFamily =
            "Josefin Sans, monotype";
         theRentalAgentsListItemNotes.innerHTML = ra.notes;
         theRentalAgentsList.appendChild(theRentalAgentsListItemNotes);
      });
   });
});

const plusMinusButtons = document.querySelectorAll(
   "body > main > section:nth-of-type(3) > div > ul > li > div > div > button"
);
const plusMinusButtonsArray = Array.from(plusMinusButtons);
const beachLinks = document.querySelectorAll(
   "body > main > section:nth-of-type(3) > div > ul > li > div > div > div > a"
);
const beachLinksArray = Array.from(beachLinks);

/* plusMinus button hocus pocus */
function morphTheButton() {
   const beachRentalInfo = this.parentElement.querySelector(
      ".accordion-container .accordion-content"
   ); // as seen from the plusMinus <button>
   if (beachRentalInfo.style.opacity == 0) {
      beachRentalInfo.style.maxHeight = "500px";
      beachRentalInfo.style.opacity = 1;
      this.className += "active";
   } else {
      beachRentalInfo.style.maxHeight = 0;
      beachRentalInfo.style.opacity = 0;
      this.removeAttribute("class");
   }
}

/* this function toggles the beach rental info                   */
/* the class name of the rental info must be 'accordion-content' */
function toggleAccordionContent() {
   const beachRentalInfo = this.parentElement.querySelector(
      ".accordion-content"
   ); // as seen from the beach <a> tag
   const theButton = this.parentElement.parentElement.querySelector("button"); // as seen from the beach <a> tag

   if (beachRentalInfo.style.opacity == 0) {
      beachRentalInfo.style.maxHeight = "500px";
      beachRentalInfo.style.opacity = 1;
      theButton.className += "active";
   } else {
      beachRentalInfo.style.maxHeight = 0;
      beachRentalInfo.style.opacity = 0;
      theButton.removeAttribute("class");
   }
}

plusMinusButtonsArray.forEach(x => {
   x.addEventListener("click", morphTheButton);
});

beachLinksArray.forEach(x => {
   x.addEventListener("click", toggleAccordionContent);
});
