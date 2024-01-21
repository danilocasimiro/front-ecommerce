import { signIn } from "next-auth/react";
import { api } from "./axios";

interface LoginForm {
  email_address: string,
  password: string
}

export default async function Login({ email_address, password }: LoginForm) {
  await api.post('/authenticate',
  {
    email_address,
    password
  },
  )
  .then((response) => { 
    const decodedToken = JSON.parse(atob(response.data.split('.')[1]));

    signIn("credentials", { 
      callbackUrl: '/dashboard', 
      jwt_token: response.data, 
      email_address: decodedToken.user.email_address,
      name: decodedToken.user.name,
      type: decodedToken.user.type,
      company_name: '',
      company_id: '',
      subscription_status: decodedToken.user.subscription_status,
      expiration_date: decodedToken.user.expiration_date,
      id: decodedToken.user.id,
      friendly_id: decodedToken.user.friendly_id,
    } )

    return response
  }).catch(error => {
    console.error('Erro:', error);
  });
}
