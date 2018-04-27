let Config = require('./Config');
let StringUtils = require('./stringUtils');
/**
 * @class
 */

class SumDate {
    /**
    *  Create a sumdate
    *  @link Config @param {Object} params
    *  @param {Object.string} params.date date to work. 
    *  
    */
    constructor(params){

        this._config = new Config();
        if(typeof params === 'object'){

            this._config = StringUtils.merge(this._config, params);
        }
        if(typeof params.date === 'string'){
          this._config.dateOBJ = this.stringToDate();
        }
        if(typeof params.date === 'date'){

            this._config.dateOBJ =  params.date; 
            this._config.date = this.dateToString(params.date)
        }
        
        this._result = {
            ok: true,
            value: '',
            msg: ''
        };
    }

    /**
    * getConfig()
    * @return {Config}
    * @see Config
    */
    get config(){

        return this._config;
    }

    /**
    * setConfig(config)
    * @param {Config} config
    * @see Config
    */
    set config(config){

        return this._config = config;
    }
    /**
    * @return {string} date return date
    */
    date() {
        return this._config.date;
    }

    /**
    * @return {Object} results of methos ex: {ok:true, value:'03/01/1983 07:03', msg:''}
    get result(){

        return this._result;
    }
    /**
    * getPos() return {D:number position,M:number position,Y:number position,h:number position,m:number position,ss:number position}
    * @param {String} orderPattern default DD/MM/YYYY hh:mm:ss or passed on controctor of the object SumDate
    * @return {Object}
    *
    */
    getPos (orderPattern) {
        let jsonPOS = {
            D: - 1,
            M: - 1,
            Y: - 1,
            h: - 1,
            m: - 1,
            ss: - 1
        };
        let pattern = orderPattern ?orderPattern:this._config.pattern;
        jsonPOS.D = pattern.indexOf('DD');
        jsonPOS.M = pattern.indexOf('MM');
        jsonPOS.Y = pattern.indexOf('YYYY');
        jsonPOS.h = pattern.indexOf('hh');
        jsonPOS.m = pattern.indexOf('mm');
        jsonPOS.ss = pattern.indexOf('ss');
        if (jsonPOS.D == - 1 && jsonPOS.M == - 1 && jsonPOS.Y && jsonPOS.h == - 1 && jsonPOS.m == - 1 && jsonPOS.ss == - 1) {
            throw errors.invalidPattern
        }
        return jsonPOS;
    }

    /**
    *  charsSeps() return character used to separate return { date: '/', time: ':', divDT: ' ' }
    *  @return Object
    */
    charsSeps(dateTimeSTR,orderPattern){

        let pattern = orderPattern ? orderPattern : this._config.pattern;
        dateTimeSTR = dateTimeSTR?dateTimeSTR:pattern;
        let position = this.getPos(pattern);
        let dateSTR = null;
        let timeSTR = null;
        let divDT = null;
        let divDate = 0;
        let divTime = 0;
        if (position.D > 0 || position.M > 0) {
            if (position.D < position.Y) {
                dateSTR = dateTimeSTR.substr(position.D + 2, 1);
                if (pattern.Y > position.M) {
                    divDate = position.Y
                } else {
                    divDate = position.M
                }
            } else {
                dateSTR = dateTimeSTR.substr(position.Y + 4, 1);
                if (position.D > position.M) {
                    divDate = position.D
                } else {
                    divDate = position.M
                }
            }
        }
        if (position.h > 0 || position.m > 0) {
            if (position.h < position.m) {
                timeSTR = dateTimeSTR.substr(position.h + 2, 1);
                if (pattern.h > position.ss) {
                    divTime = position.ss
                } else {
                    divTime = position.h
                }
            } else {
                timeSTR = dateTimeSTR.substr(position.m + 2, 1);
                if (pattern.m > position.ss) {
                    divTime = position.ss
                } else {
                    divTime = position.m
                }
            }
        }
        if (divDate > 0 && divTime > 0) {
            if (divDate > divTime) {
                divDT = dateTimeSTR.substr(divDate - 1, 1)
            } else {
                divDT = dateTimeSTR.substr(divTime - 1, 1)
            }
        }
        if (dateSTR == '' && timeSTR == '') {
            throw errors.invalidPattern
        }
        dateSTR = dateSTR == ''?'null':dateSTR;
        timeSTR = timeSTR == ''?'null':timeSTR;
        divDT = divDT == ''?'null':divDT;
        let f = '{ "date": "' + dateSTR + '", "time": "' + timeSTR + '", "divDT": "' + divDT + '"}';
        return JSON.parse(f);
    }

