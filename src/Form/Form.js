import React, { useState } from "react"
import TextField from "@mui/material/TextField"
import InputLabel from "@mui/material/InputLabel"
import NativeSelect from "@mui/material/NativeSelect"
import Button from "@mui/material/Button"

function Form() {
  const [isSaving, setIsSaving] = useState(false)
  const [formErrors, setFormErrors] = useState({
    name: "",
    size: "",
    type: "",
  })

  async function handleSubmit(e) {
    e.preventDefault()

    setIsSaving(true)

    const { name, size, type } = e.target.elements

    if (!name.value) {
      setFormErrors((prevState) => ({
        ...prevState,
        name: "The name is required",
      }))
    }
    if (!size.value) {
      setFormErrors((prevState) => ({
        ...prevState,
        size: "The size is required",
      }))
    }
    if (!type.value) {
      setFormErrors((prevState) => ({
        ...prevState,
        type: "The type is required",
      }))
    }

    await fetch("/products", {
      method: "POST",
      body: JSON.stringify({}),
    })

    setIsSaving(false)
  }

  function handleBlur(e) {
    const { name, value } = e.target
    setFormErrors({
      ...formErrors,
      [name]: value.length > 0 ? "" : `The ${name} is required`,
    })
  }

  return (
    <>
      <h1>create product</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="name"
          id="name"
          name="name"
          helperText={formErrors.name}
          onBlur={handleBlur}
        ></TextField>
        <TextField
          label="size"
          id="size"
          name="size"
          helperText={formErrors.size}
          onBlur={handleBlur}
        ></TextField>
        <InputLabel htmlFor="type">type</InputLabel>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: "",
            id: "type",
          }}
        >
          <option aria-label="None" value=""></option>
          <option value="electronic">Electronic</option>
          <option value="furniture">Furniture</option>
          <option value="clothing">Clothing</option>
        </NativeSelect>
        {formErrors.type.length > 0 && <span>{formErrors.type}</span>}

        <Button type="submit" disabled={isSaving}>
          Submit
        </Button>
      </form>
    </>
  )
}

export default Form
