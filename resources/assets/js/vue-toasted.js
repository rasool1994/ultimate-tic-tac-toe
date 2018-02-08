// register vue-toasted plugin on vue
import Vue from 'vue'
import Toasted from 'vue-toasted';

const Options = {
    action: {
        text: 'Close',
        onClick: (e, toastObject) => {
            toastObject.goAway(0);
        }
    },
    position: 'bottom-left',
    duration: 5000,
    type: 'error',
    theme: 'outline',
    closeOnSwipe: true,
    iconPack: 'fontawesome'
};

//TODO: register custom toasts
Vue.use(Toasted, Options);