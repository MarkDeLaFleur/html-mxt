<script>
import "../app.css";
import { page } from '$app/stores';
import { mxTLogo } from "$lib/myFunctions/mxTLogo.js";
let showMenu = false;

function toggleNavbar() {
  showMenu = !showMenu;
}
</script>
<header class="bg-slate-400">
<div>
  <div  class="container px-4 md:px-0 mx-auto w-full h-13 flex justify-between">
    <a  href="/">
       {@html mxTLogo} 

  </a>    
    <nav>
      
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div on:click={toggleNavbar} class="flex justify-between md:hidden">
        <button
          type="button"
          class="text-gray-800 hover:text-gray-400 focus:outline-none focus:text-gray-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
         </svg>
        </button>

  
      </div>
      

    <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
  

    <div
      class="flex-col  space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-5 md:mt-1
       {showMenu ? 'flex' : 'hidden'} bg-slate-400 px-5 py-5"
    >
      <a class=" text-gray-800 hover:text-white" href="/#">Home</a>
      <a class="text-gray-800 hover:text-white" href="/Scoring" data-sveltekit-preload-data="tap">Enter Scores</a>
      <a class="text-gray-800 hover:text-white" href="/newGame" data-sveltekit-preload-data="tap" >New Game</a>
      <a class="text-gray-800 hover:text-white" href="/Settings">Settings</a>
      <a class="text-gray-800 hover:text-white" href="/About" data-sveltekit-preload-data="tap">About MxT</a>
     
    </div>
  </nav>
</div>
</div>

</header>
    

<slot></slot>