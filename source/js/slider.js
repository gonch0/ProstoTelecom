(function () {
//Слайдер
var sliderItems = document.querySelectorAll('.slider__item');
var prevBtn = document.querySelector('.slider__btn--prev');
var nextBtn = document.querySelector('.slider__btn--next');

var sliderToggles = document.querySelectorAll('.slider__toggle');
var sliderIndex = 0;

var fixIndex = function (index) {
  if(index < 0) {
    index = 3;
  } else if (index > 3) {
    index = 0;
  }
  return index;
}

var onButtonClick = function (forward) {

  for (var i = 0; i < sliderToggles.length; i++) {
    if(sliderToggles[i].classList.contains('slider__toggle--current')) {
      sliderIndex = i;
    }
  }
  sliderIndex = fixIndex(sliderIndex);
  var neighborIndex = fixIndex(sliderIndex - 1);
  if (forward) {
    neighborIndex = fixIndex(sliderIndex + 1);
  }

  sliderToggles[sliderIndex].disabled = false;
  sliderToggles[sliderIndex].classList.remove('slider__toggle--current');
  sliderItems[sliderIndex].classList.remove('slider__item--current');

  sliderToggles[neighborIndex].disabled = true;
  sliderToggles[neighborIndex].classList.add('slider__toggle--current');
  sliderItems[neighborIndex].classList.add('slider__item--current');
}


prevBtn.addEventListener('click', function() {
  onButtonClick(false);
});
nextBtn.addEventListener('click', function() {
  onButtonClick(true);
});
})();
