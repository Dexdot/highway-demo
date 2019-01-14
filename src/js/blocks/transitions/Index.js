import { TweenMax, Power2 } from 'gsap';
import Highway from '../../highway';

class Index extends Highway.Transition {
  in = (view, done) => {
    const $cover = $('.bg__cover');
    TweenMax.fromTo(
      $cover,
      0.6,
      {
        x: '0%'
      },
      { x: '-100%', ease: Power2.easeInOut, onComplete: done }
    );
  };

  out = (view, done) => {
    const $cover = $('.bg__cover');

    TweenMax.set($cover, { x: '-100%' });
    TweenMax.to($cover, 0.6, {
      ease: Power2.easeInOut,
      x: '0%',
      onComplete: done
    });
  };
}

export default Index;
