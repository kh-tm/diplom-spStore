'use strict';


Promise.all([promiseDB, promisePhotos])
    .then(() => {
        /*  LoDash шаблонизатор */

            /*   catalog-page   */

            var tmpl = document.getElementById('catalog-page__products--template').innerHTML.trim();
            tmpl = _.template(tmpl);


            document.getElementById('catalog-page__products--holder').innerHTML = tmpl({
              list: phonesJS
            });

            /*   catalog-page end   */

        /*   конец шаблонизатора   */


        /*   сортировка по форме   */

        let sortForm = document.querySelector('form.catalog__fiters');
        sortForm.addEventListener('submit', function(event) {
            event.preventDefault();

            let sortedPhones = [];

            phonesJS.forEach(function(item, i, arr) {
                if (
                    ((sortForm.priceFrom.value != ''
                            &&
                    sortForm.priceFrom.value <= item.price)
                        ||
                    sortForm.priceFrom.value == '')
                    &&
                    ((sortForm.priceTo.value != ''
                            &&
                    sortForm.priceTo.value >= item.price)
                        ||
                    sortForm.priceTo.value == '')

                    &&/*  прошел по цене  */

                    ((sortForm.diagonalFrom.value != ''
                            &&
                    sortForm.diagonalFrom.value <= item.screenDiagonal)
                        ||
                    sortForm.diagonalFrom.value == "")
                    &&
                    ((sortForm.diagonalTo.value != ''
                            &&
                    sortForm.diagonalTo.value >= item.screenDiagonal)
                        ||
                    sortForm.diagonalTo.value == "")

                    &&/*  прошел по диагонали  */

                    ((item.manufacturerName.toUpperCase() == sortForm.xiaomi.getAttribute('name').toUpperCase()
                            &&
                    sortForm.xiaomi.checked == true)
                        ||
                    (item.manufacturerName.toUpperCase() == sortForm.meizu.getAttribute('name').toUpperCase()
                            &&
                    sortForm.meizu.checked == true)
                        ||
                    (item.manufacturerName.toUpperCase() == sortForm.oneplus.getAttribute('name').toUpperCase()
                            &&
                    sortForm.oneplus.checked == true)
                        ||
                    (item.manufacturerName.toUpperCase() == sortForm.huawei.getAttribute('name').toUpperCase()
                            &&
                    sortForm.huawei.checked == true)
                        ||
                    (item.manufacturerName.toUpperCase() == sortForm.zte.getAttribute('name').toUpperCase()
                            &&
                    sortForm.zte.checked == true)
                        ||
                    (sortForm.xiaomi.checked == false
                        &&
                    sortForm.meizu.checked == false
                        &&
                    sortForm.huawei.checked == false
                        &&
                    sortForm.oneplus.checked == false
                        &&
                    sortForm.zte.checked == false))

                    &&/*   прошел по производителю   */

                    !(
                    ((sortForm.colorBlack.checked == false
                                &&
                    item.color.trim().toLowerCase() == 'black')
                            &&
                    (sortForm.colorWhite.checked == true
                                ||
                    sortForm.colorGold.checked == true
                                ||
                    sortForm.colorOthers.checked == true))
                        ||
                    ((sortForm.colorWhite.checked == false
                                &&
                    item.color.trim().toLowerCase() == 'white')
                            &&
                    (sortForm.colorBlack.checked == true
                                ||
                    sortForm.colorGold.checked == true
                                ||
                    sortForm.colorOthers.checked == true))
                        ||
                    ((sortForm.colorGold.checked == false
                                &&
                    item.color.trim().toLowerCase() == 'gold')
                            &&
                    (sortForm.colorBlack.checked == true
                                ||
                    sortForm.colorWhite.checked == true
                                ||
                    sortForm.colorOthers.checked == true))

                        ||
                    ((item.color.trim().toLowerCase() != 'black'
                                &&
                    item.color.trim().toLowerCase() != 'white'
                                &&
                    item.color.trim().toLowerCase() != 'gold')
                            &&
                    (sortForm.colorOthers.checked == false
                                &&
                    (sortForm.colorBlack.checked == true
                                    ||
                    sortForm.colorWhite.checked == true
                                    ||
                    sortForm.colorGold.checked == true))
                    )
                    )
                    /*   прошел по цвету   */

                ) {
                    /*   прошел сортировку   */
                    sortedPhones.push(item);
                }
            });

            if(sortedPhones.length) {
                document.getElementById('catalog-page__products--holder').innerHTML = tmpl({
                  list: sortedPhones
                });

                if(document.querySelector(".catalog-page__products")) {
                    document.querySelector(".catalog-page__products").addEventListener('click', addToBasketFromCatalogPage);
                }
                
            } else {
                document.querySelector('#catalog-page__products--holder').innerHTML = 'Товары не найдены. Попробуйте изменить фильтры.'
            }

        });

        /*   конец сортировки по форме   */


        /*   обработчик клика "добавить в корзину"   */

        if(document.querySelector(".catalog-page__products")) {
            document.querySelector(".catalog-page__products").addEventListener('click', addToBasketFromCatalogPage);
        }

        /*   конец обработчика   */

    }
);

function addToBasketFromCatalogPage(myEvent) {
        var target = myEvent.target;


        while (!target.classList.contains("catalog-page__products")
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
