import { localStore } from '$lib/myFunctions/localStore';
  
  
const initialVideoSettings = {"FPS": "15","canvasWidth": 640,"deviceId": "","label": ""};
	
export const videoSettings = localStore('html-mxt-vid', initialVideoSettings)

