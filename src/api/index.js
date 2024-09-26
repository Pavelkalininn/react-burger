class Api {
    constructor (url, headers) {
      this._url = url
      this._headers = headers
    }
  
    checkResponse (res) {
      return new Promise((resolve, reject) => {
        if (res.status === 204) {
          return resolve(res)
        }
        const func = res.status < 400 ? resolve : reject
        res.json().then(data => func(data))
      })
    }
    async getIngredients () {
      return fetch(
        `${this._url}/api/ingredients`,
        {
          method: 'GET',
          headers: this._headers,
        }
      ).then(this.checkResponse)
    }
}
export default new Api(process.env.API_URL || 'https://norma.nomoreparties.space', { 'content-type': 'application/json' })