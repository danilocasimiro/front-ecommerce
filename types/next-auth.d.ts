// types/next-auth.d.ts

import { Session } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    token: string,
    user: User
  }

  interface User {
    id: string;
    name: string;
    email_address: string;
    type: string;
    expiration_date: string;
    company_id: string | null;
    company_name: string | null;
    subscription_status: string | null;
    jwt_token: string;
    friendly_id: string;
  }
}