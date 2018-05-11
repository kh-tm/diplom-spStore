<?php
    define("STORE_PHONE_NUMBER", "+7 917 240-66-30");
?>

<header>
    <div class="header-top container">
        <div class="header__wrapper-top">
            <a href="index.php">
                <span class="header__logo">sp:<myTag style="color: rgb(233, 49, 193)">S</myTag>tore</span>
            </a>
            <div class="header__wrapper-top-right">
                <span class="header__phone"><?=STORE_PHONE_NUMBER?></span>
                <a href="basket_page.php" class="header__basket">Корзина</a>
            </div>
        </div>
        <ul class="header__main-nav">
            <a href="catalog_page.php">
                <li class="main-nav__element">Каталог товаров
                    <!-- <ul class="lvl-two">
                        <li class="lvl-two_element">Samsung</li>
                        <li class="lvl-two_element">Apple</li>
                        <li class="lvl-two_element">Xiaomi</li>
                        <li class="lvl-two_element">Другие</li>
                        <li class="lvl-two_element">Аксессуары</li>
                    </ul> -->
                </li>
             </a>
            <a href="guarantee_page.php">
                <li class="main-nav__element">Гарантия</li>
            </a>
            <a href="paymentAndDelivery_page.php">
                <li class="main-nav__element">Оплата и доставка</li>
            </a>
            <a href="contacts_page.php">
                <li class="main-nav__element">Контакты</li>
            </a>
        </ul>
    </div>
</header>
