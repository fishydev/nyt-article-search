import React, { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { Search } from "./components/Search"
import { ArticleCard } from "./components/ArticleCard"
import { PulseLoader } from "react-spinners"
import "./App.sass"

import { SearchArticlesParams, getArticles } from "./api/article"
import { ArticleSearchResponse } from "./types"
import { Article } from "./types"
import { CardSkeleton } from "./components/Skeleton/CardSkeleton"
import { toast, ToastContainer } from "react-toastify"

const renderSkeleton = (n: number) => {
  return [...Array(n)].map((e, i) => <CardSkeleton key={i} />)
}

function App() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  const [params, setParams] = useState<SearchArticlesParams>({
    page: 0,
    query: "",
  })

  const debouncedQuery = useDebouncedCallback((value) => {
    setArticles([])
    setParams({
      ...params,
      query: value,
    })
  }, 1000)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        const result = (await getArticles(params)).data as ArticleSearchResponse
        setArticles([...articles, ...result.response.docs])
      } catch (err) {
        // console.log("error: ", err)
        toast("Failed to load", {
          position: "bottom-center",
          type: "error",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [params])

  const handleLoadMore = () => {
    setParams({
      ...params,
      page: params.page + 1,
    })
  }

  return (
    <div className="App">
      <ToastContainer />
      <Search onChangeQuery={(e) => debouncedQuery(e.currentTarget.value)} />
      <div className="App__ArticlesContainer">
        {articles.length === 0 && renderSkeleton(8)}
        {articles.length > 0 &&
          articles.map((article) => {
            return <ArticleCard article={article} key={article.web_url} />
          })}
      </div>

      {loading && <PulseLoader className="App__Spinner" color="#26354b" />}
      {!loading && (
        <button
          className="App__LoadButton"
          onClick={handleLoadMore}
          disabled={loading}
        >
          load more
        </button>
      )}
    </div>
  )
}

export default App
