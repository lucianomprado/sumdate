(function(e){e.fn.sumdate=function(t){var i=new Array;var s=n["populaConfig"](t);var o=new Array;e.each(this,function(){var n=e(this).val()||e(this).text();s.date=n;try{if(t.update){if(e(this).val()!=""){e(this).val(e.sumdate(s))}else{e(this).text(e.sumdate(s))}}else{i.push(e.sumdate(s))}}catch(r){var u={ok:false,msg:r,fieldMSG:e(this).attr("msg"),fieldID:e(this).attr("id"),fieldName:e(this).attr("name")};o.push(u)}});if(o.length>0&&s.internationalisation.display){var u=0;var a=r.error+"<br/>";for(u=0;u<o.length;u++){a+=(o[u].fieldMSG||o[u].fieldID||o.fieldName)+": "+o[u].msg+(u<o.length-1?"<br/>":"")}if(s.internationalisation.divErrorId){e("#"+s.internationalisation.divErrorId).html(a)}if(o.length>0&&s.internationalisation.jsonError){var f={errors:o,values:i};return f}}if(!t.update){return i}};e.sumdate=function(e){var t=n["populaConfig"](e);if(t.functions.length>0){for(var r=0;r<t.functions.length;r++){i=n[t.functions[r]](t)}}return i};var t=["D","M","Y","h","m","s"];var n={sum:function(t){var i=t.sumValues;var s=t.date;var o=false;if(e.type(s)=="string"){if(!n.validate(t)){throw r.invalidDate}s=n.stringToDate(t);o=true}var u=new Date(s.getTime());u.setMilliseconds(u.getMilliseconds()+i.milliseconds);u.setSeconds(u.getSeconds()+i.seconds);u.setMinutes(u.getMinutes()+i.minutes);u.setHours(u.getHours()+i.hours);u.setDate(u.getDate()+i.days);if(i.days>0){u.setMonth(u.getMonth()+i.months)}else{var a=n.getMaxDayOfMonth(s.getMonth()+i.months,s.getFullYear());u.setDate(s.getDate()>a?a:s.getDate());u.setMonth(u.getMonth()+i.months)}u.setFullYear(u.getFullYear()+i.years);t.date=u;if(o){u=n["dateToString"](t)}return u},stringToDate:function(t){var n=t.sumValues;var r=t.date;var i=t.pattern;if(e.type(r)=="date"){return r}var s=new Date(0);s.setHours(0);var o=new SplitDate(r,i);var u=o.getOrder();var a=o.getCharsSep();var f=0;var l=0;var c=0;var h=0;var p=0;var d=0;var v=0;var m=o.split();var g=m[1];var y=m[0];for(var b=0;b<i.length;b++){if(u.D==b){f=parseInt(g[v],10);v++}else if(u.M==b){l=parseInt(g[v],10)-1;v++}else if(u.Y==b){c=parseInt(g[v],10);v++}}s.setFullYear(c,l,f);if(y!=""){v=0;for(var b=0;b<i.length;b++){if(u.h==b){h=parseInt(y[v],10);v++}else if(u.m==b){p=parseInt(y[v],10);v++}else if(u.ss==b){d=parseInt(y[v],10);v++}}s.setHours(h);s.setMinutes(p);s.setSeconds(d)}return s},dateToString:function(t){var n=t.sumValues;var r=t.date;var i=t.pattern;if(e.type(r)=="string"){return r}var s=new Array;var o=new String;var u=new SplitDate("",i);var a=u.getOrder();var f=u.getCharsSep();var l=0;var c=0;for(var h=0;h<i.length;h++){if(a.D==h){if(r.getDate()<10){o+="0"}o+=r.getDate();if(l<2){o+=f.date}l++}else if(a.M==h){if(r.getMonth()<10){o+="0"}o+=r.getMonth()+1;if(l<2){o+=f.date}l++}else if(a.Y==h){o+=r.getFullYear();if(l<2){o+=f.date}l++}if(a.h==h){if(r.getHours()<10){o+="0"}o+=r.getHours();if(c<2){o+=f.time}c++}else if(a.m==h){if(r.getMinutes()<10){o+="0"}o+=r.getMinutes();if(c<2){o+=f.time}c++}else if(a.ss==h){if(r.getSeconds()<10){o+="0"}o+=r.getSeconds();if(c<2){o+=f.time}c++}if(f.divDT!="null"&&l==3^c==3){o+=f.divDT;f.divDT="null"}}return o},validate:function(t){var r=t.date;var i=t.pattern;if(e.type(r)!="string"){return false}var s=n["getPos"](i);var o=n["charsSeps"](i,s);var u=n["stringToDate"](t);if(r==""){return true}var a=[];if(o.divDT!="null"){var f=r.split(o.divDT);if(s.D<s.h){a.splice(-1,0,f[0].split(o.date));a.splice(-1,0,f[1].split(o.time))}else{a.splice(-1,0,f[1].split(o.date));a.splice(-1,0,f[0].split(o.time))}}else if(o.date!=""){a=r.split(o.date)}else if(o.time!=""){a=r.split(o.time)}for(var l=0;l<a.length;l++){if(s.D==l&&u.getDate()!=parseInt(a[l])){return false}else if(s[l]=="M"&&u.getMonth()+1!=parseInt(a[l])){return false}else if(s[l]=="Y"&&u.getFullYear()!=parseInt(a[l])){return false}else if(s[l]=="h"&&u.gethours()!=parseInt(a[l])){return false}else if(s[l]=="m"&&u.getMinutes()!=parseInt(a[l])){return false}else if(s[l]=="ss"&&u.getSeconds()!=parseInt(a[l])){return false}}return true},between:function(t){var i=t;var s=t.date;var o=t.anotherDate;if(e.type(s)=="string"){if(!n["validate"](i)){throw r.invalidDate}s=n["stringToDate"](t)}if(e.type(o)=="string"){i.date=o;if(!n["validate"](i)){throw r.invalidDate+" ("+r.inAnotherDate+")"}o=n["stringToDate"](i)}var u=o.getTime()-s.getTime();u=u<0?u*-1:u;var a=new Date(u);var f={years:0,months:0,days:0,hours:0,minutes:0,seconds:0,milliseconds:0};f.years=a.getUTCFullYear()-1970;f.months=a.getUTCMonth();f.days=a.getUTCDate()-1;f.hours=a.getUTCHours();f.minutes=a.getUTCMinutes();f.milliseconds=a.getUTCMilliseconds();return f},getPos:function(e){var t={D:-1,M:-1,Y:-1,h:-1,m:-1,ss:-1};t.D=e.indexOf("DD");t.M=e.indexOf("MM");t.Y=e.indexOf("YYYY");t.h=e.indexOf("hh");t.m=e.indexOf("mm");t.ss=e.indexOf("ss");if(t.D==-1&&t.M==-1&&t.Y&&t.h==-1&&t.m==-1&&t.ss==-1){throw r.invalidPattern}return t},charsSeps:function(t,n){var i="";var s="";var o=null;var u=0;var a=0;if(n.D>0||n.M>0){if(n.D<n.Y){i=t.substr(n.D+2,1);if(n.Y>n.M){u=n.Y}else{u=n.M}}else{i=t.substr(n.Y+4,1);if(n.D>n.M){u=n.D}else{u=n.M}}}if(n.h>0||n.m>0){if(n.h<n.m){s=t.substr(n.h+2,1);if(n.h>n.ss){a=n.ss}else{a=n.h}}else{s=t.substr(n.m+2,1);if(n.m>n.ss){a=n.ss}else{a=n.m}}}if(u>0&&a>0){if(u>a){o=t.substr(u-1,1)}else{o=t.substr(a-1,1)}}if(i==""&&s==""){throw r.invalidPattern}var f='{ "date": "'+i+'", "time": "'+s+'", "divDT": "'+o+'"}';return e.parseJSON(f)},populaConfig:function(t){var n={years:0,months:0,days:0,hours:0,minutes:0,seconds:0,milliseconds:0};var i={error:"Error",invalidDate:"invalid date",invalidPattern:"invalid pattern",inAnotherDate:"in another date"};var s={language:{},display:false,divErrorId:undefined,jsonError:true};var o={date:"",anotherDate:"",sumValues:{},functions:["sum"],pattern:"DD/MM/YYYY",internationalisation:{}};if(t){if(t.sumValues){e.extend(n,t.sumValues)}if(t.internationalisation){e.extend(s,t.internationalisation)}if(t.internationalisation&&t.internationalisation.language){e.extend(i,t.internationalisation.language)}t.sumValues=n;t.internationalisation=s;t.internationalisation.language=i;e.extend(o,t)}r=o.internationalisation.language;return o},getMaxDayOfMonth:function(e,t){var n=new Date(0);n.setHours(0);n.setMonth(parseInt(e,10));n.setFullYear(parseInt(t,10));var r=32;do{n.setMonth(parseInt(e,10));r=r-1;n.setDate(r)}while(n.getMonth()!=e);return r}};SplitDate=function(e,t){var i=e;var s=n["getPos"](t);var o=n["charsSeps"](t,s);this.getOrder=function(){return s};this.getCharsSep=function(){return o};this.split=function(){var e="";var t="";if(o.divDT!="null"){if(s.h>s.Y){e=i.split(o.divDT)[0].split(o.date);t=i.split(o.divDT)[1].split(o.time)}else{e=i.split(o.divDT)[1].split(o.date);t=i.split(o.divDT)[0].split(o.time)}}else{if(o.date!=""){e=i.split(o.date)}else{t=i.split(o.time)}}if((i!=""&&e==""||e==undefined)&&(t==""||t==undefined)){throw r.invalidDate}return[t,e]}};var r={};var i={ok:true,valor:"",msg:""}})(jQuery)