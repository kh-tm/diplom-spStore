'use strict';


promiseDB
    .then(() => {
        let totalAmount;//summa
        let mainForm = document.forms.basketPageProducts;
        let basketPageNumber = document.querySelectorAll('input[name="basket-page__number"]');

        basketPageNumber.forEach(function(item, i, arr) {
            console.log(i);
            item.onkeypress = function(e) {

                e = e || event;

                if (e.ctrlKey || e.altKey || e.metaKey) return;

                let chr = getChar(e);

                // с null надо осторожно в неравенствах, т.к. например null >= '0' => true!
                // на всякий случай лучше вынести проверку chr == null отдельно
                if (chr == null) return;

                if (chr < '0' || chr > '9') {
                    return false;
                }

            }

            function getChar(event) {
                if (event.which == null) {
                    if (event.keyCode < 32) return null;
                    return String.fromCharCode(event.keyCode) // IE
                }

                if (event.which != 0 && event.charCode != 0) {
                    if (event.which < 32) return null;
                    return String.fromCharCode(event.which) // остальные
                }

                return null; // специальная клавиша
            }
        });

        function counting() {
            let currentAmount = 0;
            basket.forEach(function(item, i, arr) {
                currentAmount += (+item.count * +item.price);
            });


            if (mainForm.elements.deliveryMethod[0].checked) currentAmount += 0;
            else if (mainForm.elements.deliveryMethod[1].checked) currentAmount += 250;
            else if (mainForm.elements.deliveryMethod[2].checked) currentAmount += 740;
            totalAmount = currentAmount;
            return currentAmount;
        }

        counting();

        for (let i = 0; i <= 2; i++) {
            mainForm.elements.deliveryMethod[i].addEventListener('change', function() {
                counting();
                basketPageRendering();
        });}



        /*  LoDash шаблонизатор */

            /*   basket-page   */

            function basketPageRendering() {
                let tmpl = document.getElementById('basket-page__products--template').innerHTML.trim();
                tmpl = _.template(tmpl);


                document.getElementById('basket-page__products--holder').innerHTML = tmpl({
                  list: basket
                });


                if (basket.length) {
                    let tmpl2 = document.getElementById('basket-page__amount--template').innerHTML.trim();
                    tmpl2 = _.template(tmpl2);


                    document.getElementById('basket-page__amount--holder').innerHTML = tmpl2({
                      amount: totalAmount
                    });
                } else {
                    console.log('basket.length: ' + basket.length);
                    document.querySelector('form.basket-page__table').style.display = 'none';

                    let tmpl2 = document.getElementById('basket-page__isEmpty--template').innerHTML.trim();
                    tmpl2 = _.template(tmpl2);


                    document.getElementById('basket-page__isEmpty--holder').innerHTML = tmpl2({});
                }
            }
            basketPageRendering();


            /*   catalog-page end   */

        /*   конец шаблонизатора   */



        document.querySelector("#basket-page__products--holder").addEventListener('click', function(event){
            let target = event.target;
            if ((target.classList.contains("basket-page__table__delete"))
                ||
                (target.parentNode.classList.contains("basket-page__table__delete"))) {
                    while (!(target.classList.contains("basket-page__products--holder"))
                            &&
                            !(target == document.body)) {
                        if (target.hasAttribute('phoneid')) {
                            let phoneId = target.getAttribute('phoneId');

                            basket.forEach(function(item, i, arr) {
                                if (basket[i].id == phoneId) {
                                    basket.splice(i, 1);
                                    updateCookie();
                                    counting();
                                    basketPageRendering();
                                    return;
                                }
                            });
                            return;
                        }
                        target = target.parentNode;
                    }
                }
        });


        /*   изменить количество телефонов   */

        document.querySelector("#basket-page__products--holder").addEventListener('click', function(event){
            let target = event.target;
            let option;
            if (target.classList.contains("plus")) {option = 'plus';}
            else if (target.classList.contains("minus")) {option = 'minus';}
            else {return};

            if ((target.classList.contains("basket-page__table__number"))
                ||
                (target.parentNode.classList.contains("basket-page__table__number"))) {
                    while (!(target.classList.contains("basket-page__products--holder"))
                            &&
                            !(target == document.body)) {
                        if (target.hasAttribute('phoneid')) {
                            let phoneId = target.getAttribute('phoneId');

                            basket.forEach(function(item, i, arr) {
                                if (basket[i].id == phoneId) {
                                    if (option == 'plus') basket[i].count += 1;
                                    if (option == 'minus' && basket[i].count < 2) return;
                                    if (option == 'minus') basket[i].count -= 1;
                                    updateCookie();
                                    counting();
                                    basketPageRendering();
                                    return;
                                }
                            });
                            return;
                        }
                        target = target.parentNode;
                    }
                }
        });

        document.querySelector("#basket-page__products--holder").addEventListener('change', function(event){
            let target = event.target;
            let newValue = target.value;
            if (target.getAttribute('name') == 'basket-page__number') {
                    while (!(target.classList.contains("basket-page__products--holder"))
                            &&
                            !(target == document.body)) {
                        if (target.hasAttribute('phoneid')) {
                            let phoneId = target.getAttribute('phoneId');

                            basket.forEach(function(item, i, arr) {
                                if (basket[i].id == phoneId) {
                                    basket[i].count = + newValue;
                                    updateCookie();
                                    counting();
                                    basketPageRendering();
                                    return;
                                }
                            });
                            return;
                        }
                        target = target.parentNode;
                    }
                }
        });

        /*   конец изменения количества   */





        /*   popup   */
        document.forms.basketPageProducts.submit.onclick = function(event) {
            event.preventDefault();
            showPopup();
        }

            /*   lodash создание элементов   */
            let tmpl = document.getElementById('basket-page__popup--template').innerHTML.trim();
            tmpl = _.template(tmpl);


            document.getElementById('basket-page__popup--holder').innerHTML = tmpl({});
            /*   конец lodash создание элементов   */


        function showPopup() {
            document.getElementById('basket-page__popup--holder').style.visibility = 'visible';
            document.getElementById('basket-page__popup--holder').style.display = '';
        }

        document.querySelector('.basket-page__pupup-content>input[type="submit"]').onclick = function(event) {
            event.preventDefault();
            let popupForm = document.forms.basketContactDetails;
            if(popupForm.email.value == '') {
                popupForm.email.oninput = function() {
                    if(this.value != '') {
                        popupForm.email.style.boxShadow = '';
                    }
                }
                popupForm.email.style.boxShadow = '0 0 7px 0 red';
            }
            if(!popupForm.phoneNumber.value) {
                popupForm.phoneNumber.oninput = function() {
                    if(this.value != '') {
                        popupForm.phoneNumber.style.boxShadow = '';
                    }
                }
                popupForm.phoneNumber.style.boxShadow = '0 0 7px 0 red';
            }
            if(!popupForm.address.value) {
                popupForm.address.oninput = function() {
                    if(this.value != '') {
                        popupForm.address.style.boxShadow = '';
                    }
                }
                popupForm.address.style.boxShadow = '0 0 7px 0 red';
            }
            if (popupForm.email.value && popupForm.phoneNumber.value && popupForm.address.value) {
                event.target.style.backgroundColor = 'rgb(108, 200, 109)';
                event.target.value = 'Данные успешно отправлены';
                event.target.setAttribute('disabled', 'disabled');


                document.forms.basketPageProducts.submit.style.backgroundColor = 'rgb(108, 200, 109)';
                document.forms.basketPageProducts.submit.setAttribute('disabled', 'disabled');
                document.forms.basketPageProducts.submit.value = 'Заказ принят';
            }
        }

        document.getElementById('basket-page__popup--holder').onclick = function(event) {
            if (event.target.getAttribute('id') != 'basket-page__popup--holder') return;
            event.target.style.display = 'none';
        }
        /*   конец popup   */

    }
);
