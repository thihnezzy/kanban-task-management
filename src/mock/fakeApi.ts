import type { Server } from 'miragejs';

export default function commonFakeApi(server: Server, apiPrefix: string) {
  server.get(
    `${apiPrefix}/notification/list`,
    (schema) => schema.db.notificationListData,
  );

  // server.post(`${apiPrefix}/search/query`, (schema, { requestBody }) => {
  //     const body = JSON.parse(requestBody)
  //     const { query } = body
  //     const searchData = schema.db.searchQueryPoolData.filter(
  //         (elm) => typeof elm !== 'function'
  //     )
  //     const result = wildCardSearch(searchData, query, 'title')
  //     const categories: (string | number)[] = []

  //     result.forEach((elm) => {
  //         if (!categories.includes(elm.categoryTitle)) {
  //             categories.push(elm.categoryTitle)
  //         }
  //     })

  //     const data = categories.map((category) => {
  //         return {
  //             title: category,
  //             data: result.filter((elm) => elm.categoryTitle === category),
  //         }
  //     })
  //     return data
  // })
}
