import scrollTo from './scripts/scroll-to';
import contact from './scripts/contact';

function start() {
    const workContainer = document.querySelector('.landing-works-container');
    const contactContainer = document.querySelector('.landing-contact-container');
    const workTrigger = document.querySelector('.work-trigger');
    const contactTrigger = document.querySelectorAll('.contact-trigger');
    const workGallery = document.querySelector('.works-list');
    workTrigger.addEventListener('click', () => {
        scrollTo.smoothScroll(workContainer.offsetTop);
    });

    for (let contact of contactTrigger) {
        contact.addEventListener('click', () => {
            scrollTo.smoothScroll(contactContainer.offsetTop);
        });
    }

    baguetteBox.run('.works-list', {
        captions: element => {
            return element.getElementsByTagName('img')[0].alt;
        }
    });

    contact();
}

start();