import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server';


export const config = {
    matcher : ["/", "/requests"]
}

export default withAuth(async( req ) => {
    const token = req.nextauth.token;
    if(!token){
        return NextResponse.redirect(new URL('/login', req.url))
    }
    const { pathname } = req.nextUrl
    if (pathname === "/" || pathname === "/requests") {
      return NextResponse.redirect(new URL("/requests/pending", req.url));
    }
})