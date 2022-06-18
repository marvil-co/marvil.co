/* Description: Custom JS file */
/* Smooth Scroll */
// Enabled on all a tags with href "#" attributes
var scroll = new SmoothScroll('a[href*="#"]');


/* Back To Top Button */
window.onscroll = function() {
    scrollFunctionBTT(); // back to top button
};

// Get the button
myButton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
function scrollFunctionBTT() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        myButton.style.display = "block";
    } else {
        myButton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // for Safari
    document.documentElement.scrollTop = 0; // for Chrome, Firefox, IE and Opera
}

remainingChars = document.getElementById('remaining-characters');

function check(element) {
    var maxLength = 1024;
    var remaining = maxLength - element.value.length;
    remainingChars.innerText = remaining;
    // change remaining-characters text color to red if characters left is less than 50, change it to purple if it is more than zero, and change it to invisible of it is zero
    if (remaining <= 16) {
        remainingChars.style.color = "#ff0000";
    } else if (remaining <= 64 && remaining > 16) {
        remainingChars.style.color = "#ff8000";
    } else if (remaining == maxLength) {
        remainingChars.style.color = "transparent";
    } else if (!remaining <= 64 && !remaining == 0) {
        remainingChars.style.color = "#b524ea";
    }
}

function contactFormSubmit() {
    isValidMail = document.getElementById('name-form').checkValidity();
    isValidEmail = document.getElementById('email-form').checkValidity();
    isValidContent = document.getElementById('mail-content').checkValidity();

    nameFormValue = (document.getElementById('name-form').value);
    emailFormValue = (document.getElementById('email-form').value);
    mailContentValue = (document.getElementById('mail-content').value);

    if (isValidMail && isValidEmail && isValidContent) {
        window.open('http://maker.ifttt.com/trigger/contactform/with/key/bh-7CUDtGTTvE41YHEXoHY?value1=' + nameFormValue + '&value2=' + emailFormValue + '&value3=' + mailContentValue)
    }
}