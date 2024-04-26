import { NextResponse } from "next/server";


export function middleware(request) {

    // Step pertama: cek url
    // Kalo dia di halaman login / api login, tidak perlu accessToken

    const loginPath = ["/login", "/api/login"]
    if(loginPath.some((v) => v === request.nextUrl.pathname)) {
        return NextResponse.next();
    } else {
        // Butuh Access Token
        const accessToken = request.cookies.get("accessToken");

        if(accessToken) {
            // Boleh hit API atau Masuk ke halaman (Authenticated)
            return NextResponse.next();
        } else {
            // Unauthenticated dan redirect ke halaman login
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }
}

// matcher: ["/login", "/api/:function*", "/todos/:function*", "/"]
export const config = {
    matcher: ["/login", "/api/:function*", "/", "/todos/:function*", "/api/todos/uploads"]
}