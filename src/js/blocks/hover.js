import { TweenMax, TimelineMax, Power2 } from 'gsap';

export default () => {
  const $case = $('.case');
  const $cover = $('.case__bg');
  const $arrow = $('.case__arrow');

  // GSAP Settings
  const COVER_DURATION = 0.3;
  const ARROW_DURATION = 0.6;
  const options = {
    ease: Power2.easeOut
  };

  // Reset function
  const reset = () => {
    const tl = new TimelineMax(options);

    tl.to($cover, COVER_DURATION, { y: '100%' }).to(
      $arrow,
      ARROW_DURATION,
      { x: '25vw' },
      '-=0.3'
    );
  };

  $case.on('mouseleave', reset);
  $case.on('mouseenter', function onCaseMouseenter() {
    // Reset
    reset();

    // Case
    const $this = $(this);
    const cover = $this.find('.case__bg');
    const arrow = $this.find('.case__arrow');

    const caseTimeline = new TimelineMax(options);

    TweenMax.set(arrow, { x: '-10vw' });

    caseTimeline
      .to(cover, COVER_DURATION, { y: '0%' })
      .to(arrow, ARROW_DURATION, { x: '0%' }, '-=0.3');

    // Background
    const bgTimeline = new TimelineMax(options);
    const BG_DURATION = 1;

    const type = this.dataset.bg;
    const $bg = $(`.bg__img:not([data-bg=${type}])`);
    const $newBg = $(`.bg__img[data-bg=${type}]`);

    bgTimeline
      .to($bg, BG_DURATION, {
        opacity: 0,
        scale: 0.8,
        z: 0.01
      })
      .fromTo(
        $newBg,
        BG_DURATION,
        { opacity: 0, scale: 1.2, z: 0.01 },
        { scale: 1, opacity: 1, z: 0.01 },
        `-=${BG_DURATION}`
      );
  });
};
