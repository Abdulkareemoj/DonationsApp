import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			$lib: './src/lib',
			$server: './src/server',
			$utils: './src/lib/utils',
			$ui: './src/lib/components/ui',
			$hooks: './src/lib/hooks',
			$stores: './src/lib/stores'
		}
	}
};

export default config;
