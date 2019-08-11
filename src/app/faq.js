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
const accordianContent = document.querySelectorAll(".accordion-content"); // the answers to the questions
const accordianContentArray = Array.from(accordianContent);
const accordianContainer = document.querySelectorAll(".accordion-container"); // a container
const accordianContainerArray = Array.from(accordianContainer);
const innerAccordian = document.querySelectorAll(".inner-accordion"); // a container
const innerAccordianArray = Array.from(innerAccordian);

accordianHeading.style.backgroundImage = `url(${accordianArrow})`;

let faqIsVisible = true;

/* the whole faq is toggled if the 'General FAQs' line is clicked */
function toggleFAQ(e) {
    e.stopPropagation();
    
       if(!faqIsVisible) {
            /* make each and every FAQ questions visible */
            accordianBody.style.maxHeight = "5000px";
            questionLinksArray.forEach(x => {
                x.style.opacity = 1.0;
                x.style.maxHeight = "400px";
            });
            plusMinusButtonsArray.forEach(x => {
                x.style.opacity = 1.0;
                x.style.maxHeight = "400px";
            });
            accordianContainerArray.forEach(x => {
                x.style.opacity = 1.0;
                x.style.maxHeight = "400px";
            });
            innerAccordianArray.forEach(x => {
                x.style.opacity = 1.0;
                x.style.maxHeight = "400px";
            });
            /* change the direction of the arrow */
            accordianHeading.style.backgroundPosition = "right -155px, 0px, 0px"; 
            faqIsVisible = true;
        } else {
            /* close up all the questions and answers */
            accordianBody.style.maxHeight = 0;
            /* change the direction of the arrow */
            accordianHeading.style.backgroundPosition = "right -3px, 0px, 0px"; 
            /* make questions invisible */
            questionLinksArray.forEach(x => {
                x.style.maxHeight = 0;
                x.style.opacity = 0;
            });
            /* make answers invisible */
            accordianContentArray.forEach(x => {
                x.style.opacity = 0;
                x.style.maxHeight = 0;
            });
            accordianContainerArray.forEach(x => {
                x.style.opacity = 0;
                x.style.maxHeight = 0;
            });
            innerAccordianArray.forEach(x => {
                x.style.opacity = 0;
                x.style.maxHeight = 0;
            });
            /* make plusMinus buttons invisible */
            plusMinusButtonsArray.forEach(x => {
                x.style.opacity = 0;
                x.style.maxHeight = 0;
                x.removeAttribute('class');
            });
            faqIsVisible = false;
    }
};

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

accordianHeading.addEventListener('click',function (e){
    toggleFAQ(e);
}); 

accordianToggle.addEventListener('click',function (e){
    toggleFAQ(e);
}); 

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
}

questionLinksArray.forEach(x => {
    x.addEventListener("click", toggleAccordionContent);
});

plusMinusButtonsArray.forEach(x => {
    x.addEventListener("click", morphTheButton);
})

/* initialize the answers not to be visible */
accordianContentArray.forEach(x => {
    x.style.maxHeight = 0;
    x.style.opacity = 0;
})


