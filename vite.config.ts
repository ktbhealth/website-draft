import { defineConfig } from "vite-plus";

export default defineConfig({
	fmt: {
		useTabs: true,
		ignorePatterns: [
			"**/routeTree.gen.ts",
			"**/worker-configuration.d.ts",
			"**/.alchemy/**",
			// Vendored agent skill configs (installed from skills-lock.json), not app code.
			".agents/**",
			".claude/**",
			"skills-lock.json",
		],
	},
});
