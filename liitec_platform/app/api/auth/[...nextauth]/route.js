import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import AuthService from "@/services/auth.service";


const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username_or_email: { label: "Username or Email", type: "text", placeholder: "jonh@doe.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize (credentials, req) {
                console.log(credentials);

                try {
                    const response = await AuthService.login(credentials.username_or_email, credentials.password);
                    if (response) {
                        return Promise.resolve(response);
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
    
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }