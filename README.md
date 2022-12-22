# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.


## Built using vercel's svelte template from vercel's website. 
from VS I ctrl-shift P then Cloned the git repo
ran npm install
ran npm run build

## Added Tailwind from the tailwind website.
Ran the npm run dev and it worked.
Comitted changes to GIT and checked checked vercel for a build...
Failed due to a locked  pnpm-lock.yaml file so I changed
deployment settings (from Vecel website) over riding initial pnpm install command with pnpm install --no-frozen-lockfile
then it worked .
## Started adding my modules using npm

@techstark/opencv-js and 
https://github.com/MarkDeLaFleur/simpleblobdetector loaded  just peachy and npm run dev was fine.

so far so good but have the pnpm no-frozen-lockfile still in place

## replaced the src folder from dominocounter src file

rebuilt the svelte.config.js and vite.config.ts files and installed the
mkcert-vite-plugin in the root.

tested the build for both dev and prod and so far so good.

or so I thought.... Vercel was failing again on errors with reference to path0 and resolving
the .svg icon files. Did some digging and found that you can't use the src= with .svg 
I had to modify the .svg files as .svelte files based on this info
https://stackoverflow.com/questions/66069647/best-way-to-import-svg-icons-into-a-svelte-app
The /source/roots/Table.svelte file now uses '$lib/sveteIcons/svg files
did the npm run dev and run build and it worked fine so I pushed to git
after the push vercel built the deployment without errors!


