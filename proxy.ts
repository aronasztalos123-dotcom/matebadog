import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n/config";

/**
 * Hungarian (the original language) is served on the unprefixed URLs,
 * the translations under /en, /de and /sk.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, first] = pathname.split("/");

  // /hu/... → canonical unprefixed URL
  if (first === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if ((locales as readonly string[]).includes(first)) return;

  // Unprefixed URL → serve the Hungarian version internally
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next.js internals and any path with a file extension (favicon, sitemap.xml, robots.txt, …)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
