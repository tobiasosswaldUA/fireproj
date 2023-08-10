import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

let locales = ["en", "pt"];
let defaultLocale = "en";
// Get the preferred locale, similar to above or using a library
function getLocale(request: NextRequest) {
  let languages = new Negotiator({
    headers: {
      "accept-language": request.headers.get("accept-language") || "",
    },
  }).languages();
  return match(languages, locales, defaultLocale, { algorithm: "best fit" }); // -> 'en-US'
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url),
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!api|_next|.*\\..*).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
