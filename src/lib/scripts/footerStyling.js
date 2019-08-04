import madeinUSA from './../images/madeinusaparts.png';
import mastercard from './../images/mastercard.png';
import visa from './../images/visa.png';
import discover from './../images/discover.png';
import amex from './../images/amex.png';


/* made in USA parts image */
document.querySelector("body > footer > section:nth-of-type(1) > img").src = madeinUSA;

/* mastercard image */
document.querySelector("body > footer > section:nth-of-type(3) > ul > li:nth-of-type(1) img").src = mastercard;

/* visa image */
document.querySelector("body > footer > section:nth-of-type(3) > ul > li:nth-of-type(2) img").src = visa;

/* discover image */
document.querySelector("body > footer > section:nth-of-type(3) > ul > li:nth-of-type(3) img").src = discover;

/* amex image */
document.querySelector("body > footer > section:nth-of-type(3) > ul > li:nth-of-type(4) img").src = amex;
