import {
	createRootRoute,
	HeadContent,
	Scripts,
	type ErrorComponentProps,
} from "@tanstack/react-router";
import { BookPlusIcon, BookXIcon, TriangleAlertIcon } from "lucide-react";
import * as m from "#/paraglide/messages.js";
import { getLocale, locales, setLocale, toLocale } from "#/paraglide/runtime.js";
import { buttonVariants } from "@ktbhealth/ui/components/button";
import { LanguageToggle } from "@ktbhealth/ui/components/language-toggle";
import appCss from "../styles.css?url";

const REPO_URL = "https://github.com/ktbhealth/product";

// Canonical origin for og:url / canonical / og:image. Override with
// VITE_SITE_URL once a stable domain is assigned — the workers.dev
// hostname embeds a per-deploy hash and may rotate.
const SITE_URL =
	import.meta.env.VITE_SITE_URL ??
	"https://ktb-landing-draft-landing-prod-bmaduimiynqekj6u.ktbhealth.workers.dev";
const OG_IMAGE = `${SITE_URL}/og.png`;

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: m.meta_title() },
			{ name: "description", content: m.meta_description() },
			{ property: "og:type", content: "website" },
			{ property: "og:url", content: SITE_URL },
			{ property: "og:title", content: m.meta_title() },
			{ property: "og:description", content: m.meta_description() },
			{ property: "og:image", content: OG_IMAGE },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: m.meta_title() },
			{ name: "twitter:description", content: m.meta_description() },
			{ name: "twitter:image", content: OG_IMAGE },
			{ name: "theme-color", content: "#5d87c8" },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
			{ rel: "canonical", href: SITE_URL },
		],
	}),
	notFoundComponent: NotFound,
	errorComponent: ErrorFallback,
	shellComponent: RootDocument,
});

function NotFound() {
	return (
		<main className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center sm:py-32">
			<p className="text-7xl font-extrabold tracking-tighter text-primary sm:text-8xl">404</p>
			<div className="mt-8 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
				<BookXIcon className="size-7" />
			</div>
			<h1 className="mt-6 text-2xl font-bold tracking-tight">{m.not_found_title()}</h1>
			<p className="mt-3 max-w-md text-muted-foreground">{m.not_found_body()}</p>
			<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
				<a href="/" className={buttonVariants({ variant: "default", size: "lg" })}>
					{m.not_found_cta()}
				</a>
				<a
					href={REPO_URL}
					target="_blank"
					rel="noreferrer"
					className={buttonVariants({ variant: "outline", size: "lg" })}
				>
					{m.hero_cta_primary()}
				</a>
			</div>
		</main>
	);
}

function ErrorFallback({ reset }: ErrorComponentProps) {
	return (
		<main className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center sm:py-32">
			<div className="flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
				<TriangleAlertIcon className="size-7" />
			</div>
			<h1 className="mt-6 text-2xl font-bold tracking-tight">{m.error_title()}</h1>
			<p className="mt-3 max-w-md text-muted-foreground">{m.error_body()}</p>
			<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
				<button
					type="button"
					onClick={reset}
					className={buttonVariants({ variant: "default", size: "lg" })}
				>
					{m.error_retry()}
				</button>
				<a href="/" className={buttonVariants({ variant: "outline", size: "lg" })}>
					{m.not_found_cta()}
				</a>
			</div>
		</main>
	);
}

const LOCALE_NAME: Record<string, string> = {
	en: "English",
	"pt-BR": "Português",
	es: "Español",
};

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang={getLocale()}>
			<head>
				<HeadContent />
			</head>
			<body className="min-h-screen bg-background text-foreground antialiased">
				<header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
					<nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
						<a href="/" className="flex items-center gap-2.5">
							<span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
								<BookPlusIcon className="size-5" />
							</span>
							<span className="text-lg font-bold tracking-tight">{m.nav_brand()}</span>
						</a>
						<div className="flex items-center gap-1.5">
							<a
								href="#how"
								className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
							>
								{m.nav_how()}
							</a>
							<a
								href="#principles"
								className="hidden rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground sm:block"
							>
								{m.nav_principles()}
							</a>
							<a
								href="#vision"
								className="hidden rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground sm:block"
							>
								{m.nav_vision()}
							</a>
							<a
								href="https://github.com/ktbhealth/product"
								target="_blank"
								rel="noreferrer"
								className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
							>
								{m.nav_repo()}
							</a>
							<LanguageToggle
								className="ml-2"
								locales={locales}
								value={getLocale()}
								onValueChange={(locale) => {
									const resolved = toLocale(locale);
									if (resolved) setLocale(resolved);
								}}
								labels={LOCALE_NAME}
								label={m.lang_toggle_label()}
							/>
						</div>
					</nav>
				</header>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
