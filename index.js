const axios = require("axios");

class InvestorApi {
  /**
   * @param {String} url - ссылка от вк
   * @param {Number} uid - ID пользователя
   */
  constructor({ uid, url }) {
    if (uid == null || isNaN(uid) || url == null) {
      console.log(`Ошибка при создание класса`);
      process.exit(0);
    }
    (this.uid = uid), (this.token = url), (this.connected = false);
  }

  /**
   * @async
   * @description - Попытка подключится к серверу по данным
   */
  async connect() {
    await axios
      .get(`https://invest.divweb.ru/api/profile/?${this.token.split("?")[1]}`)
      .then((r) => {
        if (r.data.success) {
          this.connected = true;
          console.log(`Вы успешно подключились к серверу`);
        } else {
          console.log(`Ошибка при подключении`);
          process.exit(0);
        }
      })
      .catch((e) => console.log(e) & process.exit(0));
  }
  /**
   * @description - Получить историю переводов от юзеров на ваш аккаунт
   * @returns {Array} - Список переводов
   */
  getMyHistory() {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(
          `https://invest.divweb.ru/api/transactions/?${
            this.token.split("?")[1]
          }`
        )
        .then((r) => {
          if (r.data.success) {
            resolve(
              r.data.data.results.filter(
                (v) =>
                  v.sender_user != null &&
                  v.reciever_user != null &&
                  v.currency_type == "USD" &&
                  v.reciever_user?.vk_id == this.uid
              )
            );
          } else {
            reject(r.data);
          }
          return;
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
  /**
   * @param {Number} toId - Id получателя
   * @param {Number} sum - Сумма перевода
   * @param {String} recieverType - Тип получателя ( по умолчанию "user" )
   * @param {String} currencyType - Тип валюты перевода ( по умолчанию "USD" )
   * @description Перевод пользователю\группе
   * @returns {Promise<{object Object}>}
   */
  sendPayment(toId, sum, recieverType = "user", currencyType = "USD") {
    return new Promise(async (resolve, reject) => {
      await axios
        .post(
          `https://invest.divweb.ru/api/transfer-money/?${
            this.token.split("?")[1]
          }`,
          {
            currency_type: currencyType,
            reciever: toId,
            amount: sum,
            reciever_type: recieverType,
          }
        )
        .then((r) => {
          if (r.data.success) {
            resolve(r.data.data);
          } else {
            reject(r.data);
          }
        })
        .catch((e) => reject(e));
    });
  }
  /**
   * @description - Получить награду за просмотр рекламы, без просмотра рекламы
   * @returns {Object} - Ответ от сервера
   */
  getAdReward() {
    return new Promise(async (resolve, reject) => {
      await axios
        .post(
          `https://invest.divweb.ru/api/bonuses/ad/?${
            this.token.split("?")[1]
          }`,
          {}
        )
        .then((r) => {
          if (r.data.success) {
            resolve(r.data.data);
          } else {
            reject(r.data);
          }
        })
        .catch((e) => reject(e));
    });
  }
  /**
   * @description - Получить личные балансы
   * @returns {Object} - Список балансов
   */
  getMyBalance() {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(
          `https://invest.divweb.ru/api/profile/?${this.token.split("?")[1]}`
        )
        .then((r) => {
          if (r.data.success) {
            resolve({
              usd: r.data.data.balance,
              btc: r.data.data.btc,
              eth: r.data.data.eth,
            });
          } else {
            reject(r.data);
          }
        })
        .catch((e) => reject(e));
    });
  }
}

module.exports = InvestorApi;
