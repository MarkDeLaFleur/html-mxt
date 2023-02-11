
import { localStore } from '../localStore.js'
  
  
const initialPlayerScore = [
	{	"playerName": " ",
		"pScore": [" "," "," "," "," "," "," "," "," "," "," "," "," "],
	},
	{
		"playerName": " ",
	 	"pScore": [" "," "," "," "," "," "," "," "," "," "," "," "," "],
   	},
   	{
		"playerName": " ",
     	"pScore": [" "," "," "," "," "," "," "," "," "," "," "," ","  "],
  	},
  	{
		"playerName": " ",
  	 	"pScore": [" "," "," "," "," "," "," "," "," "," "," "," "," "],
    },
    {
		"playerName": " ",
     	"pScore": [" "," "," "," "," "," "," "," "," "," "," "," "," "],
	},
	{
		"playerName": " ",
		"pScore": [" "," "," "," "," "," "," "," "," "," "," "," "," "],
	},
	{
		"playerName": " ",
		"pScore": [" "," "," "," "," "," "," "," "," "," "," "," "," "],
	},
	{
		"playerName": "",
		"pScore": [" "," "," "," "," "," "," "," "," "," "," "," "," "],
	}
];
export const playerScore = localStore('html-mxt', initialPlayerScore)
//console.log(playerScore)
