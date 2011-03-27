/**
 * jQuery.timers - Timer abstractions for jQuery
 * Written by Blair Mitchelmore (blair DOT mitchelmore AT gmail DOT com)
 * Licensed under the WTFPL (http://sam.zoy.org/wtfpl/).
 * Date: 2009/02/08
 *
 * @author Blair Mitchelmore
 * @version 1.1.2
 *
 **/
jQuery.fn.extend({everyTime:function(b,c,d,e,a){return this.each(function(){jQuery.timer.add(this,b,c,d,e,a)})},oneTime:function(a,b,c){return this.each(function(){jQuery.timer.add(this,a,b,c,1)})},stopTime:function(a,b){return this.each(function(){jQuery.timer.remove(this,a,b)})}});jQuery.event.special;jQuery.extend({timer:{global:[],guid:1,dataKey:"jQuery.timer",regex:/^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/,powers:{ms:1,cs:10,ds:100,s:1000,das:10000,hs:100000,ks:1000000},timeParse:function(c){if(c==undefined||c==null){return null}var a=this.regex.exec(jQuery.trim(c.toString()));if(a[2]){var b=parseFloat(a[1]);var d=this.powers[a[2]]||1;return b*d}else{return c}},add:function(e,c,h,g,b,f){var a=0;if(jQuery.isFunction(h)){if(!b){b=g}g=h;h=c}c=jQuery.timer.timeParse(c);if(typeof c!="number"||isNaN(c)||c<=0){return}if(b&&b.constructor!=Number){f=!!b;b=0}b=b||0;f=f||false;var d=jQuery.data(e,this.dataKey)||jQuery.data(e,this.dataKey,{});if(!d[h]){d[h]={}}g.timerID=g.timerID||this.guid++;var i=function(){if(f&&this.inProgress){return}this.inProgress=true;if((++a>b&&b!==0)||g.call(e,a)===false){jQuery.timer.remove(e,h,g)}this.inProgress=false};i.timerID=g.timerID;if(!d[h][g.timerID]){d[h][g.timerID]=window.setInterval(i,c)}this.global.push(e)},remove:function(c,b,d){var e=jQuery.data(c,this.dataKey),a;if(e){if(!b){for(b in e){this.remove(c,b,d)}}else{if(e[b]){if(d){if(d.timerID){window.clearInterval(e[b][d.timerID]);delete e[b][d.timerID]}}else{for(var d in e[b]){window.clearInterval(e[b][d]);delete e[b][d]}}for(a in e[b]){break}if(!a){a=null;delete e[b]}}}for(a in e){break}if(!a){jQuery.removeData(c,this.dataKey)}}}}});jQuery(window).bind("unload",function(){jQuery.each(jQuery.timer.global,function(a,b){jQuery.timer.remove(b)})});
/**
 * From: http://blog.mastykarz.nl/jquery-random-filter/
 */
jQuery.jQueryRandom=0;jQuery.extend(jQuery.expr[":"],{random:function(c,d,b,e){if(d==0){jQuery.jQueryRandom=Math.floor(Math.random()*e.length)}return d==jQuery.jQueryRandom}});

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
	$('.fg-color').css('color',color);
	$('.bg-color').css('background-color',color);
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

function tab_click(event,ui) {
	setTargetObj($(ui.tab).css('color'));
}

$(document).ready(function(){
	$('a.top').hide();
	$("#content").tabs({select: tab_click});
	var color = $('div#content li:random').css('color');
	$('.fg-color').css('color',color);
	$('.bg-color').css('background-color',color);
	setTargetObj(color);
});