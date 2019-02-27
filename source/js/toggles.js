//Переключатели

var connectControls = function (toggle, section) {
  var buttons = document.querySelectorAll('.' + toggle);
  var blocks = document.querySelectorAll('.' + section);

  var changeStates = function (button, block) {
    button.addEventListener('click', function() {
      var currentButton = document.querySelector('.' + toggle + '--current');

      currentButton.disabled = false;
      currentButton.classList.remove(toggle + '--current');

      button.disabled = true;
      button.classList.add(toggle + '--current');

      var currentBlock = document.querySelector('.' + section + '--current');
      currentBlock.classList.remove(section + '--current');
      block.classList.add(section + '--current');
    });
  };

  for (var i = 0; i < buttons.length; i++) {
    changeStates(buttons[i], blocks[i]);
  }
};

connectControls('info__button', 'content__block');
connectControls('directions__button', 'descriptions__item');
connectControls('slider__toggle', 'slider__item');
connectControls('account__toggle', 'account__tab');
connectControls('feedback__toggle', 'feedback__tab');
