import React, { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import ApiService from '@/services/ApiService';

interface MaintenanceExpirationProps {
  children: ReactNode;
  session: any;
}

const Maintenance: React.FC<MaintenanceExpirationProps> = ({ children }) => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const verify = async () => {
      const apiService = new ApiService(session!.token);
      try {
        const response = await apiService.systemIsMaintenceMode();
        
        if (response.data == true && session!.user.type != 'Admin' &&  window.location.pathname != '/login') {
          await signOut({ redirect: false }).then(() => {
            router.push('/maintenance');
          });
        }
      } catch (error: any) {
        toast.error(error.response?.data?.error || 'Erro desconhecido');
      }
    };

    if (session && window.location.pathname != '/maintenance') {
      verify();
    }
  }, [session, router]);

  return <>{children}</>;
};

export default Maintenance;