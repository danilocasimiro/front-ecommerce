import { api } from "./axios";

interface LoginForm {
  email_address: string,
  password: string
}

export default async function Login({ email_address, password }: LoginForm) {
  return await api.post('/authenticate',
  {
    email_address,
    password
  },
  )
}
