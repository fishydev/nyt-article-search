import React, { useState } from "react"
import "./Search.sass"
import { MdSearch, MdDateRange } from "react-icons/md"
import { InputHTMLAttributes } from "react-day-picker"
import { SearchArticlesParams } from "../../api/article"

type SearchProps = {
  onChangeQuery: (e: React.FormEvent<HTMLInputElement>) => void
}

export const Search = (props: SearchProps) => {
  const { onChangeQuery } = props

  return (
    <div className="Search">
      <span className="Search__Wrapper">
        <span className="Search__SearchIcon">
          <MdSearch />
        </span>
        <input className="Search__Input" type="text" onChange={onChangeQuery} />
        <button className="Search__Filter">
          <MdDateRange />
        </button>
      </span>
    </div>
  )
}
