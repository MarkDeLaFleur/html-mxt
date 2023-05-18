<script Lang ts>
  import { videoSettings } from '$lib/myFunctions/VideoStore';
  import UserMediaDetector from '$lib/myFunctions/userMediaDetector';
  export let selected = 0;
  export let selectedFPS = 0;
  export let selectedDevice = {deviceId: "",label: ""};
  export let display_func = a => a + '   ';
  export let cameras = new UserMediaDetector();
  let canvasWidth = [480,640,720,1280,1920]  ;
  let fPs = [5,15,30,60];
  canvasWidth.forEach((item,i) => {if (item == $videoSettings.canvasWidth ) {selected = i} });
  fPs.forEach((item,i) => {if (item == $videoSettings.FPS ) {selectedFPS = i} });
  
  if ($videoSettings.deviceId === undefined) {
      $videoSettings = {$videoSettings,...selectedDevice};
      console.log($videoSettings.deviceId);
  }
  if ($videoSettings.deviceId != "") {
    selectedDevice.deviceId = $videoSettings.deviceId;
    selectedDevice.label    = $videoSettings.label;
    console.log('set selected deviceId /label to video settings ' + selectedDevice.deviceId + ',' + 
          selectedDevice.label);
  }
$: {$videoSettings.canvasWidth = canvasWidth[selected];
    $videoSettings.FPS = fPs[selectedFPS];
    $videoSettings.deviceId = selectedDevice.deviceId;
    $videoSettings.label = selectedDevice.label;
      console.log('Camera width changed to ' + $videoSettings.canvasWidth);
      console.log('FPS changed to ' + $videoSettings.FPS);
      console.log($videoSettings.deviceId + ' video Settings deviceId');
      console.log($videoSettings.label + ' video Settings LABEL');
}
</script>
<!-- svelte-ignore a11y-missing-content -->
  <h1>
    <p>Change Settings: <br> </p>
  </h1>
  <label> Select Camera Display Width:    
    {#each canvasWidth as option, i}
  
        <input type=radio bind:group={selected} name="CanvaswidthIndex" value={i} >
          {display_func(option)} 
      
    {/each}
    <br>
    </label>
    <label> Select Camera Frame Rate:    
      {#each fPs as option, i}
    
          <input type=radio bind:group={selectedFPS} name="CameraFrameRate" value={i} >
            {display_func(option)} 
        
      {/each}
      <br>
      </label>
  
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label>Select Camera:    
  
      <!-- svelte-ignore empty-block -->
      {#await cameras.devices()}
      {:then deviceValues}
      {#if deviceValues.length > 0}
      {#each deviceValues.filter(type => type.kind == "videoinput") as option}
        
          <input type=radio bind:group={selectedDevice} name="CameraIndex" 
                   value={option}  id={option.deviceId} >
            {display_func(option.label)} 
      {/each}
      {/if}
      {/await}
      <br>
    </label>

    





 