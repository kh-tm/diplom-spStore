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
                    <% if(list[i].stock != 0) { %>
                        <div class="card__buy__text">В корзину</div>
                        <div class="card__buy__icon"></div>
                    <% } else { %>
                        <div class="card__buy__text card__buy__text--disabled">Нет в наличии</div>
                    <% } %>
                </div>
            </div>
        <% } %>
        </div>`;
        tmpl = _.template(tmpl);


        document.getElementById('card-wrapper--holder').innerHTML = tmpl({
          list: thisObject
        });

        /*      В КОРЗИНУ        */
        // с главной
        if(document.querySelector(".card-wrapper")) {
            document.querySelector(".card-wrapper").addEventListener('click', addToBasketFromMainPage);
        }
        /*   конец 'в корзину'   */

    }

    /*   index end   */

    /*   phone`s page  */

    function phonePageRendering(thisPhone) {
        let recommendedList = generateRecommendedList(thisPhone.id);
        let tmpl = `<div class="card-page__top-content">

            <div class="slider-nav">
                <% for(let i = 0; i < list.photos.length; i++) { %>
                    <div class="slider-nav__item"><img src="<%= 'images/photos/' + list.id + '/' + list.photos[i] %>"></div>
                <% } %>
            </div>
            <div class="slider">
                <% for(let i = 0; i < list.photos.length; i++) { %>
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
                <% if(list.stock != 0) { %>
                    <div class="card-page__to-basket" phoneId="<%= list.id %>">
                        Добавить в корзину
                    </div>
                <% } else { %>
                    <div class="card-page__to-basket card-page__to-basket--disabled" phoneId="<%= list.id %>">
                        Нет в наличии
                    </div>
                <% } %>
            </div>
        </div>

        <section class="similar-products">
            <h3 class="similar-products__title">Похожие смартфоны</h3>
            <div class="similar-products__wrapper">
                <% for(let i = 0; i < 3; i++) { %>
                    <a href="./?phoneid=<%= similar[i].id %>" class="similar-products__item">
                        <img src="<%= 'images/photos/' + similar[i].id + '/' + similar[i].photos[0] %>" alt="" class="similar-products__img">
                        <span class="similar-products__name"><%= similar[i].fullName %></span>
                        <span class="similar-products__cost"><%= similar[i].price %> ₽</span>
                    </a>
                <% } %>
            </div>
        </section>
        `;
        tmpl = _.template(tmpl);


        document.getElementById('card-page-wrapper--holder').innerHTML = tmpl({
          list: thisPhone,
          similar: recommendedList
        });

        /*      В КОРЗИНУ        */
        //со страницы товара
        if(document.querySelector(".card-page__to-basket")) {
            document.querySelector(".card-page__to-basket").addEventListener('click', addToBasketFromPhonePage);
        }
        /*   конец 'в корзину'   */

    }
    // indexPageRendering(phonesJS);

    /*   phone`s page end   */

/*   конец шаблонизатора   */

let promisePhoneRendered = new Promise((resolve, reject) => {
    Promise.all([promiseDB, promisePhotos])
            .then( () => {

                renderFromUrl();

                resolve('phone page is rendered');//тут включаются скрипты slick и zoomjs
            });

});



/*   для события клика "добавить в корзину" с главной  */
function addToBasketFromMainPage(myevent) {
    var target = myevent.target;


    while (!target.classList.contains("card-wrapper")
            &&
            !(target == document.body)) {
        if (target.hasAttribute('phoneid')
            && !target.querySelector('.card__buy__text--disabled')) {
            let phoneId = target.getAttribute('phoneId');

            phonesJS.forEach(function(item, i, arr) {
                if (phonesJS[i].id == phoneId) {
                    phonesJS[i].addToBasket();

                    target.querySelector('.card__buy__text').classList.add('card__buy__text--disabled');
                    target.querySelector('.card__buy__text').innerHTML = 'Добавлено';
                    target.querySelector('.card__buy__icon').classList.add('card__buy__icon--added');
                    return;
                }
            });
            return;
        }
        target = target.parentNode;
    }
}
/*   конец для функции события клика "добавить в корзину" с главной   */

/*   для события клика "добавить в корзину" со страницы товара  */
function addToBasketFromPhonePage(myEvent){
    if(!document.querySelector(".card-page__to-basket").classList.contains('card-page__to-basket--added')
        && !document.querySelector(".card-page__to-basket").classList.contains("card-page__to-basket--disabled")) {
        let phoneId = myEvent.target.getAttribute('phoneId');

        phonesJS.forEach(function(item, i, arr) {
            if (phonesJS[i].id == phoneId) {
                phonesJS[i].addToBasket();
                myEvent.target.classList.add('card-page__to-basket--added');
                myEvent.target.innerHTML = 'Добавлено в корзину';
                return;
            }
        });
    }
}
/*   конец для функции события клика "добавить в корзину" со страницы товара   */



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
        foundPhones = search(document.querySelector('.search-row__input').value, phonesJS);
        indexPageRendering(foundPhones);
        document.querySelector('.card__title').innerHTML = 'Результат поиска';
    } else {
        renderFromUrl();
    }
    if (foundPhones == undefined || foundPhones == []) {
        document.querySelector('.card__title').innerHTML = 'По вашему запросу ничего не найдено';
    }
});


/*   конец ПОИСКА   */


/*   генерация рекомендуемого списка   */
function generateRecommendedList(phoneId, initialList = phonesJS) {
    let sortedList = initialList.slice(0, initialList.length);
    let phoneItem;
    sortedList.forEach(function(item, i, arr) {
        if (sortedList[i].id == phoneId) {
            phoneItem = sortedList[i];
            sortedList.splice(i, 1);
            return;
        }
    });

    sortedList.sort(function(a, b) {
        if (Math.abs(phoneItem.price - a.price) > Math.abs(phoneItem.price - b.price)) return 1;
        if (Math.abs(phoneItem.price - a.price) < Math.abs(phoneItem.price - b.price)) return -1;
        return 0;
    });

    return sortedList.slice(0, 10);
}

/*   конец генерации рекомендуемого списка   */
