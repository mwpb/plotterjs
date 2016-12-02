//JXG.Options.text.cssClass = 'myDefaultFont';
//JXG.Options.text.useMathJax = true;
// JXG.Options.renderer = 'canvas';
// JXG.Options.text.display = 'internal';

function grapher() {

    var c = JXG.JSXGraph.initBoard('caption', {boundingbox: [0, 100, 100, 0], axis:false,showNavigation:false,showCopyright:false,grid:false});

    var xl = document.getElementById("xmin").value;
    var xh = document.getElementById("xmax").value;
    var yl= document.getElementById("ymin").value;
    var yh = document.getElementById("ymax").value;
    
    var b = JXG.JSXGraph.initBoard('box', {boundingbox: [xl, yh, xh, yl], axis:true,showCopyright:false,showNavigation:false,grid:false});
    c.addChild(b);
    b.addChild(c);

    var xmin = c.create('slider',[[30,30],[70,30],[-10,-10,10]],{withLabel:false});
    var xmax = c.create('slider',[[30,30],[70,30],[-10,10,10]],{withLabel:false});
    var ymin = c.create('slider',[[25,35],[25,70],[-10,-10,10]],{withLabel:false});
    var ymax = c.create('slider',[[25,35],[25,70],[-10,10,10]],{withLabel:false});
    var L = c.create('slider',[[30,90],[70,90],[0,0,1]],{withLabel:false});
    var R = c.create('slider',[[30,90],[70,90],[0,1,1]],{withLabel:false});

    var txtraw = document.getElementById('input').value;
    var f = b.jc.snippet(txtraw, true, 'x', true);
    var func = b.create('functiongraph',[f]);
    //var L = c.create('slider',[[30,90],[70,90],[0,0,1]],{withLabel:false});
    //var R = c.create('slider',[[30,90],[70,90],[0,1,1]],{withLabel:false});

    function lower() {
	return (xmin.Value()+(L.Value())*(xmax.Value()-xmin.Value()));
    }
    function upper(){
	return xmin.Value()+(R.Value())*(xmax.Value()-xmin.Value());
    }

    var integral = b.create('integral',[[lower,upper],func],{withLabel:false});
    var a = b.create('point',[lower,0],{name:"a",});
    var b = b.create('point',[upper,0],{name:"b"});
    var toggleIntegralButton = c.create('button',[30,85,"Toggle Integral",toggleIntegral]);
    var integralIsVisible = true

    function toggleIntegral(){
	if (integralIsVisible == true){
	    integralIsVisible = false
	    integral.setAttribute({visible:false})
	    a.setAttribute({visible:false})
	    b.setAttribute({visible:false})
	}
	else{
	    integralIsVisible = true
	    integral.setAttribute({visible:true})
	    a.setAttribute({visible:true})
	    b.setAttribute({visible:true})
	}
    }
    
    function export2SVG(){
	var svg = new XMLSerializer().serializeToString(b.renderer.svgRoot);
	var blob = new Blob([svg], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "test.svg");
    }

    c.create('button',[40,10,"Export to SVG",export2SVG]);
    //c.create('button',[40,5,"Export to PNG",export2PNG]);

    xmin.on('drag', function(){ b.setBoundingBox([xmin.Value(),ymax.Value(),xmax.Value(),ymin.Value()],  false, true ); });
    xmax.on('drag', function(){ b.setBoundingBox([xmin.Value(),ymax.Value(),xmax.Value(),ymin.Value()],  false, true ); });
    ymin.on('drag', function(){ b.setBoundingBox([xmin.Value(),ymax.Value(),xmax.Value(),ymin.Value()],  false, true ); });
    ymax.on('drag', function(){ b.setBoundingBox([xmin.Value(),ymax.Value(),xmax.Value(),ymin.Value()],  false, true ); });
}
