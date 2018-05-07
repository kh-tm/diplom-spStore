'use strict';

/*  LoDash шаблонизатор */

    /*   index   */

    function indexPageRendering(thisObject) {
        var tmpl = document.getElementById('card-wrapper--template').innerHTML.trim();
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
    indexPageRendering(phonesJS);

    /*   index end   */

/*   конец шаблонизатора   */

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
})




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
        indexPageRendering(phonesJS);
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
        console.log(currentElem);
        currentElem.style.alignSelf = 'flex-start';
    }
}

/*   конец стилей для последней строки   */
