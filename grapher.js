//JXG.Options.text.cssClass = 'myDefaultFont';
//JXG.Options.text.useMathJax = true;
// JXG.Options.renderer = 'canvas';
// JXG.Options.text.display = 'internal';
var c = JXG.JSXGraph.initBoard('caption', {boundingbox: [0, 100, 100, 0], axis:false,showNavigation:false,showCopyright:false});
//make data transferable

var xmin = c.create('slider',[[30,30],[70,30],[-10,-10,10]],{withLabel:false});
var xmax = c.create('slider',[[30,30],[70,30],[-10,10,10]],{withLabel:false});
var ymin = c.create('slider',[[25,35],[25,70],[-10,-10,10]],{withLabel:false});
var ymax = c.create('slider',[[25,35],[25,70],[-10,10,10]],{withLabel:false});

var L = c.create('slider',[[30,90],[70,90],[0,0,1]],{withLabel:false});
var R = c.create('slider',[[30,90],[70,90],[0,1,1]],{withLabel:false});

var b = JXG.JSXGraph.initBoard('box', {boundingbox: [-10, 10, 10, -10], axis:true,showCopyright:false});
c.addChild(b);
b.addChild(c);

function f (x) {
    return 5*x*(x-1)*(x-2)+4;
};

var func = b.create('functiongraph',[f],{name:"f",withLabel:true});

function lower() {
    return (xmin.Value()+(L.Value())*(xmax.Value()-xmin.Value()));
}
function upper(){
    return xmin.Value()+(R.Value())*(xmax.Value()-xmin.Value());
}

var int = b.create('integral',[[lower,upper],func],{withLabel:false});
b.create('point',[lower,0],{name:"a",});
b.create('point',[upper,0],{name:"b"});

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


