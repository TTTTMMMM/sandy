/* eslint-disable quotes */
import fbImage from "./../images/facebook.png";
import longMascot from "./../images/longMascot.png";
import shortMascot from "./../images/shortMascot.png";
import headerBackgroundImageURL from "./../images/headerBackground.jpg";
import longMascotIcon from "./../images/longMascotIcon.png";

/* long mascot image */
document.querySelector(
   "body > header > section:nth-child(1) > figure:nth-child(1) img"
).src = longMascot;

/* short mascot image */
document.querySelector(
   "body > header > section:nth-of-type(2) > figure:nth-child(1) img"
).src = shortMascot;

/* bullet shot facebook image  https://pt.vectorhq.com/psd/cracked-facebook-logo-psd-451808 */
document.querySelector("body > a > img").src = fbImage;
document.querySelector("body > a ").setAttribute("target", "_blank");

/* header background image */
document.querySelector(
   "body > header"
).style.backgroundImage = `url('${headerBackgroundImageURL}')`;

/* icon image in the menu */
document.querySelector(
   "body > section > ul > li:nth-child(6) > img"
).src = longMascotIcon;

// set the width of the drop-down menu for small vuports
document.querySelector("body > section > ul").style.width = "135px";

let menuIsActive = false;
const smallVuportMenu = document.querySelector("body > section > ul");
smallVuportMenu.addEventListener("click", function() {
   if (window.innerWidth < 500) {
      !menuIsActive ? (this.style.top = "-8px") : (this.style.top = "-170px");
   }
   menuIsActive = !menuIsActive;
});
