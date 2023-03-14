

	// scaling is a bit weird....
    const sameStr = 	  '<svg fill="none" stroke-linecap="square" stroke-miterlimit="10" version="1.1" viewBox="0 0 40.005 20.053" xmlns="http://www.w3.org/2000/svg">' +
						  '<clipPath id="a"><path d="m0 0h100v181.8h-100z"/></clipPath>' +
						  '<g transform="matrix(0 -.25504 .23368 0 -1.2185 22.778)" clip-path="url(#a)" style="stroke-width:2.1319">' +
						  '<path d="m12.819 19.74c0-6.845 5.549-12.394 12.394-12.394h49.574a12.394 12.394 0 0 1 12.394 12.394v142.14c0 6.845-5.549 12.394-12.394 12.394h-49.574c-6.845 0-12.394-5.55-12.394-12.394z" stroke="#000" stroke-linecap="butt" stroke-linejoin="round" stroke-width="4.2638"/>' +
						  '<path d="m21.992 90.003h56.016" stroke="#000" stroke-linecap="butt" stroke-linejoin="round" stroke-width="4.2638"/>' + 
						  '<ellipse transform="scale(-1)"';
	const D0 = sameStr +  '<ellipse transform="scale(-1)" cx="-49.348" cy="-130.34" rx="4.4693" ry="6.771" style="fill:#fff;stroke-width:4.545"/>'+
						  '</g></svg>';
	const D1 = sameStr +  '<ellipse transform="scale(-1)" cx="-48.901" cy="-128.82" rx="4.6182" ry="5.5861" style="fill:#4d4d4d;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-48.901" cy="-50.106" rx="4.6182" ry="5.5861" style="fill:#4d4d4d;stroke-width:4.5451"/>'+
						  '</g></svg>';
    const D2 = sameStr +  '<ellipse transform="scale(-1)" cx="-30.428" cy="-112.91" rx="4.6182" ry="5.5861" style="fill:#916f6f;stroke-width:4.5451"/>'+
					      '<ellipse transform="scale(-1)" cx="-30.428" cy="-28.1" rx="4.6182" ry="5.5861" style="fill:#916f6f;stroke-width:4.5451"/>'+
					      '<ellipse transform="scale(-1)" cx="-71.397" cy="-154.72" rx="4.6182" ry="5.5861" style="fill:#916f6f;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-69.065" rx="4.6182" ry="5.5861" style="fill:#916f6f;stroke-width:4.5451"/>'+
   						  '</g></svg>';
	const D3 = sameStr +  '<ellipse transform="scale(-1)" cx="-30.428" cy="-112.91" rx="4.6182" ry="5.5861" style="fill:#f00;stroke-width:4.5451"/>' +
						  '<ellipse transform="scale(-1)" cx="-30.428" cy="-26.746" rx="4.6182" ry="5.5861" style="fill:#f00;stroke-width:4.5451"/>' +
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-154.72" rx="4.6182" ry="5.5861" style="fill:#f00;stroke-width:4.5451"/>' +
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-69.065" rx="4.6182" ry="5.5861" style="fill:#f00;stroke-width:4.5451"/>' +
						  '<ellipse transform="scale(-1)" cx="-52.03" cy="-134.41" rx="4.6182" ry="5.5861" style="fill:#f00;stroke-width:4.5451"/>'  +
						  '<ellipse transform="scale(-1)" cx="-51.732" cy="-47.736" rx="4.6182" ry="5.5861" style="fill:#f00;stroke-width:4.5451"/>' +
						  '</g></svg>';
	const D4 = sameStr +  '<ellipse transform="scale(-1)" cx="-30.428" cy="-112.91" rx="4.6182" ry="5.5861" style="fill:#916f6f;stroke-width:4.5451"/>' +
						  '<ellipse transform="scale(-1)" cx="-30.428" cy="-26.746" rx="4.6182" ry="5.5861" style="fill:#916f6f;stroke-width:4.5451"/>' +
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-154.72" rx="4.6182" ry="5.5861" style="fill:#916f6f;stroke-width:4.5451"/>' +
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-69.065" rx="4.6182" ry="5.5861" style="fill:#916f6f;stroke-width:4.5451"/>' +
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-110.94" rx="4.6182" ry="5.5861" style="fill:#916f6f;stroke-width:4.5451"/>' +
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-27.188" rx="4.6182" ry="5.5861" style="fill:#916f6f;stroke-width:4.5451"/>' +
						  '<ellipse transform="scale(-1)" cx="-30.428" cy="-154.72" rx="4.6182" ry="5.5861" style="fill:#916f6f;stroke-width:4.5451"/>' +
						  '<ellipse transform="scale(-1)" cx="-30.428" cy="-69.065" rx="4.6182" ry="5.5861" style="fill:#916f6f;stroke-width:4.5451"/>' + 
						  '</g></svg>';
  
    const D5 = sameStr +  '<ellipse transform="scale(-1)" cx="-30.428" cy="-112.91" rx="4.6182" ry="5.5861" style="fill:#00f;stroke-width:4.5451"/>' +
					      '<ellipse transform="scale(-1)" cx="-30.428" cy="-26.746" rx="4.6182" ry="5.5861" style="fill:#00f;stroke-width:4.5451"/>' +
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-154.72" rx="4.6182" ry="5.5861" style="fill:#00f;stroke-width:4.5451"/>' +
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-69.065" rx="4.6182" ry="5.5861" style="fill:#00f;stroke-width:4.5451"/>' +
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-110.94" rx="4.6182" ry="5.5861" style="fill:#00f;stroke-width:4.5451"/>' +
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-27.188" rx="4.6182" ry="5.5861" style="fill:#00f;stroke-width:4.5451"/>' +
						  '<ellipse transform="scale(-1)" cx="-30.428" cy="-154.72" rx="4.6182" ry="5.5861" style="fill:#00f;stroke-width:4.5451"/>' +
						  '<ellipse transform="scale(-1)" cx="-30.428" cy="-69.065" rx="4.6182" ry="5.5861" style="fill:#00f;stroke-width:4.5451"/>' +
						  '<ellipse transform="scale(-1)" cx="-52.03" cy="-134.74" rx="4.6182" ry="5.5861" style="fill:#00f;stroke-width:4.5451"/>' +
						  '<ellipse transform="scale(-1)" cx="-52.03" cy="-48.309" rx="4.6182" ry="5.5861" style="fill:#00f;stroke-width:4.5451"/>' +
   					      '</g></svg>';
	const D6 = sameStr +  '<ellipse transform="scale(-1)" cx="-30.428" cy="-110.94" rx="4.6182" ry="5.5861" style="fill:#f60;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-30.428" cy="-26.746" rx="4.6182" ry="5.5861" style="fill:#f60;stroke-width:4.5451"/>' +
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-154.72" rx="4.6182" ry="5.5861" style="fill:#f60;stroke-width:4.5451"/>' +
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-69.065" rx="4.6182" ry="5.5861" style="fill:#f60;stroke-width:4.5451"/>' +
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-110.94" rx="4.6182" ry="5.5861" style="fill:#f60;stroke-width:4.5451"/>' +
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-27.188" rx="4.6182" ry="5.5861" style="fill:#f60;stroke-width:4.5451"/>' +
						  '<ellipse transform="scale(-1)" cx="-30.428" cy="-154.72" rx="4.6182" ry="5.5861" style="fill:#f60;stroke-width:4.5451"/>' +
						  '<ellipse transform="scale(-1)" cx="-30.428" cy="-69.065" rx="4.6182" ry="5.5861" style="fill:#f60;stroke-width:4.5451"/>' +
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-131.7" rx="4.6182" ry="5.5861" style="fill:#f60;stroke-width:4.5451"/>'  +
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-48.309" rx="4.6182" ry="5.5861" style="fill:#f60;stroke-width:4.5451"/>' +
						  '<ellipse transform="scale(-1)" cx="-30.428" cy="-131.7" rx="4.6182" ry="5.5861" style="fill:#f60;stroke-width:4.5451"/>'  +
						  '<ellipse transform="scale(-1)" cx="-30.428" cy="-48.309" rx="4.6182" ry="5.5861" style="fill:#f60;stroke-width:4.5451"/>' +
   					      '</g></svg>';
    const D7 = sameStr +  '<ellipse transform="scale(-1)" cx="-30.428" cy="-110.94" rx="4.6182" ry="5.5861" style="fill:#f0f;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-30.428" cy="-26.746" rx="4.6182" ry="5.5861" style="fill:#f0f;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-154.72" rx="4.6182" ry="5.5861" style="fill:#f0f;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-69.065" rx="4.6182" ry="5.5861" style="fill:#f0f;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-110.94" rx="4.6182" ry="5.5861" style="fill:#f0f;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-27.188" rx="4.6182" ry="5.5861" style="fill:#f0f;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-30.428" cy="-154.72" rx="4.6182" ry="5.5861" style="fill:#f0f;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-30.428" cy="-69.065" rx="4.6182" ry="5.5861" style="fill:#f0f;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-50.912" cy="-132.83" rx="4.6182" ry="5.5861" style="fill:#f0f;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-50.912" cy="-48.127" rx="4.6182" ry="5.5861" style="fill:#f0f;stroke-width:4.5451"/>'+
					      '<ellipse transform="scale(-1)" cx="-50.912" cy="-154.72" rx="4.6182" ry="5.5861" style="fill:#f0f;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-50.912" cy="-110.94" rx="4.6182" ry="5.5861" style="fill:#f0f;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-50.912" cy="-69.065" rx="4.6182" ry="5.5861" style="fill:#f0f;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-50.912" cy="-27.188" rx="4.6182" ry="5.5861" style="fill:#f0f;stroke-width:4.5451"/>'+
   					      '</g></svg>';
    const D8 = sameStr +  ' <ellipse transform="scale(-1)" cx="-30.428" cy="-110.94" rx="4.6182" ry="5.5861" style="fill:#0ff;stroke-width:4.5451"/>'+
					      '<ellipse transform="scale(-1)" cx="-30.428" cy="-26.746" rx="4.6182" ry="5.5861" style="fill:#0ff;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-154.72" rx="4.6182" ry="5.5861" style="fill:#0ff;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-69.065" rx="4.6182" ry="5.5861" style="fill:#0ff;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-110.94" rx="4.6182" ry="5.5861" style="fill:#0ff;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-27.188" rx="4.6182" ry="5.5861" style="fill:#0ff;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-30.428" cy="-154.72" rx="4.6182" ry="5.5861" style="fill:#0ff;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-30.428" cy="-69.065" rx="4.6182" ry="5.5861" style="fill:#0ff;stroke-width:4.5451"/>'+
					      '<ellipse transform="scale(-1)" cx="-71.397" cy="-132.83" rx="4.6182" ry="5.5861" style="fill:#0ff;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-47.176" rx="4.6182" ry="5.5861" style="fill:#0ff;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-50.912" cy="-154.72" rx="4.6182" ry="5.5861" style="fill:#0ff;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-50.912" cy="-110.94" rx="4.6182" ry="5.5861" style="fill:#0ff;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-50.912" cy="-69.065" rx="4.6182" ry="5.5861" style="fill:#0ff;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-50.912" cy="-27.188" rx="4.6182" ry="5.5861" style="fill:#0ff;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-30.428" cy="-47.905" rx="4.6182" ry="5.5861" style="fill:#0ff;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-30.428" cy="-132.1" rx="4.6182" ry="5.5861" style="fill:#0ff;stroke-width:4.5451"/>'+
   						  '</g></svg>';	
	const D9 = sameStr +  '<ellipse transform="scale(-1)" cx="-30.428" cy="-110.94" rx="4.6182" ry="5.5861" style="fill:#501616;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-30.428" cy="-26.746" rx="4.6182" ry="5.5861" style="fill:#501616;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-154.72" rx="4.6182" ry="5.5861" style="fill:#501616;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-69.065" rx="4.6182" ry="5.5861" style="fill:#501616;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-110.94" rx="4.6182" ry="5.5861" style="fill:#501616;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-27.188" rx="4.6182" ry="5.5861" style="fill:#501616;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-30.428" cy="-154.72" rx="4.6182" ry="5.5861" style="fill:#501616;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-30.428" cy="-69.065" rx="4.6182" ry="5.5861" style="fill:#501616;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-132.83" rx="4.6182" ry="5.5861" style="fill:#501616;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-71.397" cy="-47.176" rx="4.6182" ry="5.5861" style="fill:#501616;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-50.912" cy="-154.72" rx="4.6182" ry="5.5861" style="fill:#501616;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-50.912" cy="-110.94" rx="4.6182" ry="5.5861" style="fill:#501616;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-50.912" cy="-69.065" rx="4.6182" ry="5.5861" style="fill:#501616;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-50.912" cy="-27.188" rx="4.6182" ry="5.5861" style="fill:#501616;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-30.428" cy="-47.905" rx="4.6182" ry="5.5861" style="fill:#501616;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-30.428" cy="-132.1" rx="4.6182" ry="5.5861" style="fill:#501616;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-50.838" cy="-131.7" rx="4.6182" ry="5.5861" style="fill:#501616;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-51.136" cy="-47.059" rx="4.6182" ry="5.5861" style="fill:#501616;stroke-width:4.5451"/>'+
  						  '</g></svg>';
    const D10 = sameStr + ' <ellipse transform="scale(-1)" cx="-29.292" cy="-25.287" rx="4.6182" ry="5.5861" style="fill:#ff7f2a;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-70.484" cy="-58.231" rx="4.6182" ry="5.5861" style="fill:#ff7f2a;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-70.484" cy="-25.053" rx="4.6182" ry="5.5861" style="fill:#ff7f2a;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-29.316" cy="-58.231" rx="4.6182" ry="5.5861" style="fill:#ff7f2a;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-70.261" cy="-41.759" rx="4.6182" ry="5.5861" style="fill:#ff7f2a;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-49.4" cy="-25.053" rx="4.6182" ry="5.5861" style="fill:#ff7f2a;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-29.346" cy="-41.759" rx="4.6182" ry="5.5861" style="fill:#ff7f2a;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-70.484" cy="-73.974" rx="4.6182" ry="5.5861" style="fill:#ff7f2a;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-29.316" cy="-73.974" rx="4.6182" ry="5.5861" style="fill:#ff7f2a;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-49.4" cy="-73.974" rx="4.6182" ry="5.5861" style="fill:#ff7f2a;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-29.739" cy="-107.13" rx="4.6182" ry="5.5861" style="fill:#ff7f2a;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-70.932" cy="-140.08" rx="4.6182" ry="5.5861" style="fill:#ff7f2a;stroke-width:4.5451"/>'+					
        		  		  '<ellipse transform="scale(-1)" cx="-70.932" cy="-106.9" rx="4.6182" ry="5.5861" style="fill:#ff7f2a;stroke-width:4.5451"/>'+							'<ellipse transform="scale(-1)" cx="-29.763" cy="-140.08" rx="4.6182" ry="5.5861" style="fill:#ff7f2a;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-70.708" cy="-123.6" rx="4.6182" ry="5.5861" style="fill:#ff7f2a;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-49.847" cy="-106.9" rx="4.6182" ry="5.5861" style="fill:#ff7f2a;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-29.793" cy="-123.6" rx="4.6182" ry="5.5861" style="fill:#ff7f2a;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-70.932" cy="-155.82" rx="4.6182" ry="5.5861" style="fill:#ff7f2a;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-29.763" cy="-155.82" rx="4.6182" ry="5.5861" style="fill:#ff7f2a;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-49.847" cy="-155.82" rx="4.6182" ry="5.5861" style="fill:#ff7f2a;stroke-width:4.5451"/>'+
   						  '</g></svg>';
    const D11 = sameStr + '<ellipse transform="scale(-1)" cx="-29.292" cy="-25.287" rx="4.6182" ry="5.5861" style="fill:#504;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-70.484" cy="-58.231" rx="4.6182" ry="5.5861" style="fill:#504;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-70.484" cy="-25.053" rx="4.6182" ry="5.5861" style="fill:#504;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-29.316" cy="-58.231" rx="4.6182" ry="5.5861" style="fill:#504;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-70.261" cy="-41.759" rx="4.6182" ry="5.5861" style="fill:#504;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-49.4" cy="-25.053" rx="4.6182" ry="5.5861" style="fill:#504;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-29.346" cy="-41.759" rx="4.6182" ry="5.5861" style="fill:#504;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-49.4" cy="-50.05" rx="4.6182" ry="5.5861" style="fill:#504;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-70.484" cy="-73.974" rx="4.6182" ry="5.5861" style="fill:#504;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-29.316" cy="-73.974" rx="4.6182" ry="5.5861" style="fill:#504;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-49.4" cy="-73.974" rx="4.6182" ry="5.5861" style="fill:#504;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-29.739" cy="-107.13" rx="4.6182" ry="5.5861" style="fill:#504;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-70.932" cy="-140.08" rx="4.6182" ry="5.5861" style="fill:#504;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-70.932" cy="-106.9" rx="4.6182" ry="5.5861" style="fill:#504;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-29.763" cy="-140.08" rx="4.6182" ry="5.5861" style="fill:#504;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-70.708" cy="-123.6" rx="4.6182" ry="5.5861" style="fill:#504;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-49.847" cy="-131.21" rx="4.6182" ry="5.5861" style="fill:#504;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-49.847" cy="-106.9" rx="4.6182" ry="5.5861" style="fill:#504;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-29.793" cy="-123.6" rx="4.6182" ry="5.5861" style="fill:#504;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-70.932" cy="-155.82" rx="4.6182" ry="5.5861" style="fill:#504;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-29.763" cy="-155.82" rx="4.6182" ry="5.5861" style="fill:#504;stroke-width:4.5451"/>'+
						  '<ellipse transform="scale(-1)" cx="-49.847" cy="-155.82" rx="4.6182" ry="5.5861" style="fill:#504;stroke-width:4.5451"/>'+
  						  '</g></svg>';
    const D12 = sameStr + ' <ellipse transform="scale(-1)" cx="-29.292" cy="-25.287" rx="4.6182" ry="5.5861" style="fill:#5f8dd3;stroke-width:3.7415"/>'+
						  '<ellipse transform="scale(-1)" cx="-70.484" cy="-58.231" rx="4.6182" ry="5.5861" style="fill:#5f8dd3;stroke-width:3.7415"/>'+
						  '<ellipse transform="scale(-1)" cx="-70.484" cy="-25.053" rx="4.6182" ry="5.5861" style="fill:#5f8dd3;stroke-width:3.7415"/>'+
						  '<ellipse transform="scale(-1)" cx="-29.316" cy="-58.231" rx="4.6182" ry="5.5861" style="fill:#5f8dd3;stroke-width:3.7415"/>'+
						  '<ellipse transform="scale(-1)" cx="-70.261" cy="-41.759" rx="4.6182" ry="5.5861" style="fill:#5f8dd3;stroke-width:3.7415"/>'+
						  '<ellipse transform="scale(-1)" cx="-49.4" cy="-58.231" rx="4.6182" ry="5.5861" style="fill:#5f8dd3;stroke-width:3.7415"/>'+
						  '<ellipse transform="scale(-1)" cx="-49.4" cy="-25.053" rx="4.6182" ry="5.5861" style="fill:#5f8dd3;stroke-width:3.7415"/>'+
						  '<ellipse transform="scale(-1)" cx="-29.346" cy="-41.759" rx="4.6182" ry="5.5861" style="fill:#5f8dd3;stroke-width:3.7415"/>'+
						  '<ellipse transform="scale(-1)" cx="-49.4" cy="-41.642" rx="4.6182" ry="5.5861" style="fill:#5f8dd3;stroke-width:3.7415"/>'+
						  '<ellipse transform="scale(-1)" cx="-70.484" cy="-73.974" rx="4.6182" ry="5.5861" style="fill:#5f8dd3;stroke-width:3.7415"/>'+
						  '<ellipse transform="scale(-1)" cx="-29.316" cy="-73.974" rx="4.6182" ry="5.5861" style="fill:#5f8dd3;stroke-width:3.7415"/>'+
						  '<ellipse transform="scale(-1)" cx="-49.4" cy="-73.974" rx="4.6182" ry="5.5861" style="fill:#5f8dd3;stroke-width:3.7415"/>'+
						  '<ellipse transform="scale(-1)" cx="-29.739" cy="-107.13" rx="4.6182" ry="5.5861" style="fill:#5f8dd3;stroke-width:3.7415"/>'+
						  '<ellipse transform="scale(-1)" cx="-70.932" cy="-140.08" rx="4.6182" ry="5.5861" style="fill:#5f8dd3;stroke-width:3.7415"/>'+
						  '<ellipse transform="scale(-1)" cx="-70.932" cy="-106.9" rx="4.6182" ry="5.5861" style="fill:#5f8dd3;stroke-width:3.7415"/>'+
						  '<ellipse transform="scale(-1)" cx="-29.763" cy="-140.08" rx="4.6182" ry="5.5861" style="fill:#5f8dd3;stroke-width:3.7415"/>'+
						  '<ellipse transform="scale(-1)" cx="-70.708" cy="-123.6" rx="4.6182" ry="5.5861" style="fill:#5f8dd3;stroke-width:3.7415"/>'+
						  '<ellipse transform="scale(-1)" cx="-49.847" cy="-140.08" rx="4.6182" ry="5.5861" style="fill:#5f8dd3;stroke-width:3.7415"/>'+
						  '<ellipse transform="scale(-1)" cx="-49.847" cy="-106.9" rx="4.6182" ry="5.5861" style="fill:#5f8dd3;stroke-width:3.7415"/>'+
						  '<ellipse transform="scale(-1)" cx="-29.793" cy="-123.6" rx="4.6182" ry="5.5861" style="fill:#5f8dd3;stroke-width:3.7415"/>'+
						  '<ellipse transform="scale(-1)" cx="-49.847" cy="-123.49" rx="4.6182" ry="5.5861" style="fill:#5f8dd3;stroke-width:3.7415"/>'+
						  '<ellipse transform="scale(-1)" cx="-70.932" cy="-155.82" rx="4.6182" ry="5.5861" style="fill:#5f8dd3;stroke-width:3.7415"/>'+
						  '<ellipse transform="scale(-1)" cx="-29.763" cy="-155.82" rx="4.6182" ry="5.5861" style="fill:#5f8dd3;stroke-width:3.7415"/>'+
						  '<ellipse transform="scale(-1)" cx="-49.847" cy="-155.82" rx="4.6182" ry="5.5861" style="fill:#5f8dd3;stroke-width:3.7415"/>'+
						  '</g></svg>';
	//let iconSvgs = [D12,D11,D10,D9,D8,D7,D6,D5,D4,D3,D2,D1,D0];
    let iconSvgs = [D12,D11,D10,D9,D8,D7,D6,D5,D4,D3,D2,D1,D0];
	//setting up the table entry scores and icons for each player
	/**
	 * @type {any[]}
	 */
	export let roundTableData = [];
	iconSvgs.forEach((iCon,index) => {
		roundTableData.push({icon: iCon}) 
	});
    

