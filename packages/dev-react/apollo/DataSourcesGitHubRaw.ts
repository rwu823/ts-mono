import { RESTDataSource } from 'apollo-datasource-rest'

export default class extends RESTDataSource {
  baseURL = 'https://raw.githubusercontent.com'

  getEmojis = (): Promise<unknown[]> =>
    this.get<string>(`github/gemoji/master/db/emoji.json`).then((resText) =>
      JSON.parse(resText),
    )
}
