var assert = require('assert');
var SumDate = require('../src/sumdate');


describe('SumDate Methods', () => {
    describe("Initialize sumDate's object with date 03/01/1983 dd/mm/yyyy", () => {
        it(' {date} sumdate not null', () => {

            var sum = new SumDate({date:'03/01/1983'});
            assert.equal(sum.date(), '03/01/1983');
        });
    });

    describe("Test basic methods", () => {
        it(' {getPos} get positions according types', () => {

            var sum = new SumDate({date:'03/01/1983'});
            assert.equal(sum.getPos().D, 0);
            assert.equal(sum.getPos().M, 3);
            assert.equal(sum.getPos().Y, 6);
            var params = {};
            params.pattern = 'YYYY/MM/DD';
            params.date = '03/01/1983';
            sum = new SumDate(params);
            assert.equal(sum.getPos().D, 8);
            assert.equal(sum.getPos().M, 5);
            assert.equal(sum.getPos().Y, 0);
        });
        it(' {charsSeps} get characters separates', () => {

            var sum = new SumDate({date:'03/01/1983'});
            assert.equal(sum.charsSeps('09/04/2018 22:30:02').date,'/');
            assert.equal(sum.charsSeps('09/04/2018 22:30:02').time,':');
            assert.equal(sum.charsSeps('06-04-2018 21.30.02').date,'-');
            assert.equal(sum.charsSeps('06-04-2018 21.30.02').time,'.')
        });
        it('{splitDateSTR} split date and the time',() => {

            var sum = new SumDate({date:'03/01/1983'});
            assert.equal(sum.splitDateSTR('03/01/1983 07:30').date[0],'03');
            assert.equal(sum.splitDateSTR('03/01/1983 07:30').date[1],'01');
            assert.equal(sum.splitDateSTR('03/01/1983 07:30').date[2],'1983');
            assert.equal(sum.splitDateSTR('03/01/1983 07:30').time[0],'07');
            assert.equal(sum.splitDateSTR('03/01/1983 07:30').time[1],'30');

        });
        it('{stringToDate} convert string to date', () => {

            var sum = new SumDate({date:'03/01/1983 07:30'});
            assert.equal(sum.stringToDate().getDate(), 3);
            assert.equal(sum.stringToDate().getMonth(), 0);
            assert.equal(sum.stringToDate().getFullYear(), 1983);
        });
        it("{getMaxDayOfMonth} get last day of month", () => {

            var sum = new SumDate({date:'03/01/1983 07:30'});
            assert.equal(sum.getMaxDayOfMonth(),31);
            assert.equal(sum.getMaxDayOfMonth(3),30);
            assert.equal(sum.getMaxDayOfMonth(1),28);
            assert.equal(sum.getMaxDayOfMonth(1,2016),29);
        });
        it("{dateToString} convert date to string", () =>{

            var sum = new SumDate({date:'03/01/1983 07:30'});
            var data = new Date();
            data.setDate(28);
            data.setMonth(7);
            data.setFullYear(1982);
            data.setHours(14);
            data.setMinutes(15);
            data.setSeconds(0);
            assert.equal(sum.dateToString(data), '28/08/1982 14:15:00');
            assert.equal(sum.dateToString(),'03/01/1983 07:30');
        })
        it("{validate} validate Date", () => {
            var sum = new SumDate({date:'03/15/1983'});
            assert.notEqual(sum.validate(),true);
            sum = new SumDate({date:'03/01/1983'});
            assert.equal(sum.validate(),true);
        });
    });
    describe("Test methods that interact with dates", () => {
        it('{sum} sum dates with values', () =>{
            var config = {sumValues:'',pattern: 'DD/MM/YYYY'};
            config.sumValues = {days:10};
            config.date= '03/01/1983';
            var sum = new SumDate(config);
            assert.equal(sum.sum(),'13/01/1983')
        } )
    });

    describe("Old tests v 1.x.x", ()=>{
        let dataAtual = '31/05/2013';        
        it("equal($.sumdate({ date: data, functions: ['sum'], sumValues: { days: 1} }), '01/03/2010', 'sum')",()=>{

           let config = { date: dataAtual, functions: ['sum'], sumValues: { days: 1} } ;
           let sum = new SumDate(config);
           assert.equal(sum.execute()['sum'],'01/06/2013 00:00:00');
        })
        it("equal($.sumdate({functions:['sum'],sumValues:{months:1},date: dataAtual}),'30/06/2013', 'sum month 31/05 to 30/06')",()=>{

           assert.equal((new SumDate({functions:['sum'],sumValues:{months:1},date: dataAtual})).execute()['sum'],'30/06/2013 00:00:00');
        })
        it("equal($.sumdate({ date: data, functions: ['stringToDate'] }), (new Date(2013, 04, 31, 00, 00, 00, 0)).toString(), 'stringToDate');",() =>{
            
            assert.equal((new SumDate({functions:['stringToDate'],date: dataAtual})).execute()['stringToDate'].toString(),(new Date(2013, 04, 31, 00, 00, 00, 0)).toString());
        })
        it("equal($.sumdate({ date: (new Date(2010, 01, 28, 00, 00, 00, 0)), functions: ['dateToString'] }), data, 'dateToString');",()=>{

            assert.equal((new SumDate({ date: (new Date(2010, 01, 28, 00, 00, 00, 0)), functions: ['dateToString'] })).execute()['dateToString'],'28/02/2010 00:00:00');
        })
        it("equal($.sumdate({ date: (new Date(2010, 01, 28, 00, 00, 00, 0)), functions: ['dateToString'], pattern: 'YYYY-MM-DD hh:mm:ss' }), '2010-02-28 00:00:00', 'dateToString and pattern');",()=>{

            assert.equal((new SumDate({ date: (new Date(2010, 01, 28, 00, 00, 00, 0)), functions: ['dateToString'], pattern: 'YYYY-MM-DD hh:mm:ss' })).execute()['dateToString'],'2010-02-28 00:00:00');
        })
        let hours = '23:59:59';
        it("equal($.sumdate({ date: hours,functions:['validate'],pattern:'hh:mm:ss' }), true, 'validate hours')",()=>{

            assert.ok((new SumDate({ date: hours,functions:['validate'],pattern:'hh:mm:ss' })).execute()['validate']);
        });
        it("equal($.sumdate({ date: '24:00:00',functions:['validate'],pattern:'hh:mm:ss' }), true, 'validate hours false')",()=>{

            assert.equal((new SumDate({ date: '24:00:00',functions:['validate'],pattern:'hh:mm:ss' })).execute()['validate'],false);
        });

        it(" equal(sumValues.days == 3 /*2012 year is bissexto*/ && sumValues.years == 2, true, 'between');",()=>{

            let sumValues = (new SumDate({ date: '28/02/2010', functions: ['between'], anotherDate: '02/03/2012' })).execute()['between'];
            assert.ok(sumValues.years ==2 && sumValues.days == 3);
        });
    })
   
});