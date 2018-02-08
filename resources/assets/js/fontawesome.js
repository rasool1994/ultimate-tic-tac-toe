//load required fontawesome icons from (js with SVG)
import fontawesome from '@fortawesome/fontawesome'
import faBars from '@fortawesome/fontawesome-free-solid/faBars'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'
import faGamepad from '@fortawesome/fontawesome-free-solid/faGamepad'
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter'
import faLinkedin from '@fortawesome/fontawesome-free-brands/faLinkedin'
import faFacebook from '@fortawesome/fontawesome-free-brands/faFacebook'
import faTumblr from '@fortawesome/fontawesome-free-brands/faTumblr'
import faPinterestP from '@fortawesome/fontawesome-free-brands/faPinterestP'
import faGooglePlus from '@fortawesome/fontawesome-free-brands/faGooglePlus'

const icons = [
    faBars,
    faTimes,
    faGamepad,
    faTwitter,
    faLinkedin,
    faFacebook,
    faTumblr,
    faPinterestP,
    faGooglePlus
];

// Add the icon to the library so you can use it in your page
fontawesome.library.add(icons);