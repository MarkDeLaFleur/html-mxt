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


Build using vercels svelte template. 
Cloned the git repo
ran npm install
ran npm run build

next I used the tailwind reference for adding tailwind to svelte 
and ran the npm run dev and it worked.
and did a commit to git and checked vercel for a build...
if failed due to a locked  pnpm-lock.yaml file so I changed
deployment settings over riding initial pnpm install command with pnpm install --no-frozen-lockfile
then it worked ( shit, it always something.)
next I'll add my simple blob detector to modules and see what that fucks up.
@techstark/opencv-js and simpleblobdetector loaded  just peachy and npm run dev was fine.
going to commit again.

so far so good but have the pnpm no-frozen-lockfile still in place

took all the src folder and replaced it with the dominocounter src file
rebuild the svelte.config.js and vite.config.ts files and installed the
mkcert-vite-plugin.
tested the build for both dev and prod an so far so good.
commiting to git fingers crossed.

