
const anchors = ['#home-section-link', '#about-section-link', '#contact-section-link'];
const sections = ['#home-section', '#about-section', '#contact-section'];
const formValues = ['name', 'subject', 'email', 'message'];


$("#contactForm").submit(function (e) {
     e.preventDefault();
});

window.onload = init();

function init() {
     setTimeout(() => {
          const hash = window.location.hash;
          const formattedHash = `${hash}-link`;
          document.getElementById(`${hash.split('#')[1]}`).scrollIntoView();;
          document.getElementById(formattedHash).className = 'colorlib-active';
     }, 500);
}




// Setup isScrolling variable
var isScrolling;

// Listen for scroll events
window.addEventListener('scroll', function (event) {

     // Clear our timeout throughout the scroll
     window.clearTimeout(isScrolling);

     // Set a timeout to run after scrolling ends
     isScrolling = setTimeout(function () {
          sections.forEach(sectionKey => {
               checkViewingElements(sectionKey);
               getSection();
          })

     }, 36);

}, false);


// Navigation in page
function getSection() {
     setTimeout(() => {
          const hash = window.location.hash;
          const formattedHash = `${hash}-link`;
          anchors.forEach(link => {
               if (link === formattedHash) {
                    document.getElementById(link).className = 'colorlib-active';
               } else {
                    document.getElementById(link).className = ' ';
               }
          });
     }, 100);
}


// Email Sending Func
const inputs = document.querySelector('form');
function setEmail() {
     document.getElementById('submit').style.display = 'none'
     document.getElementById('submitting').style.opacity = 1;


     var templateParams = {
          from_name: inputs.elements['name'].value,
          subject_info: inputs.elements['subject'].value,
          email: inputs.elements['email'].value,
          message: inputs.elements['message'].value
     };

     const formErrors = isFormValid(templateParams);

     if (formErrors.length) {
          formErrors.forEach(errorKey => {
               document.getElementById(errorKey).style.display = 'block'
          });
          document.getElementById('submit').style.display = 'block'
          document.getElementById('submitting').style.opacity = 0;
     } else {
          emailjs.send('gmail', 'template_iz81l8p', templateParams)
               .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);
               }, function (error) {
                    console.log('FAILED...', error);
               });
          setTimeout(() => {
               formValues.forEach(valueKey => {
                    document.getElementById(valueKey).value = ' '
               });
               $('.toast').toast('show');
               document.getElementById('submit').style.display = 'block'
               document.getElementById('submitting').style.opacity = 0;
          }, 1000);

     }

}

// Form Controls
function isFormValid(templateParams) {
     let errors = []
     if (validateEmail(templateParams.email) === null) {
          errors.push('inv-mail')
     }
     if (!templateParams.from_name.length) {
          errors.push('inv-name')

     }
     if (!templateParams.message.length) {
          errors.push('inv-message')
     }
     return errors;
}


const validateEmail = (email) => {
     return String(email)
          .toLowerCase()
          .match(
               /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
};



// Check is element viewing on screen
function checkViewingElements(sectionKey) {
     const el = document.getElementById(sectionKey.split('#')[1]);
     const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && entries[0].intersectionRect.bottom > entries[0].intersectionRect.left) {
               // console.log(sectionKey , el.scrollTop , entries[0].intersectionRect.bottom > entries[0].intersectionRect.left)
               if (history.pushState) {
                    history.pushState(null, null, sectionKey);
               }
               else {
                    location.hash = sectionKey;
               }
               return true;
          } else {
               return false;
          }
     });
     observer.observe(el);
}


