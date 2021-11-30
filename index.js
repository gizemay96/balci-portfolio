
const anchors = ['#home-section-link', '#about-section-link' , '#contact-link']

function getConsole(e) {
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