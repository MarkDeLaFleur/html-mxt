export const prerender = false;  //fuck it. if this doesn't work.
export const ssr = false;  //this is necessary to use the localStorage to save data and it 
// has to go in +layout.js not .svelte. otherwise you'll get these nasty errors about localStorage not found