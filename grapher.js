//JXG.Options.text.cssClass = 'myDefaultFont';
//JXG.Options.text.useMathJax = true;
// JXG.Options.renderer = 'canvas';
JXG.Options.text.display = 'internal';

var c = JXG.JSXGraph.initBoard('caption', {boundingbox: [0, 100, 100, 0], axis:false,showNavigation:false,showCopyright:false,grid:false});

var b = JXG.JSXGraph.initBoard('box', {boundingbox: [-1, 10, 5, -1], axis:true,showCopyright:false,showNavigation:false,grid:false});
c.addChild(b);
b.addChild(c);

var f
var func

function setAxes() {
    var xl = document.getElementById("xmin").value;
    var xh = document.getElementById("xmax").value;
    var yl= document.getElementById("ymin").value;
    var yh = document.getElementById("ymax").value;
    b.setBoundingBox([xl,yh,xh,yl],  false, true );
}

function drawGraph(b,c) {
    var txtraw = document.getElementById('input').value;
    f = b.jc.snippet(txtraw, true, 'x', true);
    func = b.create('functiongraph',[f]);

    //c.create('button',[40,5,"Export to PNG",export2PNG]);
}

function addDifferential() {
    var x = b.create('point',[1,0],{name:"x",snapToGrid:true,snapSizeX:0.5});
    var h = b.create('point',[2,0],{name:"x+h",snapToGrid:true,snapSizeX:0.5});
    var fx = b.create('point',[function(){return x.X();},function(){return f(x.X());}],{name:"f(x)",label: { 
         offset: [-10, 10],
         anchorX: 'middle',
         anchorY: 'bottom',
        }});
    var hUpper = b.create('point',[function(){return h.X();},function(){return f(h.X());}],{name:"f(x+h)"});
    var hLower = b.create('point',[function(){return h.X();},function(){return f(x.X());}],{name:""});
    var chord = b.create('segment',[fx,hUpper],{color:"#000000"});
    var vertLine = b.create('segment',[fx,hLower],{color:"#000000"});
    var horizLine = b.create('segment',[hLower,hUpper],{color:"#000000"});
    b.on('move', function(){
        x.moveTo([x.X(), 0]);
        h.moveTo([h.X(), 0]);
    });
}
function export2SVG(){
    var svg = new XMLSerializer().serializeToString(b.renderer.svgRoot);
    var blob = new Blob([svg], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "test.svg");
}

function addIntegral(){
    var lower = document.getElementById("xmin").value;
    var upper = document.getElementById("xmax").value;

    var integral = b.create('integral',[[1,2],func],{withLabel:false,visible:true});
    var low = b.create('point',[lower,0],{name:"a",visible:true});
    var up = b.create('point',[upper,0],{name:"b",visible:true});
    // var toggleIntegralButton = c.create('button',[30,85,"Toggle Integral",toggleIntegral]);
    // var integralIsVisible = false;
    

    // function toggleIntegral(){
    // 	if (integralIsVisible == true){
    // 	    integralIsVisible = false;
    // 	    integral.setAttribute({visible:false});
    // 	    low.setAttribute({visible:false});
    // 	    up.setAttribute({visible:false});
    // 	}
    // 	else{
    // 	    integralIsVisible = true;
    // 	    integral.setAttribute({visible:true});
    // 	    low.setAttribute({visible:true});
    // 	    up.setAttribute({visible:true});
    // 	}
    // };
}

function other(){
        var xmin = c.create('slider',[[30,30],[70,30],[-10,-10,10]],{withLabel:false});
    var xmax = c.create('slider',[[30,30],[70,30],[-10,10,10]],{withLabel:false});
    var ymin = c.create('slider',[[25,35],[25,70],[-10,-10,10]],{withLabel:false});
    var ymax = c.create('slider',[[25,35],[25,70],[-10,10,10]],{withLabel:false});
xmin.on('drag', function(){ b.setBoundingBox([xmin.Value(),ymax.Value(),xmax.Value(),ymin.Value()],  false, true ); });
    xmax.on('drag', function(){ b.setBoundingBox([xmin.Value(),ymax.Value(),xmax.Value(),ymin.Value()],  false, true ); });
    ymin.on('drag', function(){ b.setBoundingBox([xmin.Value(),ymax.Value(),xmax.Value(),ymin.Value()],  false, true ); });
    ymax.on('drag', function(){ b.setBoundingBox([xmin.Value(),ymax.Value(),xmax.Value(),ymin.Value()],  false, true ); });
}
