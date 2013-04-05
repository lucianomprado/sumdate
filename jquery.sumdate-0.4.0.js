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
    years: 0,
    "hours": 0,
    "minutes": 0,
    "seconds": 0,
    "milliseconds": 0
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
;(function (e) { e.fn.sumdate = function (t) { var r = new Array; var i = n["populaConfig"](t); e.each(this, function () { var n = e(this).val() || e(this).text(); i.date = n; if (t.update) { if (e(this).val() != "") { e(this).val(e.sumdate(i)) } else { e(this).text(e.sumdate(i)) } } else { r.push(e.sumdate(i)) } }); if (!t.update) { return r } }; e.sumdate = function (e) { var t = n["populaConfig"](e); var r = t.sumValues; var i = t.date; if (t.functions.length > 0) { for (var s = 0; s < t.functions.length; s++) { i = n[t.functions[s]](i, r, t.pattern) } } return i }; var t = ["D", "M", "Y", "h", "m", "s"]; var n = { sum: function (t, r, i) { try { var s = false; if (e.type(t) == "string") { t = n["stringToDate"](t, r, i); s = true } var o = new Date(t.getTime()); o.setMilliseconds(o.getMilliseconds() + r.milliseconds); o.setSeconds(o.getSeconds() + r.seconds); o.setMinutes(o.getMinutes() + r.minutes); o.setHours(o.getHours() + r.hours); o.setDate(o.getDate() + r.days); o.setMonth(o.getMonth() + r.months); o.setFullYear(o.getFullYear() + r.years); if (s) { o = n["dateToString"](o, r, i) } return o } catch (u) { console.log(u) } }, stringToDate: function (t, n, r) { try { if (e.type(t) == "date") { return t } var i = new Date(0); i.setHours(0); var s = new SplitDate(t, r); var o = s.getOrder(); var u = s.getCharsSep(); var a = 0; var f = 0; var l = 0; var c = 0; var h = 0; var p = 0; var d = 0; var v = s.split(); var m = v[1]; var g = v[0]; for (var y = 0; y < r.length; y++) { if (o.D == y) { a = parseInt(m[d], 10); d++ } else if (o.M == y) { f = parseInt(m[d], 10) - 1; d++ } else if (o.Y == y) { l = parseInt(m[d], 10); d++ } } i.setFullYear(l, f, a); if (g != "") { d = 0; for (var y = 0; y < r.length; y++) { if (o.h == y) { c = parseInt(g[d], 10); d++ } else if (o.m == y) { h = parseInt(g[d], 10); d++ } else if (o.ss == y) { p = parseInt(g[d], 10); d++ } } i.setHours(c); i.setMinutes(h); i.setSeconds(p) } return i } catch (b) { console.log(b); return undefined } }, dateToString: function (t, n, r) { try { if (e.type(t) == "string") { return t } var i = new Array; var s = new String; var o = new SplitDate("", r); var u = o.getOrder(); var a = o.getCharsSep(); var f = 0; var l = 0; for (var c = 0; c < r.length; c++) { if (u.D == c) { if (t.getDate() < 10) { s += "0" } s += t.getDate(); if (f < 2) { s += a.date } f++ } else if (u.M == c) { if (t.getMonth() < 10) { s += "0" } s += t.getMonth() + 1; if (f < 2) { s += a.date } f++ } else if (u.Y == c) { s += t.getFullYear(); if (f < 2) { s += a.date } f++ } if (u.h == c) { if (t.getHours() < 10) { s += "0" } s += t.getHours(); if (l < 2) { s += a.time } l++ } else if (u.m == c) { if (t.getMinutes() < 10) { s += "0" } s += t.getMinutes(); if (l < 2) { s += a.time } l++ } else if (u.ss == c) { if (t.getSeconds() < 10) { s += "0" } s += t.getSeconds(); if (l < 2) { s += a.time } l++ } if (a.divDT != "null" && f == 3 ^ l == 3) { s += a.divDT; a.divDT = "null" } } return s } catch (h) { console.log(h); return undefined } }, validate: function (t, r, i) { if (e.type(t) != "string") { return false } var s = n["getPos"](i); var o = n["charSep"](t, i); var u = n["stringToDate"](t, r, i); if (t == "") { return true } var a = t.split(o); if (a.length / 3 == 0) { return false } for (var f = 0; f < 6; f++) { if (s.D == f && u.getDate() != parseInt(a[f])) { return false } else if (s[f] == "M" && u.getMonth() + 1 != parseInt(a[f])) { return false } else if (s[f] == "Y" && u.getFullYear() != parseInt(a[f])) { return false } } return true }, getPos: function (e) { try { var t = { D: -1, M: -1, Y: -1, Y: -1, h: -1, m: -1, ss: -1 }; t.D = e.indexOf("DD"); t.M = e.indexOf("MM"); t.Y = e.indexOf("YYYY"); t.h = e.indexOf("hh"); t.m = e.indexOf("mm"); t.ss = e.indexOf("ss"); return t } catch (n) { return undefined } }, charsSeps: function (t, n) { var r = ""; var i = ""; var s = null; var o = 0; var u = 0; if (n.D > 0 || n.M > 0) { if (n.D < n.Y) { r = t.substr(n.D + 2, 1); if (n.D > n.M) { o = n.M } else { o = n.D } } else { r = t.substr(n.Y + 4, 1); if (n.Y > n.M) { o = n.M } else { o = n.Y } } } if (n.h > 0 || n.m > 0) { if (n.h < n.m) { i = t.substr(n.h + 2, 1); if (n.h > n.ss) { u = n.ss } else { u = n.h } } else { i = t.substr(n.m + 2, 1); if (n.m > n.ss) { u = n.ss } else { u = n.m } } } if (o > 0 && u > 0) { if (o > u) { s = t.substr(o - 1, 1) } else { s = t.substr(u - 1, 1) } } var a = '{ "date": "' + r + '", "time": "' + i + '", "divDT": "' + s + '"}'; return e.parseJSON(a) }, populaConfig: function (t) { var n = { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }; var r = { date: "", sumValues: {}, functions: ["sum"], pattern: "DD/MM/YYYY" }; if (t.sumValues) { e.extend(n, t.sumValues) } t.sumValues = n; if (t) { e.extend(r, t) } return r } }; SplitDate = function (e, t) { var r = e; var i = n["getPos"](t); var s = n["charsSeps"](t, i); this.getOrder = function () { return i }; this.getCharsSep = function () { return s }; this.split = function () { var e = ""; var t = ""; if (s.divDT != "null") { if (i.h > i.Y) { e = r.split(s.divDT)[0].split(s.date); t = r.split(s.divDT)[1].split(s.time) } else { e = r.split(s.divDT)[1].split(s.date); t = r.split(s.divDT)[0].split(s.time) } } else { if (s.date != "") { e = r.split(s.date) } else { t = r.split(s.time) } } return [t, e] } } })(jQuery);