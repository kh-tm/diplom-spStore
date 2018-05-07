'use strict';





/*   запрос   */
fetch('../sqlmaster.php')
                .then((resp) => {
                    console.log(resp);
                    if (resp.status === 200) return resp.json();
                })
                .then((data) => console.log(data))
                .catch(alert);














/*   ОБЪЯВЛЕНИЕ ГЛОБАЛЬНЫХ ПЕРЕМЕННЫХ и ФУНКЦИЙ   */

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



let phonesFromPHP = [
{
    id: '111',
    manufacturerName: 'Xiaomi',
    model:'Note 5',
    price: 12000,
    photos:'photos',
    description:'description',
    color:'black',
    screenDiagonal: 5.5,
    screenResolution:'fullHD+',
    cameraResolution:'cameraResolution',
    RAM:'2',
    ROM:'32',
    CPU:'CPU'
},
{
    id: '222',
    manufacturerName: 'Meizu',
    model:'mx5',
    price: 9000,
    photos:'photos',
    description:'description',
    color:'white',
    screenDiagonal:6,
    screenResolution:'HD',
    cameraResolution:'cameraResolution',
    RAM:'3',
    ROM:'32',
    CPU:'CPU'
},
{
    id: '333',
    manufacturerName: 'OnePlus',
    model:'5T',
    price: 28800,
    photos:'photos',
    description:'description',
    color:'gold',
    screenDiagonal: 4.5,
    screenResolution:'fullHD',
    cameraResolution:'cameraResolution',
    RAM:'4',
    ROM:'64',
    CPU:'CPU'
},
{
    id: '444',
    manufacturerName: 'Huawei',
    model:'7x',
    price: 19600,
    photos:'photos',
    description:'description',
    color:'blue',
    screenDiagonal:5,
    screenResolution:'HD+',
    cameraResolution:'cameraResolution',
    RAM:'4',
    ROM:'64',
    CPU:'CPU'
}
];

var phonesJS = [];



class Smartphone {
    constructor(itemFromPHP) {
        this.id = itemFromPHP.id;
        this.manufacturerName = itemFromPHP.manufacturerName;
        this.model = itemFromPHP.model;
        this.price = itemFromPHP.price;
        this.photos = itemFromPHP.photos;
        this.description = itemFromPHP.description;
        this.color = itemFromPHP.color;
        this.screenDiagonal = itemFromPHP.screenDiagonal;
        this.screenResolution = itemFromPHP.screenResolution;
        this.cameraResolution = itemFromPHP.cameraResolution;
        this.RAM = itemFromPHP.RAM;
        this.ROM = itemFromPHP.ROM;
        this.CPU = itemFromPHP.CPU;
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

function conversion(phonesFromPHP) {
    phonesFromPHP.forEach(function(item, i, arr) {
        phonesJS[i] = new Smartphone(item);
    });
}
conversion(phonesFromPHP);
/*   конец перевода массива   */



/*   синхронизация корзины с куками после перезагрузки   */

if (getCookie('basketPhones') != undefined) {
    var basket = [];
    let objFromCookie = JSON.parse(getCookie('basketPhones'));

    for (let j = 0; j < phonesJS.length; j++) {
        if (phonesJS[j].id in objFromCookie) {
            basket.push(new SmartphoneBasket(phonesJS[j], objFromCookie[phonesJS[j].id]))
        }
    }
} else {
    var basket = [];
}

/*   конец синхронизации корзины с куками после перезагрузки   */

var basketToCookie = {};

/*   КОНЕЦ ОБЪЯВЛЕНИЯ ГЛОБАЛЬНЫХ ПЕРМЕННЫХ и ФУНКЦИЙ   */
