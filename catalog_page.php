<?php

include_once "include/head.php";

include_once "include/header.php";

?>

<h1 class="page-title contacts-page__title container">Каталог товаров</h1>


<section class="catalog-page container">

    <div id="catalog-page__products--holder"></div>

    <script type="text/template" id="catalog-page__products--template">
        <div class="catalog-page__products">
        <% for(var i = 0; i < list.length; i++) { %>
            <div class="card">
                <a href="./?phoneid=<%= list[i].id %>">
                    <img class="card__image" src="<%= 'images/photos/' + list[i].id + '/' + list[i].photos[0] %>"></img>
                </a>
                <div class="card__name">
                    <a href="./?phoneid=<%= list[i].id %>">
                        <%=list[i].fullName%>
                    </a>
                </div>
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
        </div>
    </script>

    <!-- <div class="catalog-page__products">
        <div class="card">
            <a href="card_page.php">
                <img class="card__image" src="images/photos/2016092801550411tq8oxpd.jpg"></img>
            </a>
            <div class="card__name">Xiaomi Redmi Note 4</div>
            <div class="card__cost">12 900 ₽</div>
            <div class="card__buy">
                <div class="card__buy__text">В корзину</div>
                <div class="card__buy__icon"></div>
            </div>
        </div>
    </div> -->

    <form action="" class="catalog__fiters">
        <div class="catalog__filters__block catalog__filters__price">
            <span class="catalog__filters__name">Цена, ₽</span>
            <p>
                <input type="text" name="priceFrom" pattern="^[0-9]+$">
                <span>от</span>
            </p>
            <p>
                <input type="text" name="priceTo" pattern="^[0-9]+$">
                <span>до</span>
            </p>
        </div>
        <div class="catalog__filters__block catalog__filters__brand">
            <span class="catalog__filters__name">Производитель</span>
            <p>
                <input id="catalog__filters__xiaomi" type="checkbox" name="xiaomi" value="">
                <label for="catalog__filters__xiaomi">Xiaomi</label>
            </p>
            <p>
                <input id="catalog__filters__meizu" type="checkbox" name="meizu" value="">
                <label for="catalog__filters__meizu">Meizu</label>
            </p>
            <p>
                <input id="catalog__filters__onePlus" type="checkbox" name="oneplus" value="">
                <label for="catalog__filters__onePlus">OnePlus</label>
            </p>
            <p>
                <input id="catalog__filters__huawei" type="checkbox" name="huawei" value="">
                <label for="catalog__filters__huawei">Huawei</label>
            </p>
            <p>
                <input id="catalog__filters__zte" type="checkbox" name="zte" value="">
                <label for="catalog__filters__zte">ZTE</label>
            </p>
        </div>
        <div class="catalog__filters__block catalog__filters__color">
            <span class="catalog__filters__name">Цвет корпуса</span>
            <p>
                <input id="catalog__filters__black" type="checkbox" name="colorBlack" value="">
                <label for="catalog__filters__black">Черный</label>
            </p>
            <p>
                <input id="catalog__filters__white" type="checkbox" name="colorWhite" value="">
                <label for="catalog__filters__white">Белый</label>
            </p>
            <p>
                <input id="catalog__filters__gold" type="checkbox" name="colorGold" value="">
                <label for="catalog__filters__gold">Золотой</label>
            </p>
            <p>
                <input id="catalog__filters__otherColors" type="checkbox" name="colorOthers" value="">
                <label for="catalog__filters__otherColors">Другие цвета</label>
            </p>
        </div>
        <div class="catalog__filters__block catalog__filters__diagonal">
            <span class="catalog__filters__name">Диагональ экрана</span>
            <p>
                <input type="text" name="diagonalFrom" pattern="\d+(\.\d)?">
                <span>от</span>
            </p>
            <p>
                <input type="text" name="diagonalTo" pattern="\d+(\.\d)?">
                <span>до</span>
            </p>
        </div>
        <input type="submit" name="filters" value="Применить фильтр">
    </form>
</section>


<?php

include_once "include/footer.php";

?>

<script type="text/javascript" src="js/catalog_page.js"></script>

</body>
</html>
