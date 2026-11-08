import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { BookPlusIcon } from "lucide-react";
import * as m from "#/paraglide/messages.js";
import { getLocale, locales, setLocale, toLocale } from "#/paraglide/runtime.js";
import { LanguageToggle } from "@ktbhealth/ui/components/language-toggle";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: m.meta_title() },
			{ name: "description", content: m.meta_description() },
		],
		links: [{ rel: "stylesheet", href: appCss }],
	}),
	shellComponent: RootDocument,
});

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
						<a href="#" className="flex items-center gap-2.5">
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
								href="https://github.com/ktbhealth/ktbhealth"
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
