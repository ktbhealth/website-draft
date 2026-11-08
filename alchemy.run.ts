import * as Alchemy from "alchemy";
import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Effect from "effect/Effect";

export default Alchemy.Stack(
  "ktb-landing",
  {
    providers: Cloudflare.providers(),
    state: Cloudflare.state(),
  },
  Effect.gen(function* () {
    // Resource names kept identical to the monorepo deployment so
    // `alchemy deploy` updates the existing site in place.
    const site = yield* Cloudflare.Website.StaticSite("draft-landing", {
      command: "bun run build",
      outdir: "dist/client",
    });

    return { url: site.url };
  }),
);
