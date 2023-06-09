import React from "react"
import "./ArticleCard.sass"
import { Article, Multimedia } from "../../types"
import dayjs from "dayjs"

type ArticleCardProps = {
  article: Article
}

export const ArticleCard = (props: ArticleCardProps) => {
  const { article } = props

  const findMedia = (subtype: string): string => {
    const media = article.multimedia.find((media) => {
      return media.subtype === subtype
    })
    return media ? `https://www.nytimes.com/${media.url}` : ""
  }

  const getDate = (date: string) => {
    return dayjs(date).format("DD-MM-YYYY")
  }

  return (
    <div className="Article">
      <a
        href={article.web_url}
        target="_blank"
        className="Article__Wrapper"
        rel="noreferrer"
      >
        {article.multimedia.length > 0 && (
          <picture>
            <source media="(min-width: 720px)" srcSet={findMedia("blog427")} />
            <source
              media="(min-width: 1024px)"
              srcSet={findMedia("largeWidescreen573")}
            />
            <img
              className="Article__Image"
              src={findMedia("smallSquare168")}
              alt=""
            />
          </picture>
        )}
        <div className="Article__Info">
          <div className="Article__Detail">
            <h4 className="Article__Section">{article.section_name}</h4>
            <h3 className="Article__Title">{article.headline.main}</h3>
          </div>
          <div className="Article__Metadata">
            {article.headline.kicker && (
              <span className="Article__Author">{article.headline.kicker}</span>
            )}
            <span className="Article__Date">{getDate(article.pub_date)}</span>
          </div>
        </div>
      </a>
    </div>
  )
}