    /**
    *   split Date and the time
    *   @param {String} dateSTR
    *   @return {Object} ex:03/01/1983 07:30 {time: [07,30], date: [03,01,1983]}
    */
    splitDateSTR(dateSTR) {

        let date = '';
        let time = '';
        let charsSeps = this.charsSeps(dateSTR);
        let order = this.getPos();
        if (charsSeps.divDT != 'null') {
            if (order.h > order.Y) {
                date = dateSTR.split(charsSeps.divDT) [0].split(charsSeps.date);
                time = dateSTR.split(charsSeps.divDT) [1].split(charsSeps.time)
            } else {
                date = dateSTR.split(charsSeps.divDT) [1].split(charsSeps.date);
                time = dateSTR.split(charsSeps.divDT) [0].split(charsSeps.time)
            }
        } else {
            if (charsSeps.date != 'null') {
                date = dateSTR.split(charsSeps.date)
            } else {
                time = dateSTR.split(charsSeps.time)
            }
        }
        if ((dateSTR != '' && date == '' || date == undefined) && (time == '' || time == undefined)) {
            throw errors.invalidDate
        }
        return {"date":date, "time":time};
    }


    /**
    * @return {Date} convert String to Date Object
    *
    */
    stringToDate(dateSTR){

        dateSTR = dateSTR?dateSTR:this._config.date;
        let pattern = this._config.pattern;
        if (typeof dateSTR  === 'date') {
            return dateSTR;
        }
        let dateOBJ = new Date(0);
        dateOBJ.setHours(0);
        let splitDate = this.splitDateSTR(dateSTR);
        let order = this.getPos();
        let result = this.result;
        let day = 0;
        let month = 0;
        let year = 0;
        let hour = 0;
        let minute = 0;
        let second = 0;
        let index = 0;
        let dateJSON = splitDate.date;
        let hourJSON = splitDate.time;
        if(dateJSON !== ''){
            for (let b = 0; b < pattern.length; b++) {
                if (order.D == b) {
                    day = parseInt(dateJSON[index], 10);
                    index++
                } else if (order.M == b) {
                    month = parseInt(dateJSON[index], 10) - 1;
                    index++
                } else if (order.Y == b) {
                    year = parseInt(dateJSON[index], 10);
                    index++
                }
            }
        }
        dateOBJ.setFullYear(year, month, day);
        if (hourJSON != '') {
            index = 0;
            for (let b = 0; b < pattern.length && index<hourJSON.length; b++) {
                if (order.h == b) {
                    hour = parseInt(hourJSON[index], 10);
                    index++
                } else if (order.m == b) {
                    minute = parseInt(hourJSON[index], 10);
                    index++
                } else if (order.ss == b) {
                    second = parseInt(hourJSON[index], 10);
                    index++
                }
            }
            dateOBJ.setHours(hour);
            dateOBJ.setMinutes(minute);
            dateOBJ.setSeconds(second)
        }
        return dateOBJ;
    }

    /**
     * @param {Number} month Optional 0-11
     * @param {Number} year Optional
     * @return {Number} return last day of month
     */
    getMaxDayOfMonth(month, year) {
        let date = new Date(0);
        month = month? month: this._config.dateOBJ.getMonth() ;
        year = year? year: this._config.dateOBJ.getFullYear();
        date.setHours(0);
        date.setMonth(parseInt(month, 10));
        date.setFullYear(parseInt(year, 10));
        let r = 32;
        do {
            date.setMonth(parseInt(month, 10));
            r = r - 1;
            date.setDate(r)
        } while (date.getMonth() != month);
        return r;
    }

