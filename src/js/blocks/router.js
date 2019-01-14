// Highway
import Highway from '../highway';

// Transitions
import IndexTransition from './transitions/Index';
import AboutTransition from './transitions/About';
import FadeTransition from './transitions/Fade';

// Renderers
import IndexRenderer from './renderers/Index';
import AboutRenderer from './renderers/About';

const H = new Highway.Core({
  renderers: {
    index: IndexRenderer,
    about: AboutRenderer
  },
  transitions: {
    index: IndexTransition,
    about: AboutTransition,
    default: FadeTransition
  }
});

export default H;
