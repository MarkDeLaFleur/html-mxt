<script Lang ts>
  import { videoSettings } from '$lib/myFunctions/VideoStore';
  import UserMediaDetector from '$lib/myFunctions/userMediaDetector';
  export let selected = 0;
  export let selectedFPS = 0;
  export let selectedCamera = 0;
  export let display_func = a => a + '   ';
  export let cameras = new UserMediaDetector();
  let canvasWidth = [320,480,640,720]  ;
  let fPs = [5,15,30,60];
  canvasWidth.forEach((item,i) => {if (item == $videoSettings.canvasWidth ) {selected = i} });
  fPs.forEach((item,i) => {if (item == $videoSettings.FPS ) {selectedFPS = i} });  
  selectedCamera = $videoSettings.selectedCamera;
  
$: {
    $videoSettings.canvasWidth = canvasWidth[selected];
    $videoSettings.FPS = fPs[selectedFPS];
    console.log('Camera width changed to ' + $videoSettings.canvasWidth);
    console.log('FPS changed to ' + $videoSettings.FPS);
    console.log('Camera changed to ' + $videoSettings.label + " (device ID) " + $videoSettings.deviceId);
  
}
export function cameraOpts(things){
  // used to set the values for the camera and still get a radio button to change color.
      selectedCamera = things.x;
      $videoSettings.label = things.label;
      $videoSettings.deviceId = things.deviceId;
      $videoSettings.selectedCamera = things.x;
      
}

  
           
</script>
<!-- svelte-ignore a11y-missing-content -->
  <h1>
  
    <p class="ml-5">Change Settings: <br> </p>
  </h1>
  <div class="ml-5 mr-5 border-black bg-gray-200 rounded md:w-1/2 lg:w-1/4">
  <label class="ml-5"> Select Camera Display Width:  <br>  
    {#each canvasWidth as option, i}
  
        <input class="ml-5" type=radio bind:group={selected} name="CanvaswidthIndex" value={i} >
          {display_func(option)} <br>
      
    {/each}
    <br>
    </label>
    <label class="ml-5"> Select Camera Frame Rate:  <br>  
      {#each fPs as option, i}
    
          <input class="ml-5" type=radio bind:group={selectedFPS} name="CameraFrameRate" value={i} >
            {display_func(option)} <br>
        
      {/each}
      <br>
      </label>
  
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="ml-5">Select Camera: <br>  
      
      <!-- svelte-ignore empty-block -->  
      {#await cameras.devices()}
      {:then deviceValues} 
      {#if deviceValues.length > 0}
      {#each deviceValues.filter(type => type.kind == "videoinput") as option,x}
          <input class="ml-5" type=radio bind:group={selectedCamera} name="CameraIndex" 
            on:click={ ()=> {cameraOpts({deviceId: option.deviceId,x:x,label:option.label})} }
                   value={x}   id={option.deviceId} >
                     {display_func(option.label)} <br>
      {/each}
      {/if}
      {/await}
      
      <br>
    </label>
  </div>
    





 