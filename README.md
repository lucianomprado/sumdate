sumdate
=======

Jquery plugin used to sum and validate dates


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

anotherDate: date value String or Date (only used with in function between).
    
sumValues : {
    days: 0,
    months: 0,
    years: 0,
    "hours": 0,
    "minutes": 0,
    "seconds": 0,
}

functions
    sum: get values in sumValues and sum parameter date.
    stringToDate: convert a date type String in Date type
    dateToString: converte a date Type Date in String
    validate: return true if the date value is valid or return false not valid (only date a type String) not compatible another functions.
    between: return sumVelues (json), get a difference between parameters anotherDate and date/selector.

pattern:
     define format date writing

update:
    update the elements that contains the date with the result (only directly selector).