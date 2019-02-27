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
        newContentItem.querySelector('.content__date').setAttribute("datetime", content[i]['datetime']);
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
    xhr.overrideMimeType("application/json");
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
