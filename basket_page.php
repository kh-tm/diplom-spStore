<?php

include_once "include/head.php";

include_once "include/header.php";

?>


<h1 class="page-title basket-page__title container">Ваша корзина</h1>

<section class="basket-page__content-wrapper container">

    <div id="basket-page__isEmpty--holder"></div>

    <script type="text/template" id="basket-page__isEmpty--template">
        <span class="basket-page__isEmpty">
            Здесь пока ничего нет. Вы можете <a href="catalog_page.php">перейти в каталог</a> и добавить товары в корзину.
        </span>
    </script>

    <form class="basket-page__table" action="" method="post" name="basketPageProducts">
        <div class="basket-page__table__row basket-page__table__headers">
            <div class="basket-page__table__number">
                Количество
            </div>
            <div class="basket-page__table__sum">
                Стоимость
            </div>
        </div>

        <div id="basket-page__products--holder"></div>

        <script type="text/template" id="basket-page__products--template">

            <% for(var i = 0; i < list.length; i++) { %>
            <div phoneId="<%=list[i].id%>" class="basket-page__table__row basket-page__table__product">
                <div class="basket-page__table__photo">
                    <a href="./?phoneid=<%= list[i].id %>">
                        <img src="<%= 'images/photos/' + list[i].id + '/' + list[i].photos[0] %>"  alt="">
                    </a>
                </div>
                <div class="basket-page__table__product-name">
                    <a href="card_page.php"><%=list[i].fullName%></a>
                </div>
                <div class="basket-page__table__price">
                    <%=list[i].price  + ' ₽'%>
                </div>
                <div class="basket-page__table__number">
                    <div class="minus">–</div>
                    <input type="text" name="basket-page__number" <%='value=\'' + list[i].count + '\''%>>
                    <div class="plus">+</div>
                </div>
                <div class="basket-page__table__sum">
                    <%=(+list[i].price * +list[i].count)  + ' ₽'%>
                </div>
                <div class="basket-page__table__delete">
                    <div></div>
                </div>
            </div>
            <% } %>
        </script>

        <div class="basket-page__delivery">
            <h2 class="basket-page__subtitle">Выберите способ доставки</h2>

            <div class="basket-page__table__row">
                <label class="basket-page__container">Самовывоз по адресу Пример Улицы, Дом, Казань, Россия
                    <input type="radio" checked="checked" name="deliveryMethod" value="pickup">
                    <span class="basket-page__checkmark"></span>
                </label>
                <div class="basket-page__table__sum">
                    0 ₽
                </div>
            </div>

            <div class="basket-page__table__row">
                <label class="basket-page__container">Доставка курьером по г.Казани
                    <input type="radio" name="deliveryMethod" value="courier">
                    <span class="basket-page__checkmark"></span>
                </label>
                <div class="basket-page__table__sum">
                    250 ₽
                </div>
            </div>

            <div class="basket-page__table__row">
                <label class="basket-page__container">Доставка курьерской службой CDEK по стране
                    <input type="radio" name="deliveryMethod" value="mail">
                    <span class="basket-page__checkmark"></span>
                </label>
                <div class="basket-page__table__sum">
                    740 ₽
                </div>
            </div>
        </div>

        <div class="basket-page__table__row basket-page__final-sum">
            <div class="basket-page__description">Итого с учетом доставки:</div>

            <div id="basket-page__amount--holder"></div>

            <script type="text/template" id="basket-page__amount--template">
                <div class="basket-page__table__sum">
                    <%=amount + ' ₽'%>
                </div>
            </script>

        </div>

        <input name="submit" type="submit" value="Оформить заказ">
    </form>

</section>

<!-- popup с заполнением адреса -->

<div id="basket-page__popup--holder"></div>

<script type="text/template" id="basket-page__popup--template">
    <form class="basket-page__pupup-content" method="post" name="basketContactDetails">
        <p class="basket-page__pupup-title">Оставьте свои контактные данные, и мы свяжемся с Вами для подтверждения заказа</p>
        <p>
            <span>E-mail (обещаем не спамить):</span>
            <input type="text" name="email" placeholder="Ваш e-mail">
        </p>
        <p>
            <span>Номер телефона:</span>
            <input type="text" name="phoneNumber" placeholder="Ваш номер телефона">
        </p>
        <p>
            <span>Адрес доставки:</span>
            <input type="text" name="address" placeholder="Город, улица, дом, квартира">
        </p>
        <input type="submit" value="Отправить данные">
    </form>
</script>


<?php

include_once "include/footer.php";

?>

<script type="text/javascript" src="js/basket_page.js"></script>

</body>
</html>
