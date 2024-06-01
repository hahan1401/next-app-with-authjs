import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const middleware = auth((req) => {
	const requestHeaders = new Headers(req.headers);
  console.log('~~~~~~~~~~~~~~~~~~~~', req.auth);
	try {
		return NextResponse.next({
			request: {
				headers: requestHeaders
			}
		});
    } catch (err) {
		return NextResponse.redirect(new URL('/', req.url));
	}
});

export const config = {
	matcher: [
		'/',
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	]
};
