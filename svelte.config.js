import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';


const http = 'https://MarkDeLaFleur.github.io/html-mxt/';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(            
		{fallback: null,
			strict: false
		}),
	},
	paths:{		base: process.argv.includes('dev') ? '' : `${http}`},
	preprocess: [
		vitePreprocess({
		  postcss: true,
		}),
	  ],

}

export default config;
