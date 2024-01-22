import React, { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

interface VerifyTenantSubscriptionExpirationProps {
  children: ReactNode;
}

const VerifyTenantSubscriptionExpiration: React.FC<VerifyTenantSubscriptionExpirationProps> = ({ children }) => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user.type != 'Admin' && session.user.subscription_status != 'active') {
      const expirationDate = new Date(session.user.expiration_date);
      const currentDate = new Date();

      if (expirationDate < currentDate || session.user.subscription_status != 'active') {
        toast.error('Necessário realizar a renovação de sua assinatura.');
        router.push('/store/subscription-plans/list');
      }
    }
  }, [session, router]);

  return <>{children}</>;
};

export default VerifyTenantSubscriptionExpiration;