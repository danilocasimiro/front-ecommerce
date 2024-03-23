import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactNode } from "react";

interface AuthCheckProps {
  children?: ReactNode;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return children;
  }

  if (!session) {
    router.push('/login');

    return null;
  }

  return <>{children}</>;
};

export default AuthCheck;