import fbImage from './../images/facebook.png';
import longMascot from './../images/longMascot.png';
import shortMascot from './../images/shortMascot.png';
import headerBackgroundImageURL from './../images/headerBackground.jpg';

/* long mascot image */
document.querySelector("body > header > section:nth-child(1) > figure:nth-child(1) img").src = longMascot;

/* short mascot image */
document.querySelector("body > header > section:nth-of-type(2) > figure:nth-child(1) img").src = shortMascot;

/* bullet shot facebook image */
document.querySelector("body > a > img").src = fbImage;

/* header background image */
document.querySelector("body > header").style.backgroundImage = `url('${headerBackgroundImageURL}')`;

