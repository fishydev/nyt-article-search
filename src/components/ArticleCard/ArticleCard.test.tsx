import React from "react"
import { screen, render } from "@testing-library/react"
import { ArticleCard } from "./ArticleCard"
import { Article } from "../../types"

describe("ArticleCard", () => {
  const article: Article = {
    web_url:
      "https://www.nytimes.com/2023/06/09/opinion/trump-indictment-evidence.html",
    headline: {
      main: "Headline of the article",
      kicker: "David French",
    },
    snippet:
      "The available evidence supports the indictment by the special counsel Jack Smith.",
    multimedia: [
      {
        url: "images/2023/06/08/opinion/08frenchnew/08frenchnew-largeHorizontal375.jpg",
        subtype: "largeHorizontal375",
      },
    ],
    byline: {
      original: "John Doe",
      person: [
        { firstname: "John", middlename: "", lastname: "Doe", rank: 1 },
        { firstname: "Jane", middlename: "", lastname: "Doe", rank: 2 },
      ],
    },
    pub_date: "2023-06-09T04:50:51+0000",
    section_name: "Opinion",
  }

  it("renders the article with the correct data", () => {
    render(<ArticleCard article={article} />)

    expect(screen.getByText("Opinion")).toBeInTheDocument()
    expect(screen.getByText("Headline of the article")).toBeInTheDocument()
    expect(screen.getByText("John Doe")).toBeInTheDocument()
    expect(screen.getByText("09-06-2023")).toBeInTheDocument()
    expect(screen.getByAltText("Headline of the article")).toHaveAttribute(
      "src",
      "https://www.nytimes.com/images/2023/06/08/opinion/08frenchnew/08frenchnew-largeHorizontal375.jpg"
    )
  })

  it("only renders the author name element if the data has it", () => {
    const articleWithNoAuthor: Article = {
      ...article,
      byline: { ...article.byline, person: [] },
    }
    render(<ArticleCard article={articleWithNoAuthor} />)
    expect(screen.queryByTestId("article-author")).not.toBeInTheDocument()
  })

  it("renders a placeholder image for news with no multimedia", () => {
    const articleWithNoMedia: Article = { ...article, multimedia: [] }
    render(<ArticleCard article={articleWithNoMedia} />)
    expect(screen.getByTestId("no-image-placeholder")).toBeInTheDocument()
  })
})
