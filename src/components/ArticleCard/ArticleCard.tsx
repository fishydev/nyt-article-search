import React from "react"
import "./ArticleCard.sass"
import { Article, Multimedia } from "../../types"
import dayjs from "dayjs"
import { Person } from "../../types/article"
import { MdNoPhotography } from "react-icons/md"

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

  const getAuthor = (author: Person) => {
    return [author.firstname, author.middlename, author.lastname].join(" ")
  }

  return (
    <div className="Article">
      <a
        href={article.web_url}
        target="_blank"
        className="Article__Wrapper"
        rel="noreferrer"
      >
        {article.multimedia.length === 0 && (
          <div className="Article__Image-placeholder">
            <MdNoPhotography />
          </div>
        )}
        {article.multimedia.length > 0 && (
          <picture>
            <source media="(min-width: 720px)" srcSet={findMedia("blog533")} />
            <source
              media="(min-width: 1024px)"
              srcSet={findMedia("largeWidescreen573")}
            />
            <img
              className="Article__Image"
              src={findMedia("largeHorizontal375")}
              alt=""
            />
          </picture>
        )}
        {/* <img
          className="Article__Image"
          src={findMedia("largeHorizontal375")}
          alt=""
        /> */}
        <div className="Article__Info">
          <div className="Article__Detail">
            <h4 className="Article__Section">{article.section_name}</h4>
            <h3 className="Article__Title">{article.headline.main}</h3>
          </div>
          <div className="Article__Metadata">
            {article.byline.person.length > 0 && (
              <span className="Article__Author">
                {getAuthor(article.byline.person[0])}
              </span>
            )}
            <span className="Article__Date">{getDate(article.pub_date)}</span>
          </div>
        </div>
      </a>
    </div>
  )
}
