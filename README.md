# Mexican Train Score Keeper 
Built as an experiment to see if I could create an app similar to one I created in Android Studio, but for HTML instead.
Since I didn't want to deploy on my own website I figured out how to deploy it using Vercel, and eventually as an experiment I'll do another
project with Github pages as the host.

Notes below were of special interest when I ran into problems that I found to be a bit challengins.

## Built using vercel's svelte template from vercel's website. 
from VS I ctrl-shift P then Cloned the git repo
ran npm install
ran npm run build

## Added Tailwind from the tailwind website.
Ran the npm run dev and it worked.
Comitted changes to GIT and checked  vercel for a build...
Failed due to a locked  pnpm-lock.yaml file so I changed
deployment settings (from Vecel website) over-riding initial pnpm install command with pnpm install --no-frozen-lockfile
then it worked .
## Started adding my modules using npm

@techstark/opencv-js and 
https://github.com/MarkDeLaFleur/simpleblobdetector loaded  just peachy and npm run dev was fine. techstark has also updated to current opencv 4.7 so this is now using that build.

so far so good but have the pnpm no-frozen-lockfile still in place

## replaced the src folder from dominocounter src file

rebuilt the svelte.config.js and vite.config.ts files and installed the
mkcert-vite-plugin in the root. Had to do that in order to use the camera for taking a capture of the dominos to count the pips.

tested the build for both dev and prod and so far so good.

or so I thought.... Vercel was failing again on errors with reference to path0 and resolving
the .svg icon files. Did some digging and found that you can't use the src= with .svg 
I had to modify the .svg files as .svelte files based on this info
https://stackoverflow.com/questions/66069647/best-way-to-import-svg-icons-into-a-svelte-app

The /source/roots/Table.svelte file now uses '$lib/sveteIcons/svg files
did the npm run dev and run build and it worked fine so I pushed to git
after the push vercel built the deployment without errors!

Initially when I built this project for android I used opencv for Java / Kotlin and utilize the simpleBlob detector. The javascript versions of opencv don't have simpleblobdetector but I found a gist that was built from opencv or javascript. I created  an npm package.

Later on when I found that the blobdetection function wasn't picking up the domino pips that well, I utilized the cv.minEnclosingCircle function 
which resulted in better pip detections. I left simpleblobdector in the modules folder though in case someone wanted to test it.

Now I just have to figure out how to add a 'demo' link so someone can see what the project does. 


