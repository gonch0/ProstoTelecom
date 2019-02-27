(function () {
  //Открытие-закрытие окон
  var managePopup = function (toggleClass, popupClass) {
  var popup = document.querySelector('.' + popupClass);
  var openToggle = document.querySelector('.' + toggleClass);
  var closeToggle = popup.querySelector('.popup__btn-close');

  openToggle.addEventListener('click', function() {
    popup.classList.add('popup--active');
  });
    closeToggle.addEventListener('click', function() {
      popup.classList.remove('popup--active');
    });
};

managePopup ('user-list__btn--login','account');
managePopup ('user-list__btn--phone','feedback');
})();
