
<section class="container">
    <h2 class="card__title">Популярные смартфоны</h2>

    <div id="card-wrapper--holder"></div>

    <script type="text/template" id="card-wrapper--template">
        <div class="card-wrapper">
        <% for(var i = 0; i < list.length; i++) { %>
            <div class="card">
                <a href="card_page.php">
                    <img class="card__image" src="images/photos/2016092801550411tq8oxpd.jpg"></img>
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
