import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(            
		{fallback: null,
			strict: false
		}),
		paths:{		base: process.env.NODE_ENV === "production" ?  '/html-mxt' : '',
					asset: process.env.NODE_ENV === "production" ? '/html-mxt' : ''},
		
	},
	
	preprocess: [
		vitePreprocess({
		  postcss: true,
		}),
	  ],

}

export default config;
