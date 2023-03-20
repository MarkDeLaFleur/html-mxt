<script>
 import "../app.css";
 import { page } from '$app/stores';
	import { mxTLogo } from "$lib/myFunctions/mxTLogo.js";
 
 
  </script>
 
<div class="max-w-2xl mx-auto">
   {@html mxTLogo}
<nav class="border-gray-200 px-2 mb-10">
  <div class="container mx-auto flex flex-wrap items-start justify-between">
  <a href="#/" class="flex">
     
      <span class="self-start text-lg font-semibold whitespace-nowrap"></span>
  </a>
  <div class="flex md:order-2">

        
     <button data-collapse-toggle="mobile-menu-3" type="button" class="md:hidden text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center" aria-controls="mobile-menu-3" aria-expanded="false">
      <span class="sr-only">Open main menu</span>
      <span class="sr-only">Open main menu</span>
      <span class="sr-only">Open main menu</span>
      
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      <svg class=" w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
  </div>
  <div class="flex justify-between items-start  w-auto order-1" id="mobile-menu-3">
      
    <ul class=" flex-row flex space-x-8 mt-4  text-sm font-medium">
 
      <li class:active={$page.url.pathname === '/'}>
        <a href="/" class="bg-blue-700 md:bg-transparent text-white block pl-3 pr-4 py-2 md:text-blue-700 md:p-0 rounded" aria-current="page">Back to Main</a>
      </li>
      
      
    </ul>
  </div>
  </div>
</nav>
</div>
<body>
  <h1 class="text-base text-blue-400 underline  ml-5">
    Mexican Train Domino Counter and Score Keeper</h1>
<p> <br>  </p>
</body>

<slot></slot>