
<section class="container" id="card-wrapper--holder">

    <script type="text/template" id="card-wrapper--template">
        <h2 class="card__title">Популярные смартфоны</h2>
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
        </div>
    </script>

    <!-- <div class="card-wrapper">
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
</section>


<section class="card-page container" id="card-page-wrapper--holder">
    <script type="text/template" id="card-page-wrapper--template">
        <div class="card-page__top-content">

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
        </div>
    </script>
</section>
