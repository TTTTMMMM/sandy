import './../lib/styles/style.css';
import './../lib/styles/styleFaq.css';

import '../lib/scripts/googleAnalytics.js';
import '../lib/scripts/fbpixelcode.js';
import '../lib/scripts/headerStyling.js';
import '../lib/scripts/footerStyling.js';

import {q_and_A} from '../lib/scripts/questionsAndAnswers.js';

// q_and_A.forEach(x => { console.dir(x);});


const ulQuestions = document.querySelector("body > main > section:nth-of-type(1) > div > ul");

q_and_A.forEach(qa => {
    const listItemInnerAccordion = document.createElement("li");
    ulQuestions.appendChild(listItemInnerAccordion);
    const divInnerAccordion = document.createElement("div");
    divInnerAccordion.classList.add("inner-accordion");
    const divQuestionline = document.createElement("div");
    divQuestionline.classList.add("questionline");
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
    iFramePlus.classList.add("fa",  "fa-plus");
    iFrameMinus.classList.add("fa", "fa-minus");
    const divAccordionContainer = document.createElement("div");
    divAccordionContainer.classList.add("accordion-container");
    const anchorButton = document.createElement("a");
    anchorButton.style.role = "button";
    anchorButton.innerHTML = qa.question;
    const divAccordionContent = document.createElement("div");
    divAccordionContent.classList.add("accordion-content");
    divAccordionContent.style.opacity = 0;
    divAccordionContent.style.maxHeight = 0;
    listItemInnerAccordion.appendChild(divInnerAccordion);
    divInnerAccordion.appendChild(divQuestionline);
    divQuestionline.appendChild(plusMinusButton);
    divQuestionline.appendChild(divAccordionContainer);
    divAccordionContainer.appendChild(anchorButton);
    divAccordionContainer.appendChild(divAccordionContent);
    // Display answer below
    divAccordionContent.innerHTML = `${qa.answer}`;
});

const plusMinusButtons = document.querySelectorAll("body > main > section:nth-of-type(1) > div > ul > li > div > div > button");
const plusMinusButtonsArray = Array.from(plusMinusButtons);
const questionLinks  = document.querySelectorAll("body > main > section:nth-of-type(1) > div > ul > li > div > div > div > a");
const questionLinksArray = Array.from(questionLinks);

/* plusMinus button hocus pocus */
function morphTheButton(e) {

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
}

questionLinksArray.forEach(x => {
    x.addEventListener("click", toggleAccordionContent);
});

plusMinusButtonsArray.forEach(x => {
    x.addEventListener("click", morphTheButton);
});




