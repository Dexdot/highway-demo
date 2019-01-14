import Highway from '../../highway';
import initHamburger from '../hamburger';

class AboutRenderer extends Highway.Renderer {
  onEnter = () => {
    initHamburger();
  };
}

export default AboutRenderer;
