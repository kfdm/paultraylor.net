var r = 0,g = 0,b = 0,tr = 0,tg = 0,tb = 0;

function setTarget(nr,ng,nb) {
	$(document).stopTime();
	tr = nr;
	tg = ng;
	tb = nb;
	//console.log('Set rgb('+nr+','+ng+','+nb+')');
	$(document).everyTime(100,updateColors);
}

function updateColors() {
	rd = Math.ceil( Math.abs(r-tr)/4 );
	bd = Math.ceil( Math.abs(b-tb)/4 );
	gd = Math.ceil( Math.abs(g-tg)/4 );
	
	if(r!=tr) r = (r<tr)?r+rd:r-rd;
	if(g!=tg) g = (g<tg)?g+gd:g-gd;
	if(b!=tb) b = (b<tb)?b+bd:b-bd;

	var color = 'rgb('+r+','+g+','+b+')';
	$('body').css('background-color',color);
	$('#header').css('color',color);
	$('#footer').css('color',color);
	if((r==tr)&&(g==tg)&&(b==tb)) {
		$(document).stopTime();
	}
}

function setTargetObj(color) {
	var colorRegExp = /rgb\((\d+), (\d+), (\d+)\)/i;
	color =  colorRegExp.exec(color);
	if(color==null) return;
	setTarget(color[1],color[2],color[3]);
}

$(document).ready(function(){
	$("#accordion").accordion({
		autoHeight: false,
		changestart: function(event,ui) {
			setTargetObj(ui.newHeader.css('background-color'));
		}
	});
	var color = $('h3:random').css('color');
	$('#header').css('color',color);
	$('#footer').css('color',color);
	setTargetObj(color);
});