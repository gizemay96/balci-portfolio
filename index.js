
const anchors = ['#home-section-link', '#about-section-link' , '#contact-link'];

function getSection(e) {
   console.log(e)
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


const inputs = document.querySelector('form');
function setEmail(){
     var templateParams = {
          from_name: inputs.elements['name'].value,
          to_name: 'Eda Balcı',
          subject_info: inputs.elements['subject'].value,
          email: inputs.elements['email'].value,
          message: inputs.elements['message'].value
      };

      emailjs.send('gmail', 'template_iz81l8p', templateParams)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
}