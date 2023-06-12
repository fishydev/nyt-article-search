import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import { Search } from "./Search"

describe("Search", () => {
  const onChangeQueryMock = jest.fn()

  it("calls onChangeQuery function on input change", () => {
    render(<Search onChangeQuery={onChangeQueryMock} />)
    const input = screen.getByRole("textbox")

    fireEvent.change(input, { target: { value: "example query" } })

    expect(onChangeQueryMock).toHaveBeenCalledTimes(1)
    expect(onChangeQueryMock).toHaveBeenCalledWith(expect.any(Object))
  })
})
