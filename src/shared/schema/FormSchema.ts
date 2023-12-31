import * as yup from "yup";

export const validationSchemeLogin = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(6).max(32),
});

export const validationSchemeRegister = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(6).max(32),
  confirmation_password: yup.string().required().min(6).max(32),
});

export const validationSchemaFormBooks = yup.object({
  isbn: yup.string().required(),
  title: yup.string().required(),
  subtitle: yup.string(),
  author: yup.string().required(),
  published: yup.string().required(),
  publisher: yup.string().required(),
  pages: yup.number().integer(),
  description: yup.string(),
  website: yup.string(),
});
