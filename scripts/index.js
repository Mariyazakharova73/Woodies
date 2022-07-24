const myMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return myMobile.Android() || myMobile.BlackBerry() || myMobile.iOS() || myMobile.Opera() || myMobile.Windows();
  },
};

//стрелка

if (myMobile.any()) {
  document.body.classList.add('_touch');
  let menuArrows = document.querySelectorAll('.menu__arrow');
  if (menuArrows.length > 0) {
    for (let index = 0; index < menuArrows.length; index++) {
      const menuArrow = menuArrows[index];
      menuArrow.addEventListener('click', function () {
        menuArrow.parentElement.classList.toggle('_active');
      });
    }
  }
} else {
  document.body.classList.add('_pc');
}

//Прокрутка при клике

const menuLinks = document.querySelectorAll('.header__menu-link[data-goto]');

if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener('click', onMenuLinkClick);
  });

  function onMenuLinkClick(evt) {
    const menuLink = evt.target;
    //заполнен ли дата-атрибут и существует ли объект, на который ссылается данный дата-атрибут
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      //положение секции при фиксированной шапке
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
      window.scrollTo({
        top: gotoBlockValue,
        //плавная прокрутка
        behavior: 'smooth',
      });
      //отключаем переход по ссылке
      evt.preventDefault();
    }
  }
}
