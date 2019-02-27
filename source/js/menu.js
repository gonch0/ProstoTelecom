'use strict';

(function () {
//Открытие-закрытие меню
var manageMenu = function (toggleClass, menuClass) {
  var menu = document.querySelector('.' + menuClass);
  var toggle = document.querySelector('.' + toggleClass);
  menu.classList.remove(menuClass + '--nojs');

  toggle.addEventListener('click', function () {
    if (menu.classList.contains(menuClass + '--closed')) {
      menu.classList.remove(menuClass + '--closed');
      menu.classList.add(menuClass+'--opened');

    } else {
      menu.classList.add(menuClass+'--closed');
      menu.classList.remove(menuClass+'--opened');
    }
  });
};

manageMenu ('page-header__toggle','page-header');

//Открытие-закрытие списков меню
var mainMenuItems = document.querySelectorAll('.main-menu__item');

var expandMenu = function (mainMenuItem) {
  var menuTitle = mainMenuItem.querySelector('.main-menu__title');
  menuTitle.addEventListener('click', function() {
    mainMenuItem.classList.toggle('main-menu__item--expanded');
  });
};

for (var i = 0; i < mainMenuItems.length; i++) {
  expandMenu(mainMenuItems[i]);
};


})();
