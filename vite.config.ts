import { defineConfig } from "vite-plus";

export default defineConfig({
	fmt: {
		useTabs: true,
		ignorePatterns: ["**/routeTree.gen.ts", "**/worker-configuration.d.ts", "**/.alchemy/**"],
	},
});
