'use strict';
// setLocation('?phoneid=1');//ДЛЯ ТЕСТА, МОЖНО УБИРАТЬ
const initialUrl = new Url();

/*  LoDash шаблонизатор */

    /*   index   */

    function indexPageRendering(thisObject) {
        let tmpl = `<h2 class="card__title">Популярные смартфоны</h2>
        <div class="card-wrapper">
        <% for(var i = 0; i < list.length; i++) { %>
            <div class="card">
                <a href="./?phoneid=<%= list[i].id %>">
                    <img class="card__image" src="<%= 'images/photos/' + list[i].id + '/' + list[i].photos[0] %>"></img>
                </a>
                <div class="card__name"><%=list[i].fullName%></div>
                <div class="card__cost"><%=list[i].price  + ' ₽'%></div>
                <div class="card__buy" phoneId="<%=list[i].id%>">
                    <div class="card__buy__text">В корзину</div>
                    <div class="card__buy__icon"></div>
                </div>
            </div>
        <% } %>
        </div>`;
        tmpl = _.template(tmpl);


        document.getElementById('card-wrapper--holder').innerHTML = tmpl({
          list: thisObject
        });

        try {
            helpFlexStyle(thisObject);
        } catch (e) {
            console.log(e);
        }

    }

    /*   index end   */

    /*   phone`s page  */

    function phonePageRendering(thisPhone) {
        let tmpl = `<div class="card-page__top-content">

            <div class="slider-nav">
                <% for(var i = 0; i < list.photos.length; i++) { %>
                    <div class="slider-nav__item"><img src="<%= 'images/photos/' + list.id + '/' + list.photos[i] %>"></div>
                <% } %>
            </div>
            <div class="slider">
                <% for(var i = 0; i < list.photos.length; i++) { %>
                    <div class="slider__item"><img src="<%= 'images/photos/' + list.id + '/' + list.photos[i] %>"></div>
                <% } %>
            </div>

            <div class="card-page__short-description">
                <h2 class="card-page__title"><%= list.fullName %></h2>
                <div class="card-page__cost"><%= list.price + ' руб.' %></div>
                <p class="card-page__text">
                    <span>ID:</span> <%= list.id %>
                    <br><span>Цвет:</span> <%= list.color %>
                    <br><span>Диагональ (дюйм):</span> <%= list.screenDiagonal %>
                    <br><span>Разрешение (пикс):</span> <%= list.screenResolution %>
                    <br><span>Встроенная память (Гб):</span> <%= list.ROM %>
                    <br><span>Фотокамера (Мп):</span> <%= list.cameraResolution %>
                    <br><span>Процессор:</span> <%= list.CPU %>
                </p>
                <div class="card-page__to-basket">
                    Добавить в корзину
                </div>
            </div>
        </div>`;
        tmpl = _.template(tmpl);


        document.getElementById('card-page-wrapper--holder').innerHTML = tmpl({
          list: thisPhone
        });

    }
    // indexPageRendering(phonesJS);

    /*   phone`s page end   */

/*   конец шаблонизатора   */


let promisePhoneRendered = new Promise((resolve, reject) => {
    Promise.all([promiseDB, promisePhotos])
            .then( () => {

                renderFromUrl();

                resolve('phone page is rendered');//тут включаются скрипты slick и zoomjs

                /*      В КОРЗИНУ        */
                if(document.querySelector(".card-wrapper")) {
                    document.querySelector(".card-wrapper").addEventListener('click', function(event){
                        var target = event.target;


                        while (!(target.classList.contains("card-wrapper"))
                                &&
                                !(target == document.body)) {
                            if (target.hasAttribute('phoneid')) {
                                let phoneId = target.getAttribute('phoneId');

                                phonesJS.forEach(function(item, i, arr) {
                                    if (phonesJS[i].id == phoneId) {
                                        phonesJS[i].addToBasket();
                                        return;
                                    }
                                });
                                return;
                            }
                            target = target.parentNode;
                        }
                    });
                }

                /*   конец 'в корзину'   */

            });

});







/*   ПОИСК   */

function search(request, data) {
    request = request.trim().toUpperCase().split(' ');
    let checkingFlag;
    let answer = [];
    phonesJS.forEach(function(item, i, arr) {
        checkingFlag = true;
        let thisItem = item;
        request.forEach(function(item, i, arr) {
            let regexp = new RegExp(item, "i");
            if (!regexp.test(thisItem.fullName)) {
                checkingFlag = false;
                return;
            }
        });
        if (checkingFlag) {
            answer.push(item);
        }
    });
    return (answer.length) ? answer : 0;
}

document.querySelector('.search-row__input').addEventListener('input', function(event) {
    let foundPhones = [];
    event.preventDefault();
    if (document.querySelector('.search-row__input').value.trim()) {
        document.querySelector('.card__title').innerHTML = 'Результат поиска';
        foundPhones = search(document.querySelector('.search-row__input').value, phonesJS);
        indexPageRendering(foundPhones);
    } else {
        renderFromUrl();
    }
    if (foundPhones == undefined || foundPhones == []) {
        document.querySelector('.card__title').innerHTML = 'По вашему запросу ничего не найдено';
    }
});


/*   конец ПОИСКА   */



/*   css для последней строки   */

function helpFlexStyle(phones) {
    let restLength = phones.length % 4;
    let wrapper = document.querySelector('.card-wrapper');
    for (let i = 2; i <= restLength+1; i++) {
        let currentElem = wrapper.childNodes[wrapper.childNodes.length - i];
        currentElem.style.alignSelf = 'flex-start';
    }
}

/*   конец стилей для последней строки   */
