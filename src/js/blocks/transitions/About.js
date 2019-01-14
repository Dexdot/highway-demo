import { TweenMax, Power2, TimelineMax } from 'gsap';
import Highway from '../../highway';

class About extends Highway.Transition {
  in = (view, done) => {
    TweenMax.to('.header__cover', 0, { y: '0%' });

    const $cover = $('.bg__cover');
    const $logo = $('.header__cover');
    const $els = $('.about__title, .about__img, .about__text');

    const tl = new TimelineMax({
      ease: Power2.easeInOut,
      onComplete: done
    });

    TweenMax.set($cover, { x: '0%' });
    tl.to($cover, 0.6, {
      x: '100%'
    })
      .to($logo, 0.6, { y: '0%' }, '-=0.2')
      .staggerFromTo(
        $els,
        0.6,
        { opacity: 0, y: '72px' },
        { opacity: 1, y: '0%' },
        0.1,
        '-=0.4'
      );
  };

  out = (view, done) => {
    const $cover = $('.bg__cover');
    TweenMax.fromTo(
      $cover,
      0.6,
      {
        x: '100%'
      },
      { x: '0%', onComplete: done, ease: Power2.easeInOut }
    );
  };
}

export default About;
