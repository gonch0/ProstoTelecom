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

(function () {
  //Загрузка контента:
  var onSuccessLoad = function(content) {
    var activeBlock = document.querySelector('.content__block--current');
    var contentContainer = activeBlock.querySelector('.content__list');
    var contentItem = contentContainer.querySelector('.content__item');
    //Object.keys не работает в IE11
    var contentKeys = ['title', 'text', 'date'];
    var contentFragment = document.createDocumentFragment();

    for (var i = 0; i < content.length; i++) {

      var newContentItem = contentItem.cloneNode(true);

      for (var j = 0; j < contentKeys.length; j++) {
        var key = contentKeys[j];
        var contentResult = content[i][key];
        newContentItem.querySelector('.content__' + key).textContent = contentResult;
        newContentItem.querySelector('.content__date').setAttribute('datetime', content[i]['datetime']);
      }
      contentFragment.appendChild(newContentItem);
    }
    contentContainer.appendChild(contentFragment);
  };

  var getContent = function (url) {

    var codes = {
      success: 200,
      error: 400
    };

    var method = {
      get: 'GET',
      post: 'POST'
    };

    var xhr = new XMLHttpRequest();
    //xhr.responseType = 'json'; (в IE11 не поддерживается)
    xhr.overrideMimeType('application/json');
    xhr.open(method.get, url);

    xhr.onload = function () {
      if (xhr.status >= codes.success && xhr.status < codes.error) {
        var jsonResponse = JSON.parse(xhr.responseText);
        onSuccessLoad(jsonResponse);
      } else {
        alert('Ошибка обмена данными с сервером (' +  xhr.status + ')');
      }
    };

    xhr.onerror = function () {
      alert('Ошибка соединения с сервером');
    };
    xhr.send();
  };

  var activateButton = function (tab, url) {
    var contentTab = document.querySelector('.content__' + tab)
    var contentButton = contentTab.querySelector('.content__button');
    contentButton.addEventListener('click', function() {
      getContent(url);
    });
  }

  activateButton('news', 'js/news.json');
  activateButton('publications', 'js/pubs.json');
})();

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

(function () {
/* Кастомный селектор, немного переделанный и взятый отсюда:
https://www.w3schools.com/howto/howto_custom_select.asp
*/

var x, i, j, selElmnt, a, b, c;
/* Look for any elements with the class 'custom-select': */
x = document.getElementsByClassName('custom-select');

for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName('select')[0];
  /* For each element, create a new DIV that will act as the selected item: */

  a = document.createElement('DIV');
  a.setAttribute('class', 'select-selected select-placeholder');
  a.setAttribute('tabindex', '0');
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement('DIV');
  b.setAttribute('class', 'select-items select-hide');
  b.setAttribute('tabindex', '0');
  for (j = 1; j < selElmnt.length; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement('DIV');
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.setAttribute('tabindex', '0');
    c.addEventListener('click', function(e) {
      /* When an item is clicked, update the original select box,
      and the selected item: */
      var y, i, k, s, h;
      s = this.parentNode.parentNode.getElementsByTagName('select')[0];
      h = this.parentNode.previousSibling;
      for (i = 0; i < s.length; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName('same-as-selected');
          for (k = 0; k < y.length; k++) {
            y[k].removeAttribute('class');
          }
          this.setAttribute('class', 'same-as-selected');
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);


  a.addEventListener('click', function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle('select-hide');
    this.classList.toggle('select-arrow-active');
    this.classList.remove('select-placeholder');

  });

  a.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      closeAllSelect(this);
      this.nextSibling.classList.toggle('select-hide');
      this.classList.toggle('select-arrow-active');
      this.classList.remove('select-placeholder');
    }
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName('select-items');
  y = document.getElementsByClassName('select-selected');
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove('select-arrow-active');

    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add('select-hide');
    }
  }
}
/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener('click', closeAllSelect);

})();
