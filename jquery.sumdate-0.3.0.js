/*

Sintax

Directly invoke
String/Date $.sumdate(date:String/Date,functions:[],sumValues:{},pattern:String,update:boolean);
or
Selector invoke
void/Array $(selector).sumdate(functions:[],sumValues:{},pattern:String,update:boolean);

Params

selector or date

    selector: jQuery return elements html that contains date value.
    date: date value String or Date.

sumValues : {
    days: 0,
    months: 0,
    years: 0
}

functions
    sum: get values in sumValues and sum parameter date.
    stringToDate: convert a date type String in Date type
    dateToString: converte a date Type Date in String
    validate: return true if the date value is valid or return false not valid (only date a type String) not compatible another functions.

pattern:
     define format date writing

update:
    update the elements that contains the date with the result (only directly selector).
*/
(function(e){e.fn.sumdate=function(t){var r=new Array;var i=n["populaConfig"](t);e.each(this,function(){var n=e(this).val()||e(this).text();i.date=n;if(t.update){if(e(this).val()!=""){e(this).val(e.sumdate(i))}else{e(this).text(e.sumdate(i))}}else{r.push(e.sumdate(i))}});if(!t.update){return r}};e.sumdate=function(e){var t=n["populaConfig"](e);var r=t.sumValues;var i=t.date;if(t.functions.length>0){for(var s=0;s<t.functions.length;s++){i=n[t.functions[s]](i,r,t.pattern)}}return i};var t=["D","M","Y","h","m","s"];var n={sum:function(t,r,i){try{var s=false;if(e.type(t)=="string"){t=n["stringToDate"](t,r,i);s=true}var o=new Date(t.getTime());o.setMilliseconds(o.getMilliseconds()+r.milliseconds);o.setSeconds(o.getSeconds()+r.seconds);o.setMinutes(o.getMinutes()+r.minutes);o.setHours(o.getHours()+r.hours);o.setDate(o.getDate()+r.days);o.setMonth(o.getMonth()+r.months);o.setFullYear(o.getFullYear()+r.years);if(s){o=n["dateToString"](o,r,i)}return o}catch(u){console.log(u)}},stringToDate:function(t,r,i){try{if(e.type(t)=="date"){return t}var s=new Date(0);s.setHours(0);var o=n["getPos"](i);var u="";var u=new String;var a=0;var f=0;var l=0;if(o[0]=="Y"){u=i.substr(4,1)}else{u=i.substr(2,1)}var c=t.split(u);for(var h=0;h<o.length;h++){if(o[h]=="D"){a=parseInt(c[h],10)}else if(o[h]=="M"){f=parseInt(c[h],10)-1}else if(o[h]=="Y"){l=parseInt(c[h],10)}}s.setFullYear(l,f,a);return s}catch(p){console.log(p);return undefined}},dateToString:function(t,r,i){try{if(e.type(t)=="string"){return t}var s=n["getPos"](i);var o=new Array;var u=new String;var a=new String;if(s[0]=="Y"){a=i.substr(4,1)}else{a=i.substr(2,1)}for(var f=0;f<s.length;f++){if(s[f]=="D"){if(t.getDate()<10){u+="0"}u+=t.getDate()}else if(s[f]=="M"){if(t.getMonth()<9){u+="0"}u+=t.getMonth()+1}else if(s[f]=="Y"){u+=t.getFullYear()}if(f<s.length-1){u+=a}}return u}catch(l){console.log(l);return undefined}},validate:function(t,r,i){if(e.type(t)!="string"){return false}var s=n["getPos"](i);var o=new String;var u=n["stringToDate"](t,r,i);if(t==""){return true}if(s[0]=="Y"){o=t.substr(4,1)}else{o=t.substr(2,1)}var a=t.split(o);if(a.length!=3){return false}for(var f=0;f<3;f++){if(s[f]=="D"&&u.getDate()!=parseInt(a[f])){return false}else if(s[f]=="M"&&u.getMonth()+1!=parseInt(a[f])){return false}else if(s[f]=="Y"&&u.getFullYear()!=parseInt(a[f])){return false}}return true},getPos:function(t){try{var n={D:-1,M:-1,Y:-1,Y:-1,h:-1,m:-1,ss:-1};var r=new Array;var i=new Array;var s=false;n.D=t.indexOf("DD");n.M=t.indexOf("MM");n.Y=t.indexOf("YYYY");n.h=t.indexOf("hh");n.m=t.indexOf("mm");n.ss=t.indexOf("ss");e.each(n,function(e,t){r[parseInt(t,10)]=e});for(var o=0;o<r.length;o++){if(r[o]){i.push(r[o])}}return i}catch(u){return undefined}},populaConfig:function(t){var n={years:0,months:0,days:0,hours:0,minutes:0,seconds:0,milliseconds:0};var r={date:"",sumValues:{},functions:["sum"],pattern:"DD/MM/YYYY"};if(t.sumValues){e.extend(n,t.sumValues)}t.sumValues=n;if(t){e.extend(r,t)}return r}}})(jQuery)