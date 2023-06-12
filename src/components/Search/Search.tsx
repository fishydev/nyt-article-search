import React from "react"
import "./Search.sass"
import { MdSearch } from "react-icons/md"

type SearchProps = {
  onChangeQuery: (e: React.FormEvent<HTMLInputElement>) => void
}

export const Search = (props: SearchProps) => {
  const { onChangeQuery } = props

  return (
    <div className="Search">
      <span className="Search__Wrapper">
        <span>
          <MdSearch className="Search__Icon" />
        </span>
        <input
          className="Search__Input"
          type="text"
          name="query-input"
          onChange={onChangeQuery}
          placeholder="Search here..."
        />
      </span>
    </div>
  )
}
