import './../lib/styles/style.css';
import './../lib/styles/styleGallery.css';

import '../lib/scripts/googleAnalytics.js';
import '../lib/scripts/fbpixelcode.js'; 
import '../lib/scripts/headerStyling.js';
import '../lib/scripts/footerStyling.js';

import picketImage from '../lib/images/gallery/picketfence.jpeg';
import reuben1Image from '../lib/images/gallery/reubenboardwalk.jpeg';
import marriottImage from '../lib/images/gallery/marriottOCMD.jpeg';
import twoScootsImage from '../lib/images/gallery/twoScoots.jpeg';
import oneScootImage from '../lib/images/gallery/oneScoot.jpeg';
import twoWheelsImage from '../lib/images/gallery/twoWheels.jpeg';
import joystickImage from '../lib/images/gallery/joystick.jpeg';
import footPlateImage from '../lib/images/gallery/footplate.jpeg';
import beachEquipImage from '../lib/images/gallery/beachEquipment.jpeg';
import reuben2Image from '../lib/images/gallery/reuben2.jpeg';
import familyImage from '../lib/images/gallery/family.jpeg';
import seatbeltImage from '../lib/images/gallery/seatbelt.jpeg';
import redtopImage from '../lib/images/gallery/redtop.jpeg';
import governorImage from '../lib/images/gallery/governor.jpeg';
import wavingImage from '../lib/images/gallery/waving.jpeg';
import loungingImage from '../lib/images/gallery/lounging.jpeg';

/* image0 */
document.querySelector("#picketfence").src = picketImage;

/* image1 */
document.querySelector("#reubster").src = reuben1Image;

/* image2 */
document.querySelector("#marriott").src = marriottImage;

/* image3 */
document.querySelector("#scooter22").src = twoScootsImage;

/* image4 */
document.querySelector("#scooter2").src = oneScootImage;

/* image5 */
document.querySelector("#twowheels").src = twoWheelsImage;

/* image6 */
document.querySelector("#handcontrol").src = joystickImage;

/* image7 */
document.querySelector("#shstep").src = footPlateImage;

/* image8 */
document.querySelector("#packing").src = beachEquipImage;

/* image9 */
document.querySelector("#reubenonbeach").src = reuben2Image;

/* image10 */
document.querySelector("#fourscooters").src = familyImage;

/* image11 */
document.querySelector("#belt").src = seatbeltImage;

/* image12 */
document.querySelector("#redtop").src = redtopImage;

/* image13 */
document.querySelector("#governor").src = governorImage;

/* image14 */
document.querySelector("#waver").src = wavingImage;

/* image15 */
document.querySelector("#lounging").src = loungingImage;

let menuIsActive = false;
const smallVuportMenu = document.querySelector("body > section > ul");
smallVuportMenu.addEventListener('click', function() {
    (!menuIsActive) ? this.style.top = "-15px" : this.style.top = "-150px";
    menuIsActive = !menuIsActive;
});