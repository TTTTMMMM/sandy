/* eslint-disable quotes */
import "./../lib/styles/style.css";

import "../lib/scripts/googleAnalytics.js";
import "../lib/scripts/fbpixelcode.js";
import "../lib/scripts/headerStyling.js";
import "../lib/scripts/footerStyling.js";

import ss2 from "../lib/images/ss2.jpeg";
import owcb from "../lib/images/animation/onewheelchairbeach.jpg";
import owcbw from "../lib/images/animation/onewheelchairboardwalk.jpg";
import owcpf from "../lib/images/animation/onewheelchairpicketfence.jpg";
import twcb from "../lib/images/animation/twowheelchairsbeach.jpg";

/* sand scooter II image */
document.querySelector(
   "main > div > section:nth-of-type(1) > figure > img"
).src = ss2;

/* animation image4 */
document.querySelector(
   "body > main > section:nth-of-type(1) > img:nth-child(4)"
).src = twcb;

/* animation image3 */
document.querySelector(
   "body > main > section:nth-of-type(1) > img:nth-child(3)"
).src = owcpf;

/* animation image2 */
document.querySelector(
   "body > main > section:nth-of-type(1) > img:nth-child(2)"
).src = owcbw;

/* animation image1 */
document.querySelector(
   "body > main > section:nth-of-type(1) > img:nth-child(1)"
).src = owcb;
