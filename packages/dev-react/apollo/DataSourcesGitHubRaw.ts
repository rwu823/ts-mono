import { RESTDataSource } from 'apollo-datasource-rest'

export default class extends RESTDataSource {
  baseURL = 'https://raw.githubusercontent.com'

  getEmojis = () =>
    this.get(`github/gemoji/master/db/emoji.json`).then((resText) =>
      JSON.parse(resText),
    )
}
