import { baseLocale, cookieName, toLocale, type Locale } from "#/paraglide/runtime.js";

/**
 * Extract the paraglide locale cookie from a raw `Cookie` header value.
 * Returns undefined when absent or not a known locale (en, pt-BR, es).
 */
export function localeFromCookieHeader(header: string | null): Locale | undefined {
	if (!header) return undefined;
	const match = header.match(new RegExp(`(?:^|;\\s*)${cookieName}=([^;]*)`));
	const value = match?.[1];
	return toLocale(value);
}

/** Locale for an incoming request: cookie first, then the base locale. */
export function requestLocale(request: Request): Locale {
	return localeFromCookieHeader(request.headers.get("cookie")) ?? baseLocale;
}
