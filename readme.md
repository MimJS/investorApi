# InvestorAPI
Модуль для работы с API vk mini app инвестор

[![npm package](https://nodei.co/npm/@mimjs/investorapi.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/node-vkcoinapi/)
[![NPM](https://img.shields.io/npm/v/@mimjs/investorapi.svg)](https://www.npmjs.com/package/@mimjs/investorapi)
[![DOWNLOADS](https://img.shields.io/npm/dt/@mimjs/investorapi.svg)](https://www.npmjs.com/package/@mimjs/investorapi)

### Особенности:
* Реализованы методы для создания ботов на любую валюту
* Тестовая документация
* Возможность узнавать свой баланс и переводить пользователям и группам любую из валют
* Активные обновления 
* Не тянет за собой много библиотек
* Есть своя беседа для обсуждения обновлений/багов [VK](https://vk.me/join/EvpEtX9wMMwxeh/0/YMcSMP/ydBaC/7xQX4=)

### Планы:
- [ ] Сделать возможность получать историю на все валюты 
- [ ] Сделать метод для покупки\продажи акций
- [ ] Сделать возможность узнавать чужие балансы

# Установка
### Windows:
* Скачайте и установите последнюю версию [Node.JS](https://nodejs.org/en/download/)
* Создайте в удобном месте папку, например **investor**
* Перейдите в командную строку: Win + R > cmd
* Перейдите в папку: **cd (путь до вашей папки)**
* Пропишите: npm i @mimjs/investorapi

### Ubuntu:
* Установите Node.JS по [этому](https://www.digitalocean.com/community/tutorials/node-js-ubuntu-16-04-ru) гайду
* Создайте в удобном месте папку, например **investor**
* Перейдите в папку: **cd (путь до вашей папки)**
* Пропишите: npm i @mimjs/investorapi

# Начало работы
Для начала использования, вам нужно создать в своей папке исполняемый файл, пусть это будет **index.js**

Теперь его нужно открыть и импортировать библиотеку:
```js
const InvestorApi = require('@mimjs/investorapi');
const client = new InvestorApi({ 
    uid: айди страницы вк, 
    url: "https://prod-app7689931-9e82ad376a9f.pages-ac.vk-apps.com/index.html?vk_access_token_settings=&vk_app_id=7689931&vk_are_notifications_enabled=1&vk_is_app_user=1&vk_is_favorite=1&vk_language=ru&vk_platform=desktop_web&vk_ref=quick_search&vk_ts=***&vk_user_id=***&sign=***"
});
```
# Доступные методы

### connect
Пробует подключится к серверу по вашим данным

```js
async function run() {
    await client.connect();
}
run().catch(console.error);
```

### getMyBalance
Получить свои балансы
```js
async function run() {
    const result = await client.getMyBalance().catch((e) => console.log(e));
    console.log(result);
}
run().catch(console.error);
```

### sendPayment
Отправить USD/BTC/ETH любому пользователю/группе
```js
async function run() {
    const result = await client.sendPayment(toId, sum, recieverType, currencyType).catch((e) => console.log(e));
    console.log(result);
}
run().catch(console.error);
```

|Параметр|Тип|Описание|По умолчанию|
|-|-|-|-|
|toId|Number|Id пользователя/группы, которому нужно отправить коины|нет|
|sum|Number|Сумма, которую нужно отправить пользователю|нет|
|recieverType|String|Тип получателя ( user, community )|user|
|currencyType|String|Тип валюты для перевода ( USD, BTC, ETH )|USD|

### getMyHistory
Получить историю переводов USD от пользователей на свой аккаунт
```js
async function run() {
    const result = await client.getMyHistory().catch((e) => console.log(e));
    console.log(result);
}
run().catch(console.error);
```

### getAdReward
Получить награду за просмотр рекламы, без просмотра рекламы
```js
async function run() {
    const result = await client.getAdReward().catch((e) => console.log(e));
    console.log(result);
}
run().catch(console.error);
```