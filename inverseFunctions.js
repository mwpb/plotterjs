JXG.Options.text.display = 'internal';
var b = JXG.JSXGraph.initBoard('box', 
	{	
		boundingbox: [-5,1.5,12,-1.5], 
		axis:false,
		showCopyright:false,
		showNavigation:false
	}
);
var xaxis = b.create('axis',[[0,0],[1,0]],{ticks:{scale:Math.PI,scaleSymbol:"PI"}});
var yaxis = b.create('axis',[[0,0],[0,1]]);

var func = b.create('functiongraph',[function(x){return Math.sin(x);}]);
var invMin = b.create('point',[-Math.PI/2,0],{visible:false});
var invMax = b.create('point',[Math.PI/2,0],{visible:false});
var invRange = b.create('segment',[invMin,invMax],{strokeColor:"#00ff00"});

var outPoint1 = b.create('point',[0,0.5],{visible:false});
var outPoint2 = b.create('point',[1,0.5],{visible:false});
var output = b.create('line',[outPoint1,outPoint2],{visible:false});

var intersection = b.create('intersection',[output,yaxis,0],{withLabel:false,color:"#00ff00"});

var i0 = b.create('intersection',[output,func,0],{withLabel:false});
var i1 = b.create('intersection',[output,func,1],{withLabel:false});
var i2 = b.create('intersection',[output,func,2],{withLabel:false});
var i3 = b.create('intersection',[output,func,3],{withLabel:false});
var i4 = b.create('intersection',[output,func,4],{withLabel:false});
var i5 = b.create('intersection',[output,func,5],{withLabel:false});
var i6 = b.create('intersection',[output,func,6],{withLabel:false});
var i7 = b.create('intersection',[output,func,7],{withLabel:false});
var i8 = b.create('intersection',[output,func,8],{withLabel:false});
var i9 = b.create('intersection',[output,func,9],{withLabel:false});

function redrawFunc(){
	var txtraw = document.getElementById('func').value;
    var f = b.jc.snippet(txtraw, true, 'x', true);
    func.Y = f;
    func.updateCurve();
    b.update();
}

function redrawAxes(){
	var xmin = document.getElementById('xmin').value;
	var xmax = document.getElementById('xmax').value;
	var ymin = document.getElementById('ymin').value;
	var ymax = document.getElementById('ymax').value;
	b.setBoundingBox([xmin, ymax, xmax, ymin]);
	b.update();
}

function updateRangeInv(){
	var invMinVal = document.getElementById('invMin').value;
	console.log(invMinVal);
	var invMaxVal = document.getElementById('invMax').value;
	console.log(invMaxVal);
	invMin.setPositionDirectly(JXG.COORDS_BY_USER,[invMinVal,0],[invMin.X(),invMin.Y()]);
	invMax.setPositionDirectly(JXG.COORDS_BY_USER,[invMaxVal,0],[invMax.X(),invMax.Y()]);
	b.update();
}

function export2SVG(){
    var svg = new XMLSerializer().serializeToString(b.renderer.svgRoot);
    var blob = new Blob([svg], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "test.svg");
}

function plotInverses(){
	var outPutValue = document.getElementById('output').value;
	outPoint1.setPositionDirectly(JXG.COORDS_BY_USER,[0,outPutValue],[outPoint1.X(),outPoint1.Y()]);
	outPoint2.setPositionDirectly(JXG.COORDS_BY_USER,[1,outPutValue],[outPoint2.X(),outPoint2.Y()]);
	b.update();
}

function toggleInverses(){
	var ints = [intersection,i0,i1,i2,i3,i4,i5,i6,i7,i8,i9];
	if (intersection.getAttribute('visible')===true) {
		for (var i=0;i<ints.length;i++){
			ints[i].setAttribute({visible:false});
		}
	}
	else {
		for (var i=0;i<ints.length;i++){
			ints[i].setAttribute({visible:true});
		}
	}
}

// var p = b.create('point',[0,1],{name:"p",snapToGrid:true,snapSizeY:0.1,snapSizeX:0.1});
// var q = b.create('point',[0,0],{name:"q",snapToGrid:true,snapSizeY:0.1,snapSizeX:0.1,label:{offset:[-15,-10]}});
// var r = b.create('point',[1,0],{name:"r",snapToGrid:true,snapSizeY:0.1,snapSizeX:0.1});

// var centre = b.create('point',[function(){return (1/3)*(p.X()+q.X()+r.X());},function(){return (1/3)*p.Y()+q.Y()+r.Y();}],{visible:false});

// var a = b.create('angle',[r,q,p],{visible:true,radius:function(){return 0.4*(q.Dist(centre));},name:"a",label:{offset:[10,10]}});
// var c = b.create('angle',[q,p,r],{visible:true,radius:function(){return 0.4*(p.Dist(centre));},name:"c",label:{offset:[10,-10]}});
// var angb = b.create('angle',[p,r,q],{visible:true,radius:function(){return 0.4*(r.Dist(centre));},name:"b",label:{offset:[-10,10]}});

// function toggleElement(ele) {
// 	if (ele.getAttribute("visible")===true) {ele.setAttribute({visible:false});}
// 	else {ele.setAttribute({visible:true});}
// }

// var pq = b.create('segment',[p,q],{name:"B",withLabel:true,label:{offset:[-15,0],color:"#0000ff"}});
// var pr = b.create('segment',[p,r],{name:"A",withLabel:true,label:{offset:[15,0],color:"#0000ff"}});
// var qr = b.create('segment',[r,q],{name:"C",withLabel:true,label:{offset:[0,-10],color:"#0000ff"}});

// function resize() {
// 	var maxY = Math.max(p.Y(),q.Y(),r.Y());
// 	var minY = Math.min(p.Y(),q.Y(),r.Y());
// 	var maxX = Math.max(p.X(),q.X(),r.X());
// 	var minX = Math.min(p.X(),q.X(),r.X());

// 	var xdiff = maxX - minX;
// 	var ydiff = maxY - minY;
// 	var marginX = xdiff/10;
// 	var marginY = ydiff/10;

// 	b.setBoundingBox([minX-marginX,maxY+marginY,maxX+marginX,minY-marginY]);
// 	// rqp.setAttribute({radius:0.1*(q.Dist(centre))});
// 	// qpr.setAttribute({radius:0.1*(p.Dist(centre))});
// 	// prq.setAttribute({radius:0.1*(r.Dist(centre))});
// 	b.update();
// }


