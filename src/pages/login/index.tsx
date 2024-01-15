import Head from 'next/head'
import LoginForm from '../../components/Forms/LoginForm'
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";


export default function Signin() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    router.push('/dashboard');
  }

  return (
    <>
      <Head>
        <title>Login - Your Search </title>
      </Head>

      <LoginForm />
    </>
  )
}