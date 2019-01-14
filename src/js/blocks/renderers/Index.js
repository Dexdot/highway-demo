// Highway
import Highway from '../../highway';
import initHover from '../hover';
import initHamburger from '../hamburger';

class IndexRenderer extends Highway.Renderer {
  onEnter = () => {
    initHover();
    initHamburger();
  };
}

export default IndexRenderer;
