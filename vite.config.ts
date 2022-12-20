import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';

import {defineConfig} from'vite'


const config: UserConfig = {
	plugins: [sveltekit(),mkcert()],
	server: {https:true}

	
};
export default defineConfig({
	server: {
		https: true
	  },
	  
 
  plugins: [mkcert(),sveltekit()]
});

