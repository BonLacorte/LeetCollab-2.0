import { NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt"
import { NextRequest } from 'next/server'

export default async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    const { pathname } = req.nextUrl

    // Allow requests to /sign-in and /sign-up
    if (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')) {
        return NextResponse.next()
    }

    // Redirect unauthenticated users to /sign-in
    if (!token) {
        const signInUrl = new URL('/sign-in', req.url)
        signInUrl.searchParams.set('callbackUrl', encodeURI(req.url))
        return NextResponse.redirect(signInUrl)
    }

    // Allow authenticated requests
    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}