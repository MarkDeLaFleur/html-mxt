
import { writable } from 'svelte/store';
export let playerNameTable = writable([{blankColumn: " Round ",
	playerName1: " ",
	playerName2: " ",
	playerName3: " ",
	playerName4: " ",
	playerName5: " ",
	playerName6: " ",
	playerName7: " ",
	playerName8: " "}]);
	
export let playersScore = writable([
	{
		"Round": "doubleTwelve",
		"Score": [" "," "," "," "," "," "," "," "],
	},
	{
		"Round": "doubleEleven",
	 	"Score": [" "," "," "," "," "," "," "," "],
   	},
   	{
		"Round": "doubleTen",
     	"Score": [" "," "," "," "," "," "," "," "],
  	},
  	{
		"Round": "doubleNine",
  	 	"Score": [" "," "," "," "," "," "," "," "],
    },
    {
		"Round": "doubleEight",
     	"Score": [" "," "," "," "," "," "," "," "],
	},
	{
		"Round": "doubleSeven",
		"Score": [" "," "," "," "," "," "," "," "],
	},
	{
		"Round": "doubleSix",
		"Score": [" "," "," "," "," "," "," "," "],
	},
	{
		"Round": "doubleFive",
		"Score": [" "," "," "," "," "," "," "," "],
	},
	{
		"Round": "doubleFour",
		"Score": [" "," "," "," "," "," "," "," "],
	},
	{
		"Round": "doubleThree",
		"Score": [" "," "," "," "," "," "," "," "],
	},
	{
		"Round": "doubleTwo",
		"Score": [" "," "," "," "," "," "," "," "],
	},
	{
		"Round": "doubleOne",
		"Score": [" "," "," "," "," "," "," "," "],
	},
	{
		"Round": "doubleBlank",
		"Score": [" "," "," "," "," "," "," "," "],
	},

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

