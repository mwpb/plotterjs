//JXG.Options.text.cssClass = 'myDefaultFont';
//JXG.Options.text.useMathJax = true;
// JXG.Options.renderer = 'canvas';
// JXG.Options.text.display = 'internal';

var c = JXG.JSXGraph.initBoard('caption', {boundingbox: [0, 100, 100, 0], axis:false,showNavigation:false,showCopyright:false,grid:false});

var b = JXG.JSXGraph.initBoard('box', {boundingbox: [-10, 10, 10, -10], axis:true,showCopyright:false,showNavigation:false,grid:false});
c.addChild(b);
b.addChild(c);

function setAxes() {
    var xl = document.getElementById("xmin").value;
    var xh = document.getElementById("xmax").value;
    var yl= document.getElementById("ymin").value;
    var yh = document.getElementById("ymax").value;
    b.setBoundingBox([xl,yh,xh,yl],  false, true );
}

function drawGraph(b,c) {
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

    var integral = b.create('integral',[[lower,upper],func],{withLabel:false,visible:false});
    var low = b.create('point',[lower,0],{name:"a",visible:false});
    var up = b.create('point',[upper,0],{name:"b",visible:false});
    var toggleIntegralButton = c.create('button',[30,85,"Toggle Integral",toggleIntegral]);
    var integralIsVisible = false;
    

    function toggleIntegral(){
    	if (integralIsVisible == true){
    	    integralIsVisible = false;
    	    integral.setAttribute({visible:false});
    	    low.setAttribute({visible:false});
    	    up.setAttribute({visible:false});
    	}
    	else{
    	    integralIsVisible = true;
    	    integral.setAttribute({visible:true});
    	    low.setAttribute({visible:true});
    	    up.setAttribute({visible:true});
    	}
    };
    
    c.create('button',[40,10,"Export to SVG",export2SVG]);
    //c.create('button',[40,5,"Export to PNG",export2PNG]);

    xmin.on('drag', function(){ b.setBoundingBox([xmin.Value(),ymax.Value(),xmax.Value(),ymin.Value()],  false, true ); });
    xmax.on('drag', function(){ b.setBoundingBox([xmin.Value(),ymax.Value(),xmax.Value(),ymin.Value()],  false, true ); });
    ymin.on('drag', function(){ b.setBoundingBox([xmin.Value(),ymax.Value(),xmax.Value(),ymin.Value()],  false, true ); });
    ymax.on('drag', function(){ b.setBoundingBox([xmin.Value(),ymax.Value(),xmax.Value(),ymin.Value()],  false, true ); });

    var x = 1;
    var h = 2;
    var fx = b.create('point',[function(){return x;},function(){return f(x);}],{name:""});
    var hUpper = b.create('point',[function(){return x+h;},function(){return f(x+h);}],{name:""});
    var hLower = b.create('point',[function(){return x+h;},function(){return f(x);}],{name:""});
    var chord = b.create('segment',[fx,hUpper],{color:"#000000"});
    var vertLine = b.create('segment',[fx,hLower],{color:"#000000"});
    var horizLine = b.create('segment',[hLower,hUpper],{color:"#000000"});
}
function export2SVG(){
    var svg = new XMLSerializer().serializeToString(b.renderer.svgRoot);
    var blob = new Blob([svg], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "test.svg");
}
