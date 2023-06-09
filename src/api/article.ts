import axiosInstance from "."

type SearchArticlesParams = {
  query: string
  // startDate?: string
  // endDate?: string
  page: number
}

const getArticles = async (params: SearchArticlesParams) => {
  return axiosInstance.get("/articlesearch.json", {
    params: {
      q: params.query,
      // begin_date: params.startDate,
      // end_date: params.endDate,
      page: params.page,
    },
  })
}

export { getArticles }
export type { SearchArticlesParams }
