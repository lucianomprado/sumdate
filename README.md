## sumdate

Jquery plugin used to sum and validate dates


###Sintax

Directly invoke<br />
String/Date $.sumdate(date:String/Date,functions:[],sumValues:{},pattern:String,update:boolean);<br />
or<br />
Selector invoke<br />
void/Array $(selector).sumdate(functions:[],sumValues:{},pattern:String,update:boolean);<br />

###Params

selector or date

    selector: jQuery return elements html that contains date value.
    date: date value String or Date.

anotherDate: date value String or Date (only used with in function between).
<pre>
    <code>
        sumValues : {
            days: 0,
            months: 0,
            years: 0,
            "hours": 0,
            "minutes": 0,
            "seconds": 0,
        }
    </code>
</pre>
pattern:<br />
     define format date writing

update:
    update the elements that contains the date with the result (only directly selector).<br />

###functions

sum: get values in sumValues and sum parameter date.<br />
stringToDate: convert a date type String in Date type.<br />
dateToString: converte a date Type Date in String.<br />
validate: return true if the date value is valid or return false not valid (only date a type String) not compatible another functions.<br />
between: return sumVelues (json), get a difference between parameters anotherDate and date/selector.<br />

Ex:<br />

####sum
<pre>
    <code>
        var data = '02/12/1982';
        data = $.sumdate({functions:['sum'],sumValues:{days:1,months:1},date: data});
        alert(data); // 03/01/1983 retorno do tipo String
    </code>
</pre>
