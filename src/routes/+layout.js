export const prerender = true;
export const ssr = false;  //this is necessary to use the localStorage to save data and it 
// has to go in +layour.js not .svelte. otherwise you'll get these nasty errors about localStorage not found