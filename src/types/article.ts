export type ArticleSearchResponse = {
  status: string
  copyright: string
  response: {
    docs: Article[]
  }
}

export type Article = {
  web_url: string
  snippet: string
  multimedia: Multimedia[]
  headline: {
    main: string
    kicker: string
  }
  byline: {
    original: string
    person: Person[]
  }
  pub_date: string
  section_name: string
}

export type Multimedia = {
  subtype: string
  url: string
}

export type Person = {
  firstname: string
  middlename: string
  lastname: string
  rank: number
}
