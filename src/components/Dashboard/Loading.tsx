import { useSession } from 'next-auth/react';
import { ReactNode } from "react";

interface AuthCheckProps {
  children?: ReactNode;
}

const Loading: React.FC<AuthCheckProps> = ({ children }) => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }

  return status === 'authenticated' ? <>{children}</> : null;
};

export default Loading;
