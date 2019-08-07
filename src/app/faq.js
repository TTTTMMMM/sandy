import './../lib/styles/style.css';
import './../lib/styles/styleFaq.css';

import '../lib/scripts/googleAnalytics.js';
import '../lib/scripts/fbpixelcode.js'; 
import '../lib/scripts/headerStyling.js';
import '../lib/scripts/footerStyling.js';

import accordianArrow from '../lib/images/accordianArrow.png';

const accordianHeading = document.querySelector(".accordion-heading"); // h3
const accordianToggle = document.querySelector(".accordion-toggle");  //the link
const accordianBody = document.querySelector(".accordion-body");  // container for all questions
const questionLinks  = document.querySelectorAll("body > main > div > div > div > div > div > div > a"); // each question in the FAQ
const questionLinksArray = Array.from(questionLinks);
const plusMinusButtons = document.querySelectorAll("body > main > div > div > div > div > div > button"); // plusMinus button next to question
const plusMinusButtonsArray = Array.from(plusMinusButtons);
const accordianContent = document.querySelectorAll(".accordion-content");
const accordianContentArray = Array.from(accordianContent);

accordianHeading.style.backgroundImage = `url(${accordianArrow})`;


/* the whole faq is collapsed if the 'General FAQs' line is clicked */
function toggleFAQ(e) {
    e.stopPropagation();
    
    let viz = window.getComputedStyle(accordianBody, null).display;
    if(viz === 'none') {
        accordianBody.style.display = "block";
        accordianContentArray.forEach(x => {
            x.style.display = "none";
            x.style.height = "auto";
        });
        accordianHeading.style.backgroundPosition = "right -155px, 0px, 0px"; 
    } else {
        accordianBody.style.display = "none";
        accordianHeading.style.backgroundPosition = "right -3px, 0px, 0px"; 
    }
};

function morphTheButton(e) {
    if(this.className.includes('active')) {
        this.removeAttribute('class');
    } else {
        this.className += 'active';
    }
};

accordianHeading.addEventListener('click',function (e){
    toggleFAQ(e);
}); 

accordianToggle.addEventListener('click',function (e){
    toggleFAQ(e);
}); 

/* this toggles the answer (accordian-content) to the FAQ question              */
/* the class name of the answer must be 'accordion-content' */
function toggleAccordionContent(e) {
    let viz = window.getComputedStyle(this.parentElement.querySelector(".accordion-content"), null).display;
    let theHeight = this.parentElement.querySelector(".accordion-content").style.height;
    this.parentElement.querySelector(".accordion-content").style.display = (viz === "none") ? "block" : "none";
    // this.parentElement.querySelector(".accordion-content").style.height = (theHeight === "0px") ? "auto" : "0px";
}

questionLinksArray.forEach(x => {
    x.addEventListener("click", toggleAccordionContent);
});

plusMinusButtonsArray.forEach(x => {
    x.addEventListener("click", morphTheButton);
})




