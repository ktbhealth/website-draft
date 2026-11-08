import * as Alchemy from "alchemy";
import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Effect from "effect/Effect";
import { deployWorker } from "@ktb/infra-cloudflare";

export default Alchemy.Stack(
	"ktb-landing",
	{
		providers: Cloudflare.providers(),
		state: Cloudflare.state(),
	},
	Effect.gen(function* () {
		// Resource names kept identical to the monorepo deployment so
		// `alchemy deploy` updates the existing site in place.
		const site = yield* deployWorker({
			name: "draft-landing",
			outdir: "apps/landing/dist/client",
			main: "apps/landing/dist/server/index.js",
			bundle: false,
			compatibilityFlags: ["nodejs_compat"],
		});

		return { url: site.url };
	}),
);
