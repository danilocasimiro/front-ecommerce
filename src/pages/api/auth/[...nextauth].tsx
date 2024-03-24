import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

interface MenuItem {
  id: string;
  company: number;
  icon: string;
  label: string;
  link: string;
  parent_id: string;
}

interface ApiUser {
  id: string,
  email_address: string,
  name: string,
  type: string,
  jwt_token: string,
  expiration_date: string,
  company_id: string | null,
  company_name: string | null,
  subscription_status: string | null,
  friendly_id: string,
  menu: MenuItem[]
}

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email_address: {
          label: "Email",
          type: "text",
          placeholder: "johndoe@test.com",
        },
        name: {
          label: "Name",
          type: "text",
          placeholder: "john doe",
        },
        type: {
          type: "text"
        },
        jwt_token: {
          type: "text"
        },
        friendly_id: {
          type: "text"
        },
        id: {
          type: "text"
        },
        expiration_date: {
          type: "text"
        },
        subscription_status: {
          type: "text"
        },
        company_id: {
          type: "text"
        },
        company_name: {
          type: "text"
        },
        menu: {
          type: "text"
        },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }
        const parsedMenu: MenuItem[] = JSON.parse(credentials.menu);
        const user: ApiUser = {
          id: credentials.id,
          email_address: credentials.email_address,
          name: credentials.name,
          type: credentials.type,
          jwt_token: credentials.jwt_token,
          company_id: credentials.company_id,
          subscription_status: credentials.subscription_status,
          expiration_date: credentials.expiration_date,
          company_name: credentials.company_name,
          friendly_id: credentials.friendly_id,
          menu: parsedMenu,
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = user.jwt_token
        token.type = user.type
        token.id = user.id
        token.friendly_id = user.friendly_id
        token.expiration_date = user.expiration_date
        token.subscription_status = user.subscription_status
        token.company_id = user.company_id
        token.company_name = user.company_name
        token.menu = user.menu
      }

      return token
    },
    async session({ session, token, user }) {
      session.token = token.accessToken
      session.user.type = token.type
      session.user.id = token.id
      session.user.friendly_id = token.friendly_id
      session.user.expiration_date = token.expiration_date
      session.user.subscription_status = token.subscription_status
      session.user.company_id = token.company_id
      session.user.company_name = token.company_name
      session.user.menu = token.menu
      return session
    }
  },
  secret: "test"
});