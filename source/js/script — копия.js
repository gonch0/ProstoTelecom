'use strict';

//Открытие-закрытие меню
var header = document.querySelector('.page-header');
var headerToggle = document.querySelector('.page-header__toggle');
header.classList.remove('page-header--nojs');

headerToggle.addEventListener('click', function() {
  if (header.classList.contains('page-header--closed')) {
    header.classList.remove('page-header--closed');
    header.classList.add('page-header--opened');
    document.body.classList.add('shadowed');
  } else {
    header.classList.add('page-header--closed');
    header.classList.remove('page-header--opened');
    document.body.classList.remove('shadowed')
  }
});

//Открытие-закрытие списков меню
var mainMenuItems = document.querySelectorAll('.main-menu__item');

var changeMenu = function (mainMenuItem) {
  var menuTitle = mainMenuItem.querySelector('.main-menu__title');
  menuTitle.addEventListener('click', function() {
    if (mainMenuItem.classList.contains('main-menu__item--expanded')) {
      mainMenuItem.classList.remove('main-menu__item--expanded');
    } else {
      mainMenuItem.classList.add('main-menu__item--expanded');
    }
  });
};

for (var i = 0; i < mainMenuItems.length; i++) {
  changeMenu(mainMenuItems[i]);
};

//Слайдер
var sliderItems = document.querySelectorAll('.slider__item');
var prevBtn = document.querySelector('.slider__btn--prev');
var nextBtn = document.querySelector('.slider__btn--next');

var sliderToggles = document.querySelectorAll('.slider__toggle');

var currentSliderIndex = 2;

prevBtn.addEventListener('click', function() {
  console.log('i = ' + currentSliderIndex)

  sliderToggles[currentSliderIndex].disabled = false;
  sliderToggles[currentSliderIndex].classList.remove('slider__toggle--current');
  sliderItems[currentSliderIndex].classList.remove('slider__item--current');

  console.log(sliderItems[0]);
  currentSliderIndex -= 1;

  if(currentSliderIndex < 0) {
    console.log('ZALUPA' + currentSliderIndex);
    currentSliderIndex = 3;
  }
  console.log(currentSliderIndex);
  sliderToggles[currentSliderIndex].disabled = true;
  sliderToggles[currentSliderIndex].classList.add('slider__toggle--current');
  sliderItems[currentSliderIndex].classList.add('slider__item--current');


});


var changeSlider = function (sliderToggle, sliderItem, index) {

  sliderToggle.addEventListener('click', function() {
    var currentSliderToggle = document.querySelector('.slider__toggle--current');
    currentSliderToggle.disabled = false;
    currentSliderToggle.classList.remove('slider__toggle--current');
    currentSliderIndex = index;
    console.log(index);

    sliderToggle.disabled = true;
    sliderToggle.classList.add('slider__toggle--current');

    var currentSlider = document.querySelector('.slider__item--current');

    sliderItem.classList.add('slider__item--current');
    currentSlider.classList.remove('slider__item--current');

  });
};
for (var i = 0; i < sliderToggles.length; i++) {
  changeSlider(sliderToggles[i], sliderItems[i], i);
};



//Переключение "направлений"
var descItems = document.querySelectorAll('.descriptions__item');
var directionsButttons = document.querySelectorAll('.directions__button');

var changeDirections = function (directionsButtton, descItem) {

  directionsButtton.addEventListener('click', function() {
    var currentButton = document.querySelector('.directions__button--active');

    currentButton.disabled = false;
    currentButton.classList.remove('directions__button--active');

    directionsButtton.disabled = true;
    directionsButtton.classList.add('directions__button--active');



    var currentDirection = document.querySelector('.descriptions__item--active');

    descItem.classList.add('descriptions__item--active');
    currentDirection.classList.remove('descriptions__item--active');

  });
};
for (var i = 0; i < directionsButttons.length; i++) {
  changeDirections(directionsButttons[i], descItems[i]);
};


/*if (mainTitles[i].classList.contains('main-menu__item--expanded')) {
  mainTitles[i].classList.remove('main-menu__item--expanded');
} else {
  mainTitles[i].classList.add('main-menu__item--expanded');
}*/



/*(var mainMenuItems = document.querySelectorAll('.main-menu__item');
mainMenuItems.forEach (function (mainMenuItem) {
  var mainTitle = mainMenuItem.querySelector('.main-menu__title');

  mainTitle.addEventListener('mousedown', function() {

    if (mainMenuItem.classList.contains('main-menu__item--expanded')) {
      mainMenuItem.classList.remove('main-menu__item--expanded');
    } else {
      mainMenuItem.classList.add('main-menu__item--expanded');
    }

});*/

//});
