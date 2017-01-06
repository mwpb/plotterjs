JXG.Options.text.display = 'internal';
JXG.Options.grid.snapToGrid = true;
var brd = JXG.JSXGraph.initBoard('box', 
	{	
		boundingbox: [-0.1, 1.1, 1.1, -0.1], 
		axis:false,
		showCopyright:false,
		showNavigation:false
	}
);


//points
var p = brd.create('point',[0,0],{name:"p",snapToGrid:true,snapSizeY:0.1,snapSizeX:0.1,label:{offset:[-15,-10]}});
var q = brd.create('point',[0,1],{name:"q",snapToGrid:true,snapSizeY:0.1,snapSizeX:0.1,label:{offset:[0,15]}});
var r = brd.create('point',[1,0],{name:"r",snapToGrid:true,snapSizeY:0.1,snapSizeX:0.1,label:{offset:[10,-10]}});

var centre = brd.create('point',[function(){return (1/3)*(p.X()+q.X()+r.X());},function(){return (1/3)*(p.Y()+q.Y()+r.Y());}],{visible:false});

//angles
var a = brd.create('angle',[r,p,q],{visible:true,radius:function(){return 0.4*(p.Dist(centre));},name:"a",label:{offset:[-5,-5]}});
var b = brd.create('angle',[p,q,r],{visible:true,radius:function(){return 0.4*(q.Dist(centre));},name:"b",label:{offset:[0,0]}});
var c = brd.create('angle',[q,r,p],{visible:true,radius:function(){return 0.4*(r.Dist(centre));},name:"c",label:{offset:[0,-5]}});

//lines
var A = brd.create('segment',[q,r],{name:"A",withLabel:true,label:{offset:[10,10],color:"#0000ff"}});
var B = brd.create('segment',[p,r],{name:"B",withLabel:true,label:{offset:[0,-10],color:"#0000ff"}});
var C = brd.create('segment',[p,q],{name:"C",withLabel:true,label:{offset:[-15,10],color:"#0000ff"}});

function updateLabel(ele){
	var eleName = ele.getAttribute('name');
	var inputStr = document.getElementById(eleName).value;
	ele.setAttribute({name:inputStr});
}

function updateAll(){
	var eles = [a,b,c,A,B,C];
	for (var i=0;i<eles.length;i++){
		updateLabel(eles[i]);
	}
}

function toggleElement(ele){
	if (ele.getAttribute("visible")===true) {ele.setAttribute({visible:false});}
	else {ele.setAttribute({visible:true});}
}

function togglePQR(){
	var eles = [p,q,r];
	for (var i=0;i<eles.length;i++){
		toggleElement(eles[i]);
	}
}

function resize() {
	var maxY = Math.max(p.Y(),q.Y(),r.Y());
	var minY = Math.min(p.Y(),q.Y(),r.Y());
	var maxX = Math.max(p.X(),q.X(),r.X());
	var minX = Math.min(p.X(),q.X(),r.X());

	var xdiff = maxX - minX;
	var ydiff = maxY - minY;
	var marginX = xdiff/10;
	var marginY = ydiff/10;

	brd.setBoundingBox([minX-marginX,maxY+marginY,maxX+marginX,minY-marginY]);
	// rqp.setAttribute({radius:0.1*(q.Dist(centre))});
	// qpr.setAttribute({radius:0.1*(p.Dist(centre))});
	// prq.setAttribute({radius:0.1*(r.Dist(centre))});
	brd.update();
}

function export2SVG(){
    var svg = new XMLSerializer().serializeToString(brd.renderer.svgRoot);
    var blob = new Blob([svg], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "test.svg");
}