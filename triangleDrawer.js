JXG.Options.text.display = 'internal';
JXG.Options.grid.snapToGrid = true;
var b = JXG.JSXGraph.initBoard('box', 
	{	
		boundingbox: [-0.1, 1.1, 1.3, -0.1], 
		axis:false,
		showCopyright:false,
		showNavigation:false
	}
);

var p = b.create('point',[0,1],{name:"p",snapToGrid:true,snapSizeY:0.1,snapSizeX:0.1});
var q = b.create('point',[0,0],{name:"q",snapToGrid:true,snapSizeY:0.1,snapSizeX:0.1,label:{offset:[-15,-10]}});
var r = b.create('point',[1,0],{name:"r",snapToGrid:true,snapSizeY:0.1,snapSizeX:0.1});

var centre = b.create('point',[function(){return (1/3)*(p.X()+q.X()+r.X());},function(){return (1/3)*p.Y()+q.Y()+r.Y();}],{visible:false});

var a = b.create('angle',[r,q,p],{visible:true,radius:function(){return 0.4*(q.Dist(centre));},name:"a",label:{offset:[10,10]}});
var c = b.create('angle',[q,p,r],{visible:true,radius:function(){return 0.4*(p.Dist(centre));},name:"c",label:{offset:[10,-10]}});
var angb = b.create('angle',[p,r,q],{visible:true,radius:function(){return 0.4*(r.Dist(centre));},name:"b",label:{offset:[-10,10]}});

function toggleElement(ele) {
	if (ele.getAttribute("visible")===true) {ele.setAttribute({visible:false});}
	else {ele.setAttribute({visible:true});}
}

var pq = b.create('segment',[p,q],{name:"B",withLabel:true,label:{offset:[-15,0],color:"#0000ff"}});
var pr = b.create('segment',[p,r],{name:"A",withLabel:true,label:{offset:[15,0],color:"#0000ff"}});
var qr = b.create('segment',[r,q],{name:"C",withLabel:true,label:{offset:[0,-10],color:"#0000ff"}});

function resize() {
	var maxY = Math.max(p.Y(),q.Y(),r.Y());
	var minY = Math.min(p.Y(),q.Y(),r.Y());
	var maxX = Math.max(p.X(),q.X(),r.X());
	var minX = Math.min(p.X(),q.X(),r.X());

	var xdiff = maxX - minX;
	var ydiff = maxY - minY;
	var marginX = xdiff/10;
	var marginY = ydiff/10;

	b.setBoundingBox([minX-marginX,maxY+marginY,maxX+marginX,minY-marginY]);
	// rqp.setAttribute({radius:0.1*(q.Dist(centre))});
	// qpr.setAttribute({radius:0.1*(p.Dist(centre))});
	// prq.setAttribute({radius:0.1*(r.Dist(centre))});
	b.update();
}

function export2SVG(){
    var svg = new XMLSerializer().serializeToString(b.renderer.svgRoot);
    var blob = new Blob([svg], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "test.svg");
}
