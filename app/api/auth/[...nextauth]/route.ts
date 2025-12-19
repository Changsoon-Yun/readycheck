import NextAuth, { NextAuthOptions } from 'next-auth';
import BattleNetProvider, { BattleNetIssuer } from 'next-auth/providers/battlenet';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    BattleNetProvider({
      clientId: process.env.BATTLENET_CLIENT_ID!,
      clientSecret: process.env.BATTLENET_CLIENT_SECRET!,
      issuer: process.env.BATTLENET_ISSUER as BattleNetIssuer,

      checks: ['state', 'nonce'],
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
  cookies: {
    sessionToken: {
      name: `readycheck__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },

  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === 'battlenet') {
        console.log('from jwt', { account, token });
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('from session', { session, token });
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
