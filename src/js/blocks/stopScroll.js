const html = document.querySelector('html');
const disable = () => {
  html.classList.add('no-scroll');
};
const enable = () => {
  html.classList.remove('no-scroll');
};

export default { disable, enable };