    /**
     * @param {Date} date Optional case null used value passed on controctor of the object SumDate
     * @param {String} pattern  Optional case null used value passed on controctor of the object SumDate
     * @return {String} 
     */
    dateToString(date,pattern) {
            
        date = date? date: this._config.date;
        pattern = pattern? pattern: this._config.pattern;
        if (typeof date == 'string') {
            return date;
        }
        let dateSTR = new String();
        let order = this.getPos();
        let charsSeps = this.charsSeps();
        let indexDate = 0;
        let indexHour = 0;
        for (let h = 0; h < pattern.length; h++) {
            if (order.D == h) {
                if (date.getDate() < 10) {
                    dateSTR += '0';
                }
                dateSTR += date.getDate();
                if (indexDate < 2) {
                    dateSTR += charsSeps.date;
                }
                indexDate++;
            } else if (order.M == h) {
                if (date.getMonth() < 9) {
                    dateSTR += '0'
                }
                dateSTR += date.getMonth() + 1;
                if (indexDate < 2) {
                    dateSTR += charsSeps.date
                }
                indexDate++
            } else if (order.Y == h) {
                dateSTR += date.getFullYear();
                if (indexDate < 2) {
                    dateSTR += charsSeps.date
                }
                indexDate++
            }
            if (order.h == h) {
                if (date.getHours() < 10) {
                    dateSTR += '0'
                }
                dateSTR += date.getHours();
                if (indexHour < 2) {
                    dateSTR += charsSeps.time
                }
                indexHour++
            } else if (order.m == h) {
                if (date.getMinutes() < 10) {
                    dateSTR += '0'
                }
                dateSTR += date.getMinutes();
                if (indexHour < 2) {
                    dateSTR += charsSeps.time
                }
                indexHour++
            } else if (order.ss == h) {
                if (date.getSeconds() < 10) {
                    dateSTR += '0'
                }
                dateSTR += date.getSeconds();
                if (indexHour < 2) {
                    dateSTR += charsSeps.time
                }
                indexHour++
            }
            if (charsSeps.divDT != 'null' && indexDate == 3 ^ indexHour == 3) {
                dateSTR += charsSeps.divDT;
                charsSeps.divDT = 'null'
            }
        }
        return dateSTR;
    }
    /**
     * @return Object {D: number, M: number, Y: number, h:number, m:number, s:number}
     */
    patterPos(){
    
        let arr = new Array();
        let result = [];
        let pattern = this._config.pattern;
        let count = 0;
        pattern = pattern.split('');
        pattern = pattern.filter((item, pos,self) => {
            return self.indexOf(item) == pos;
        })
        pattern.forEach( item =>{ 
            if(item === 'D') {
                result['D'] = count++;
            }
            if(item === 'M'){
                result['M'] = count++;
            }
            if(item === 'Y'){
                result['Y'] = count++;
            }
            if(item === 'h'){
                result['h'] = count++;
            }
            if(item === 's'){
                result['s']= count++;
            }
            if(item === 'm'){

                result['m'] = count++;
            }
        });
        return result;
        
    }
    /**
     * @return boolean validate the date passed on construct Ex let sum =  new SumDate('35/13/1983 12:30'); sum.validate() return false! 
     */
    
