export default () => {
  const $burger = $('.hamburger');

  $burger.on('click', () => {
    $burger.toggleClass('is-active');
  });
};
