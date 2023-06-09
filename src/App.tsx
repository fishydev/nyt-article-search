import React, { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { Search } from "./components/Search"
import { ArticleCard } from "./components/ArticleCard"
import "./App.sass"

import { SearchArticlesParams, getArticles } from "./api/article"
import { ArticleSearchResponse } from "./types"
import { Article } from "./types"
import { CardSkeleton } from "./components/Skeleton/CardSkeleton"

function App() {
  const [articles, setArticles] = useState<Article[]>([])
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

  const renderSkeleton = () => {
    const skeletons = []
    for (let i = 0; i < 10; i++) {
      skeletons.push(<CardSkeleton />)
    }

    return skeletons
  }

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const result = (await getArticles(params)).data as ArticleSearchResponse
        setArticles([...articles, ...result.response.docs])
      } catch (err) {
        console.log("error: ", err)
      }
    }

    fetchArticles()
  }, [params.page, params.query])

  const handleLoadMore = () => {
    setParams({
      ...params,
      page: params.page + 1,
    })
  }

  return (
    <div className="App">
      <Search onChangeQuery={(e) => debouncedQuery(e.currentTarget.value)} />
      <div className="App__ArticlesContainer">
        {articles.length === 0 && renderSkeleton()}
        {articles.length > 0 &&
          articles.map((article) => {
            return <ArticleCard article={article} key={article.web_url} />
          })}
      </div>
      <button className="App__LoadButton" onClick={handleLoadMore}>
        Load more
      </button>
    </div>
  )
}

export default App
