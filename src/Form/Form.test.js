import { screen, render } from "@testing-library/react"
import Form from "./Form"

describe("when form is mounted", () => {
  it("there must be a create product form page", () => {
    render(<Form />)
  })
  expect(screen.getByText(/create product/)).toBeInTheDocument()
  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.debug()
})
