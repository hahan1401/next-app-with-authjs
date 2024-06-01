import { auth } from "@/auth";
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

export const LOCALES = ['en-AU'];

const intlMiddleware = createMiddleware({
	locales: LOCALES,
	localePrefix: 'as-needed',
	defaultLocale: 'en-AU',
});

export const middleware = auth((req) => {
	const requestHeaders = new Headers(req.headers);
  console.log('~~~~~~~~~~~~~~~~~~~~', req.auth);
	try {
		return intlMiddleware(req)
    } catch (err) {
		return NextResponse.redirect(new URL('/', req.url));
	}
});

export const config = {
	matcher: ['/((?!api|_next|.*\\..*).*)'],
};
