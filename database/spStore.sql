-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Май 23 2018 г., 19:02
-- Версия сервера: 5.6.38
-- Версия PHP: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `spStore`
--

-- --------------------------------------------------------

--
-- Структура таблицы `phones`
--

CREATE TABLE `phones` (
  `id` int(10) UNSIGNED NOT NULL,
  `manufacturerName` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `price` mediumint(8) UNSIGNED NOT NULL,
  `description` text NOT NULL,
  `color` varchar(255) NOT NULL,
  `screenDiagonal` decimal(10,0) UNSIGNED NOT NULL,
  `screenResolution` varchar(255) NOT NULL,
  `cameraResolution` varchar(255) NOT NULL,
  `RAM` tinyint(3) UNSIGNED NOT NULL,
  `ROM` tinyint(3) UNSIGNED NOT NULL,
  `CPU` varchar(255) NOT NULL,
  `count` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `phones`
--

INSERT INTO `phones` (`id`, `manufacturerName`, `model`, `price`, `description`, `color`, `screenDiagonal`, `screenResolution`, `cameraResolution`, `RAM`, `ROM`, `CPU`, `count`) VALUES
(1, 'Xiaomi', 'Redmi 5', 9900, 'Новый телефон Xiaomi Redmi 5 похож на Mi Mix 2 благодаря 5.7-дюймовому дисплею с тонкими рамками, закругленным краям и формату 18:9. Кроме того, новинка получила новый 8-ядерный чипсет Snapdragon 450 с 14-нанометровым тех.процессом и обновленную камеру на 12 Мп с увеличенным размером пикселей 1.25μm. Как и всегда, в категории бюджетных устройств нет равных Xiaomi Redmi 5, купить в Казани который можно у нас в магазине tablet4U с гарантией 12 мес.', 'Black', '6', 'HD+ (1440 x 720), 409 ppi, 18:9', 'CMOS, f/2.2, 13 МП', 3, 32, 'Qualcomm Snapdragon 450, 14 нм, 8 ядер Cortex-A53 1.8 ГГц', 4),
(2, 'Meizu', 'MX6', 14500, 'Meizu MX6 – это цельнометаллический корпус, обновленный дизайн, компактные размеры (значительно меньше iPhone 7 Plus). Качественный корпус безупречной сборки не скользит, не люфтит, не царапается, не собирает отпечатки пальцев. Швы стали плоскими, матовыми, красиво закругленными. Разъем для гарнитуры 3.5 мм перебрался на нижнюю грань для большего удобства. Датчик приближения/освещения и фронтальная камера расположены симметрично.', 'Gray', '6', 'IPS (Sharp TDDI) (1920x1080) 404 ppi', '12 Мп, 1.23 мкм, f/2.0, фазовая (PDAF)', 3, 32, '64-битный MediaTek Helio X20, 10 ядер, 2.3 ГГц ', 2),
(3, 'OnePlus', '5T', 33500, 'Для производства OnePlus 5T использовался сверхпрочный алюминиевый сплав, который прошел множество этапов шлифовки и пескоструйной обработки. Несмотря на металлическую оболочку, устройство получилось очень легким и тонким – всего 7.3 мм при весе 162 г, благодаря чему его удобно держать в одной руке.', 'Black', '6', 'OpticAMOLED, FullHD+ (1080 x 2160), 402 ppi', 'Sony IMX350 20 Мп + IMX398 16 Мп, f/1.7, Dual LED', 6, 64, 'Qualcomm Snapdragon 835, 8 ядер (4x 2.45 GHz Kryo + 4x 2.15 GHz Kryo)', 4),
(4, 'Xiaomi', 'Mi A1', 13300, 'Смартфон Xiaomi A1 выполнен в аналогичном Mi 5X дизайне: толщина 7.3 мм, скруглённые грани, защитное 2.5D стекло Corning Gorilla Glass на лицевой панели. Сзади в телефоне используется металл, доступный в цветах «золотистый», «чёрный» и «розовое золото». Полоски антенн в Mi A1 тоже располагаются возле верхней и нижней грани, что обеспечивает целостность дизайна, а разъёмы вынесены на нижний торец.', 'Red', '6', 'IPS Full HD (1080x1920), 401 ppi', '12 МП, f/2.2 + 12 МП, f/2.6, двойная LED-вспышка, автофокус', 4, 64, 'Qualcomm Snapdragon 625, 14 нм, 64 бит, 8 ядер по 2 ГГц', 1),
(5, 'Meizu', 'M6 NOTE', 14900, 'Новинка предлагается в сером, золотистом и голубом цвете. Задняя панель Мейзу М6 Ноте полностью выполнена из металла. Оригинально выглядит вписанная в полоску антенны вспышка. Ранее схожее решение встречалось только в Meizu E2, однако теперь 4-LED Flash располагается по центру в одну линию с камерой.', 'Black', '6', 'IPS Full HD (1080x1920), 401 ppi', 'Sony IMX362, 12 МП, f/1.9 + Samsung S5K2L3, 5 МП, f/2.0, Quad LED-вспышка, автофокус', 4, 64, 'Qualcomm Snapdragon 625, 14 нм, 64 бит, 8 ядер по 2 ГГц', 0),
(6, 'Xiaomi', 'MI MIX 2', 26500, 'Ксиаоми МИКС 2 изготавливается из алюминиевого сплава и керамики. Толщина смартфона составляет всего 7.7 мм, что аналогично данному показателю в iPhone X. Нижняя рамка стала на 12% тоньше, чем в Mi MIX. Новинка не имеет 3,5-мм разъёма, но взамен производитель поместил в комплект переходник на USB-C для использования с обычными наушниками.', 'Black', '6', 'IPS, 1080x2160 (18:9)', 'Sony IMX386, f/2.0, 12 МП, Dual LED', 6, 128, 'Qualcomm Snapdragon 835, 8 ядер (4 х 2.45 ГГц, 4 х 1.9 ГГц)', 3),
(7, 'Meizu', 'M6S', 13000, 'Смартфоны Мейзу всегда привлекали своей эстетикой, и M6S продолжает тренд. Красивый, удобный, явно небюджетный – первые мысли, которые посетят вас, стоит только увидеть его своими глазами и взять в свои руки! Монолитный металлический корпус, округлые грани, которые гармонируют со скругленными краями дисплея, 2.5D-стекло – лишь малая часть деталей, которые создают образ флагманского смартфона. И не удивительно! Ведь дизайнеры доработали корпус Meizu Pro 6 – прошлогоднего флагмана.', 'Blue', '6', 'IPS HD+ (1440х720) 282 ppi', '16 Мп CMOS, f/2.0, сенсор Samsung S5K2P7, двойная LED-вспышка', 3, 32, 'Samsung Exynos 7872, 6 ядер', 1);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `phones`
--
ALTER TABLE `phones`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `phones`
--
ALTER TABLE `phones`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
