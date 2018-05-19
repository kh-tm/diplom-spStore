'use strict';


/*   ОБЪЯВЛЕНИЕ ГЛОБАЛЬНЫХ ПЕРЕМЕННЫХ и ФУНКЦИЙ   */


/*   функция замены урла   */
function setLocation(curLoc){
    try {
      history.pushState(null, null, curLoc);
      return;
    } catch(e) {}
    location.hash = '#' + curLoc;
}
/*   конец функции замены урла   */


/*   hand-made routing   */

function renderFromUrl() {
    if (initialUrl.query.phoneid) {
        let phoneIsFound = false;
        for(let phone of phonesJS) {
            if(phone.id == initialUrl.query.phoneid) {
                phoneIsFound = true;
                phonePageRendering(phone);

                if(document.querySelector('section.reviews')) {
                    let el = document.querySelector('section.reviews');
                    el.parentNode.removeChild(el);
                }
            }
        }
        if (!phoneIsFound) console.log('Ошибка! Не найден запрашиваемый ID'); /*отрисовать 404 pageNotFoundRendering()*/;
    } else {
        indexPageRendering(phonesJS);
    }
}

/*   конец роутинга   */


/*   функции для куки   */

// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
  options = options || {};

  let expires = options.expires;

  if (typeof expires == "number" && expires) {
    let d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  let updatedCookie = name + "=" + value;

  for (let propName in options) {
    updatedCookie += "; " + propName;
    let propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}
    /*  Аргументы:
    name    название cookie

    value   значение cookie (строка)

    options Объект с дополнительными свойствами для установки cookie:

    expires Время истечения cookie. Интерпретируется по-разному, в зависимости от типа:

            Число – количество секунд до истечения. Например, expires: 3600 – кука на час.

    Если expires в прошлом, то cookie будет удалено.
    Если expires отсутствует или 0, то cookie будет установлено как сессионное и исчезнет при закрытии браузера.
    path    Путь для cookie.

    domain  Домен для cookie.   */

    /*   обновление куки    */

    function updateCookie() {
        basketToCookie = {};
        basket.forEach(function(item, i, arr) {
            let key = item.id;
            basketToCookie[key] = item.count;
        });

        setCookie('basketPhones', JSON.stringify(basketToCookie), {
            expires: 3600,
            path: '/'
        });

        console.log('сработала updatecookie()' + getCookie('basketPhones'));
    }

    /*   конец обновления куки   */

/*   конец функций для куки   */




var phonesJS = [];



class Smartphone {
    constructor(itemFromPHP, imagesURL) {
        this.id = itemFromPHP.id;
        this.manufacturerName = itemFromPHP.manufacturerName;
        this.model = itemFromPHP.model;
        this.price = +itemFromPHP.price;
        this.photos = itemFromPHP.photos;
        this.description = itemFromPHP.description;
        this.color = itemFromPHP.color;
        this.screenDiagonal = +itemFromPHP.screenDiagonal;
        this.screenResolution = itemFromPHP.screenResolution;
        this.cameraResolution = itemFromPHP.cameraResolution;
        this.RAM = itemFromPHP.RAM;
        this.ROM = itemFromPHP.ROM;
        this.CPU = itemFromPHP.CPU;
        this.stock = +itemFromPHP.count;

        this.photos = this.photos ? this.photos : imagesURL[this.id];
    }
    get fullName() {
        return `${this.manufacturerName} ${this.model} ${this.color} ${this.RAM}/${this.ROM}`
    }

    addToBasket() {
        let found = false;
        basket.forEach(function(item, i, arr) {
            if (item.id == this.id) {
                found = true;
                item.count = item.count + 1;
                return;
            }
        }.bind(this));

        if (found == false) {
            basket.push(new SmartphoneBasket(this))
        }


        updateCookie();
    }
}

class SmartphoneBasket extends Smartphone {
    constructor(itemFromPHP, pushCount) {
        super(itemFromPHP);
        this._count = pushCount || 1;
    }
    set count(newValue) {
        this._count = newValue;
    }
    get count() {
        return this._count;
    }
}


/*   массив из php перевести сюда   */

function conversion(phonesFromPHP, imagesURL) {
    phonesFromPHP.forEach(function(item, i, arr) {
        phonesJS[i] = new Smartphone(item, imagesURL);
    });
}

/*   конец перевода массива   */




var basketToCookie = {};

/*   КОНЕЦ ОБЪЯВЛЕНИЯ ГЛОБАЛЬНЫХ ПЕРМЕННЫХ и ФУНКЦИЙ   */










/*    запрос на актуальную базу характеристик телефонов (без фото)    */

var basket = [];

let promiseDB = new Promise((resolve, reject) => {

    /*   запрос   */
    fetch('../database/sqlmaster.php')
                    .then( (resp) => {
                        if (resp.status === 200) return resp.json();
                        else console.log('Произошла ошибка при попытке запроса к базе')
                    })
                    .then( (data) => {
                        promisePhotos
                                    .then( (imagesURL) => {
                                        conversion(data, imagesURL);
                                    } )
                                    .then( () => {
                                        /*   синхронизация корзины с куками после перезагрузки   */
                                        if (getCookie('basketPhones') != undefined) {

                                            basket = [];
                                            let objFromCookie = JSON.parse(getCookie('basketPhones'));

                                            for (let j = 0; j < phonesJS.length; j++) {
                                                if (phonesJS[j].id in objFromCookie) {
                                                    basket.push(new SmartphoneBasket(phonesJS[j], objFromCookie[phonesJS[j].id]));
                                                }
                                            }
                                        } else {
                                            basket = [];
                                        }

                                        /*   конец синхронизации корзины с куками после перезагрузки   */
                                    } )
                                    .then( () => {
                                        resolve('success');
                                    });
                    } )
                    .catch( (err) => console.error(err) );

});


let promisePhotos = new Promise((resolve, reject) => {

    /*   запрос   */
    fetch('../database/scandir.php')
                    .then( (resp) => {
                        if (resp.status === 200) return resp.json();
                        else console.log('Произошла ошибка при попытке запроса к базе')
                    })
                    .then( (data) => {
                        resolve(data);
                    })
                    .catch( (err) => console.error(err) );

});
