import * as yup from "yup"

export const renameDeckYupSchema = yup.object({
  deckName: yup
    .string()
    .min(5, "Name must be at least 5 characters long")
    .max(40, "Name must be at most 40 characters long")
    .required("Name is required"),
})
