import Head from 'next/head'
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import RegistrationForm from '@/components/Forms/RegistrationForm';


export default function Registration() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    router.push('/dashboard');
  }

  return (
    <>
      <Head>
        <title>Registro - Your Search </title>
      </Head>

      <RegistrationForm />
    </>
  )
}