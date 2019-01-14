// GSAP
import Tween from 'gsap';

// Highway
import Highway from '../../highway';

class Fade extends Highway.Transition {
  in = (view, done) => {
    Tween.fromTo(
      view,
      0.5,
      { opacity: 0 },
      {
        opacity: 1,
        onComplete: done
      }
    );
  };

  out = (view, done) => {
    Tween.fromTo(
      view,
      0.5,
      { opacity: 1 },
      {
        opacity: 0,
        onComplete: () => {
          window.scrollTo(0, 0);
          done();
        }
      }
    );
  };
}

export default Fade;
