import { screen, render, fireEvent, waitFor } from "@testing-library/react"
import Form from "./Form"
import user from "@testing-library/user-event"
import { rest } from "msw"
import { setupServer } from "msw/node"

function renderForm() {
  render(<Form />)
}
const server = setupServer(
  rest.get("/products", (req, res, ctx) => res(ctx.status(201)))
)

beforeAll(() => server.listen())

afterAll(() => server.close())

describe("when form is mounted", () => {
  it("there must be a create product form page", () => {
    renderForm()
    const formPage = screen.getByRole("heading", { name: /create product/i })
  })

  it("should exist the fields: name, size, type (electronic, furniture, clothing", () => {
    renderForm()

    const nameField = screen.getByRole("textbox", { name: /name/i })
    const sizeField = screen.getByRole("textbox", { name: /size/i })
    const typeField = screen.getByRole("combobox", { name: /type/i })

    const electronicOption = screen.getByRole("option", { name: /electronic/i })
    const furnitureOption = screen.getByRole("option", { name: /furniture/i })
    const clothingOption = screen.getByRole("option", { name: /clothing/i })
  })

  it("should exist the submit button", () => {
    renderForm()
    const submitButton = screen.getByRole("button", { name: /submit/i })
  })
})

describe("when the user submits the form without values", () => {
  it("should display validation messages", () => {
    renderForm()

    const helperTextName = screen.queryByText(/the name is required/i)
    const helperTextSize = screen.queryByText(/the size is required/i)
    const helperTextType = screen.queryByText(/the type is required/i)

    expect(helperTextName).not.toBeInTheDocument()
    expect(helperTextSize).not.toBeInTheDocument()
    expect(helperTextType).not.toBeInTheDocument()

    const submitButton = screen.getByRole("button", { name: /submit/i })
    user.click(submitButton)

    expect(screen.getByText(/the name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/the size is required/i)).toBeInTheDocument()
    expect(screen.getByText(/the type is required/i)).toBeInTheDocument()
  })
})

describe("when the user blurs and empty field", () => {
  it("should display a validation error message", () => {
    renderForm()

    const helperTextName = screen.queryByText(/the name is required/i)
    const helperTextSize = screen.queryByText(/the size is required/i)

    expect(helperTextName).not.toBeInTheDocument()
    expect(helperTextSize).not.toBeInTheDocument()

    const nameField = screen.getByRole("textbox", { name: /name/i })
    const sizeField = screen.getByRole("textbox", { name: /size/i })

    fireEvent.blur(nameField, { target: { name: "name", value: "" } })
    fireEvent.blur(sizeField, { target: { name: "size", value: "" } })

    expect(screen.getByText(/the name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/the size is required/i)).toBeInTheDocument()
  })
})

describe("when the user submits the form", () => {
  it("the submit button should be disabled until the request is done", async () => {
    renderForm()

    const submitButton = screen.getByRole("button", { name: /submit/i })
    expect(submitButton).not.toBeDisabled()

    user.click(submitButton)
    expect(submitButton).toBeDisabled()

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled()
    })
  })
})
