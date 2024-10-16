import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials';
import prisma from './lib/prisma';
import bcryptjs from "bcryptjs";

export const {
    handlers,
    auth,
    signIn,
    signOut
} = NextAuth({
    // secret: process.env.NEXTAUTH_SECRET
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string }
                });

                if (!user) {
                    return null;
                }

                const passwordMatch = await bcryptjs.compare(credentials.password as string, user.password as string);

                if (!passwordMatch) {
                    return null;
                }

                return {
                    id: user.userId,
                    email: user.email,
                    name: user.name,
                    username: user.username,
                    image: user.image,
                };
            }
        })
    ],
    callbacks: {
        authorized({ request: { nextUrl }, auth }) {
            const isLoggedIn = !!auth?.user;
            const { pathname } = nextUrl;
            
            if (pathname.startsWith("/signin") && isLoggedIn) {
                return Response.redirect(new URL("/", nextUrl));
            }
            
            if (!isLoggedIn && pathname !== "/signin") {
                return Response.redirect(new URL("/signin", nextUrl));
            }
            
            return isLoggedIn;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.username = user.username;
                token.image = user.image;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.username = token.username as string;
                session.user.image = token.image as string;
            }
            return session;
        },
    },
})

