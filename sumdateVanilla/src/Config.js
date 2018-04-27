var Internationalisation = require('./Internationalisation');
/**
* @class Config
*
*/
class Config {

    /**
    * Create a config
    */
    constructor(){

        this._date = '';
        this._dateObj = new Date();
        this._anotherDate='';
        this._sumValues = new SumValues();
        this._functions = ['sum'];
        this._pattern = 'DD/MM/YYYY hh:mm:ss';
        this._internationalisation = new Internationalisation();
    }
    /**
    * @return {String}
    */
    get date() {
        return this._date;
    }

    /**
    * @param {String} date
    */
    set date(date) {

        this._date = date;
    }
    /**
     * @return {Date}
     */
    get dateObj(){

        return this._dateObj;
    }
    /**
     * @param {Date} date
     */
    set dateObj(date){

        this._dateObj = date;
    }
    /**
    * @return {String}
    */
    get anotherDate() {
        return this._anotherDate;
    }

    /**
    * @param {String} anotherDate
    */
    set anotherDate(anotherDate) {

        this._anotherDate = anotherDate;
    }
    /**
    * @return {SumValues}
    * @see SumValues
    */
    get sumValues() {
        return this._sumValues;
    }

    /**
    * @param {SumValues} sumValues
    * @see SumValues
    */
    set sumValues(sumValues) {

        this._sumValues = sumValues;
    }
    /**
    * @return {Array}
    */
    get functions() {
        return this._functions;
    }

    /**
    * @param {Array} functions
    */
    set functions(functions) {

        this._functions = functions;
    }
    /**
    * @return {String}
    */
    get pattern() {
        return this._pattern;
    }

    /**
    * @param {String} pattern
    */
    set pattern(pattern) {

        this._pattern = pattern;
    }
    /**
    * @return {Internationalisation}
    * @see Internationalisation
    */
    get internationalisation() {
        return this._internationalisation;
    }

    /**
    * @param {Internationalisation} internationalisation
    * @see Internationalisation
    */
    set internationalisation(internationalisation) {

        this._internationalisation = internationalisation;
    }
};


/**
* @class
*
*/
 class SumValues{

    /**
    * Create a sumValues
    */
    constructor(){

        this._years= 0;
        this._months = 0,
        this._days= 0;
        this._hours = 0;
        this._minutes = 0;
        this._seconds = 0;
    }

    /**
    * @return {Number}
    */
    get years() {
        return this._years;
    }

    /**
    * @param {number} years
    */
    set years(years) {

        this._years = years;
    }

    /**
    * @return {Number}
    */
    get months() {
        return this._months;
    }

    /**
    * @param {number} months
    */
    set months(months) {

        this._months = months;
    }
    /**
    * @return {Number}
    */
    get days() {
        return this._days;
    }

    /**
    * @param {number} days
    */
    set days(days) {

        this._days = days;
    }
    /**
    * @return {Number}
    */
    get hours() {
        return this._hours;
    }

    /**
    * @param {number} hours
    */
    set hours(hours) {

        this._hours = hours;
    }
    /**
    * @return {Number}
    */
    get minutes() {
        return this._minutes;
    }

    /**
    * @param {number} minutes
    */
    set minutes(minutes) {

        this._minutes = minutes;
    }
    /**
    * @return {Number}
    */
    get seconds() {
        return this._seconds;
    }

    /**
    * @param {number} seconds
    */
    set seconds(seconds) {

        this._seconds = seconds;
    }
};

module.exports = Config;