    validate() {
        let dateSTR = this._config.date;
        let pattern = this._config.pattern;
        if (typeof dateSTR !== 'string') {
            return false
        }
        let position = this.patterPos();
        let charsSeps = this.charsSeps(dateSTR);
        let dateOBJ = this.stringToDate();
        if (dateSTR == '') {
            return true
        }
        let arryDATE = [];
        if (charsSeps.divDT != 'null') {
            let dateTime = dateSTR.split(charsSeps.divDT);
            if (position.D < position.h) {
                arryDATE.splice( - 1, 0, dateTime[0].split(charsSeps.date));
                arryDATE.splice( - 1, 0, dateTime[1].split(charsSeps.time))
            } else {
                arryDATE.splice( - 1, 0, dateTime[1].split(charsSeps.date));
                arryDATE.splice( - 1, 0, dateTime[0].split(charsSeps.time))
            }
        } else if (charsSeps.date != 'null') {
            arryDATE = dateSTR.split(charsSeps.date)
        } else if (charsSeps.time != '') {
            arryDATE = dateSTR.split(charsSeps.time)
        }
        for (let l = 0; l < arryDATE.length; l++) {
            if (position.D == l && dateOBJ.getDate() != parseInt(arryDATE[l])) {
                return false
            } else if (position.M === l && dateOBJ.getMonth() + 1 != parseInt(arryDATE[l])) {
                return false
            } else if (position.Y === l && dateOBJ.getFullYear() != parseInt(arryDATE[l])) {
                return false
            } else if (position.h === l && dateOBJ.getHours() != parseInt(arryDATE[l])) {
                return false
            } else if (position.m == l && dateOBJ.getMinutes() != parseInt(arryDATE[l])) {
                return false
            } else if (position.ss == l && dateOBJ.getSeconds() != parseInt(arryDATE[l])) {
                return false
            }
        }
        return true;
    }

    
    /**
    * Sum datee passed on constroctor with Object SumValues passed in params.sumValues {days:number, month: number, years: number, hours: number, minutes:number, seconds: number}
    * @return Date | String
    */
    sum(){
        let sumValues = this._config.sumValues;
        let date = this._config.date;
        let parse = false;
        if (typeof date == 'string') {
            if (!this.validate()) {
                throw errors.invalidDate
            }
            date = this.stringToDate();
            parse = true
        }
        let newDate = new Date(date.getTime());
        newDate.setMilliseconds(newDate.getMilliseconds() + sumValues.seconds);
        newDate.setSeconds(newDate.getSeconds() + sumValues.seconds);
        newDate.setMinutes(newDate.getMinutes() + sumValues.minutes);
        newDate.setHours(newDate.getHours() + sumValues.hours);
        newDate.setDate(newDate.getDate() + sumValues.days);
        if (sumValues.days > 0) {
            newDate.setMonth(newDate.getMonth() + sumValues.months)
        } else {
            let a = this.getMaxDayOfMonth(date.getMonth() + sumValues.months, date.getFullYear());
            newDate.setDate(date.getDate() > a ? a : date.getDate());
            newDate.setMonth(newDate.getMonth() + sumValues.months)
        }
        newDate.setFullYear(newDate.getFullYear() + sumValues.years);
        
        if (parse) {
            newDate = this.dateToString(newDate);
        }
        return newDate;
    }

    between () {
        var paramsTMP = this._config;
        var dateOBJ =  this._config.dateOBJ;
        var anotherDate =  this._config.anotherDate;
        
        if (typeof anotherDate === 'string') {
            paramsTMP.date = anotherDate;
            if (!this.validate(anotherDate)) {
                throw errors.invalidDate + ' (' + errors.inAnotherDate + ')'
            }
            anotherDate = this.stringToDate(anotherDate);
        }
        var timeStampBetween = anotherDate.getTime() - dateOBJ.getTime();
        timeStampBetween = timeStampBetween < 0 ? timeStampBetween * - 1 : timeStampBetween;
        var betweenDate = new Date(timeStampBetween);
        var jsonDate = {
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            milliseconds: 0
        };
        jsonDate.years = betweenDate.getUTCFullYear() - 1970;
        jsonDate.months = betweenDate.getUTCMonth();
        jsonDate.days = betweenDate.getUTCDate() - 1;
        jsonDate.hours = betweenDate.getUTCHours();
        jsonDate.minutes = betweenDate.getUTCMinutes();
        jsonDate.milliseconds = betweenDate.getUTCMilliseconds();
        return jsonDate;
    }

    /**
     * @todo desenvolver suporte a erros e internacionalização
     */
    execute (){

        let results = {};
        this._config.functions.forEach((func) => {

            results[func] = this[func]();
        });
        return results;
    }
};
module.exports = SumDate;