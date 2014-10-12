/**
 * Copyright (c) 2007-2014 Radius17 - info<a>radius17<d>ru | http://radius17.ru
 * Licensed under MIT license
 * @author Radius17
 * @version 1.0.0
 */
var countDownObjects=new Array();
function countDownGetHTML(shortFormat, days, hours, minutes, seconds){
	html='';
	days1='0'; days2='0';
	hours1='0'; hours2='0';
	minutes1='0'; minutes2='0';
	seconds1='0'; seconds2='0';
	days1=( days>9 ? days.toString().charAt(0) : '0');
	days2=( days>9 ? days.toString().charAt(1) : days.toString().charAt(0));
	hours1=( hours>9 ? hours.toString().charAt(0) : '0');
	hours2=( hours>9 ? hours.toString().charAt(1) : hours.toString().charAt(0));
	minutes1=( minutes>9 ? minutes.toString().charAt(0) : '0');
	minutes2=( minutes>9 ? minutes.toString().charAt(1) : minutes.toString().charAt(0));
	seconds1=( seconds>9 ? seconds.toString().charAt(0) : '0');
	seconds2=( seconds>9 ? seconds.toString().charAt(1) : seconds.toString().charAt(0));
	if(shortFormat==false){
		html = '<div class="cd_days"><div class="cd_days1">'+days1+'</div><div class="cd_days2">'+days2+'</div><div class="cd_days_label"></div></div>'
					+'<div class="cd_separator_1"></div>';
	}
	html = html+'<div class="cd_hours"><div class="cd_hours1">'+hours1+'</div><div class="cd_hours2">'+hours2+'</div><div class="cd_hours_label"></div></div>'
				+'<div class="cd_separator_2"></div>'
				+'<div class="cd_minutes"><div class="cd_minutes1">'+minutes1+'</div><div class="cd_minutes2">'+minutes2+'</div><div class="cd_minutes_label"></div></div>'
				+'<div class="cd_separator_2"></div>'
				+'<div class="cd_seconds"><div class="cd_seconds1">'+seconds1+'</div><div class="cd_seconds2">'+seconds2+'</div><div class="cd_seconds_label"></div></div>';
	return html;
}
function proceedCountDown(cd_wrapper, shortFormat, countDownDate, cd_year, cd_month, cd_day, cd_hours, cd_minutes, cd_seconds){
	days=0;	hours=0;	minutes=0;	seconds=0;
	countDownNow=new Date();
	cd_time=countDownDate.getTime()-countDownNow.getTime()+1;
	delete countDownNow;
	if(cd_time>0) {
		cd_time=cd_time/1000;
		days=Math.floor(cd_time/86400);
		hours=Math.floor((cd_time-(days*86400))/3600);
		minutes=Math.floor((cd_time-(days*86400)-(hours*3600))/60);
		seconds=Math.floor((cd_time-(days*86400)-(hours*3600)-(minutes*60)));
		html=countDownGetHTML(shortFormat, days, hours, minutes, seconds);
		document.getElementById(cd_wrapper).innerHTML = html;
		setTimeout(function(){ proceedCountDown(cd_wrapper, shortFormat, countDownDate, cd_year, cd_month, cd_day, cd_hours, cd_minutes, cd_seconds)}, 1000);
	} else {
		html=countDownGetHTML(shortFormat, days, hours, minutes, seconds);
		document.getElementById(cd_wrapper).innerHTML = html;
	}
}
function countDownDay(wrapper, hour, minute, second){
	if(typeof(hour)=='undefined') hour=23;
	if(typeof(minute)=='undefined') minute=59;
	if(typeof(second)=='undefined') second=59;
	todayDate = new Date();
	year = todayDate.getFullYear();
	month = todayDate.getMonth();
	day = todayDate.getDate();
	shortFormat=true;
	countDownDate=new Date(year, month, day, hour, minute, second);
	var arr = new Array(wrapper, shortFormat, countDownDate, year, month, day, hour, minute, second);
	countDownObjects.push(arr);
	delete todayDate;
	delete arr;
	delete countDownDate;
}
function countDownMonth(wrapper, year, month, day, hour, minute, second){
	if(typeof(hour)=='undefined') hour=23;
	if(typeof(minute)=='undefined') minute=59;
	if(typeof(second)=='undefined') second=59;
	todayDate = new Date();
	year = todayDate.getFullYear();
	month = todayDate.getMonth();
  lastMonthDayDate = new Date(year, month+1, 0);
  day = lastMonthDayDate.getDate();
	shortFormat=false;
	countDownDate=new Date(year, month, day, hour, minute, second);
	var arr = new Array(wrapper, shortFormat, countDownDate, year, month, day, hour, minute, second);
	countDownObjects.push(arr);
	delete lastMonthDayDate;
	delete arr;
	delete countDownDate;
}
function countDown(wrapper, year, month, day, hour, minute, second){	if(typeof(hour)=='undefined') hour=23;
	if(typeof(minute)=='undefined') minute=59;
	if(typeof(second)=='undefined') second=59;
	month=month-1;
	shortFormat=false;
	countDownDate=new Date(year, month, day, hour, minute, second);
	var arr = new Array(wrapper, shortFormat, countDownDate, year, month, day, hour, minute, second);
	countDownObjects.push(arr);
	delete arr;
	delete countDownDate;
}
window.onload=function(){	if(countDownObjects.length>0){		for(var i in countDownObjects) {			var arr = countDownObjects[i];			proceedCountDown(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7], arr[8]);
			delete arr;
		}	}}