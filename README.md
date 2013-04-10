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
        alert(data); // 03/01/1983 return String type.
    </code>
</pre>

####stringToDate
<pre>
    <code>
        var data = '02/12/1982';
        data = $.sumdate({functions:['stringToDate'],date: data});
        alert(data); // Thu Dec 02 1982 00:00:00 GMT-0200 return Date type.
    </code>
</pre>

####dateToString
<pre>
    <code>
        var data =  new Date('1982-12-02T00:00:00.0');
        data = $.sumdate({functions:['dateToString'],date: data});
        alert(data); // 02/12/1982 return type String
    </code>
</pre>

####validate
<pre>
    <code>
        var valid= $.sumdate({ date: '28/02/2010', functions: ['validate'] });
        alert(valid); // true;
        valid = $.sumdate({ date: '29/02/2010', functions: ['validate']});
        alert(valid); // false;
    </code>
</pre>

####between
<pre>
    <code>
        var sumValues = $.sumdate({ date: '28/02/2010', functions: ['between'], anotherDate: '02/04/2012' });
        /* 
            The return is json type:
            sumValues = {
                "years": 2,
                "months": 1,
                "days": 3, -> 2012 is bissextile!
                "hours": 0,
                "minutes": 0,
                "seconds": 0
            };
        */
    </code>
</pre>
