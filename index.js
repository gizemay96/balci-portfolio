
const anchors = ['#home-section-link', '#about-section-link', '#contact-link'];
const formValues = ['name', 'subject', 'email', 'message'];
$("#contactForm").submit(function (e) {
     e.preventDefault();
});


// Navigation in page
function getSection(e) {
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



