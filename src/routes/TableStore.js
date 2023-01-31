
import { writable } from 'svelte/store';
export let playerScore = writable([
	{	"playerName": "Billy",
		"pScore": [" "," "," "," "," "," "," "," "," "," "," "," "," "],
	},
	{
		"playerName": "Willy",
	 	"pScore": [" "," "," "," "," "," "," "," "," "," "," "," "," "],
   	},
   	{
		"playerName": "Goofy",
     	"pScore": [" "," "," "," "," "," "," "," "," "," "," "," ","  "],
  	},
  	{
		"playerName": "",
  	 	"pScore": [" "," "," "," "," "," "," "," "," "," "," "," "," "],
    },
    {
		"playerName": "",
     	"pScore": [" "," "," "," "," "," "," "," "," "," "," "," "," "],
	},
	{
		"playerName": "",
		"pScore": [" "," "," "," "," "," "," "," "," "," "," "," "," "],
	},
	{
		"playerName": "",
		"pScore": [" "," "," "," "," "," "," "," "," "," "," "," "," "],
	},
	{
		"playerName": "",
		"pScore": [" "," "," "," "," "," "," "," "," "," "," "," "," "],
	}
]);

export let colors = writable([
	{
		"Name" : "Cyan",
		"HEX" : "#00FFFF"
	},
	{
		"Name" : "Yellow",
		"HEX" : "#FFFF00"
	},
	{
		"Name" : "Blue",
		"HEX" : "#0000FF"
	},
	{
		"Name" : "Lime",
		"HEX" : "#00FF00"
	},
	{
		"Name" : "Red",
		"HEX" : "#FF0000"
	},
	{
		"Name" : "White",
		"HEX" : "#FFFFFF"
	},
	{
		"Name" : "Black",
		"HEX" : "#000000"
	},
])

