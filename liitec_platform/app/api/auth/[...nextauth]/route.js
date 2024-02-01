import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { login } from '@/lib/auth.actions';



export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username_or_email: { label: "Username or Email", type: "text", placeholder: "jonh@doe.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize (credentials, req) {
                try {
                    const user = await login(credentials.username_or_email, credentials.password);
                    if (user) {
                        return user;
                    } 
                } catch (error) {
                    const err = error.response.data.error;

                    throw new Error(err);
                }
            }
        })
    ],
    secret: process.env.SECRET,
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async jwt({ token, user, trigger, session }) {

            if (trigger === 'update') {
                return {...token , ...session.user};
            }

            if (user) {
                token = user;
            }
            return token;
        },
        async session({ session, token }) {
          session.user = token;
          return session;
        },
    },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }