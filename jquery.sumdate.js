;(function ($) {

    $.fn.sumdate = function(settings) {

        var arr = new Array();
        var config = functions['populaConfig'](settings);
        var errors = new Array();
        $.each(this,function(){
            
            var date = ($(this).val()|| $(this).text());
            config.date = date;
            try{
                if(settings.update){
            
                    if($(this).val()!=''){
                    
                        $(this).val($.sumdate(config));
                    }else{
                    
                         $(this).text($.sumdate(config));
                    }
                }else{
                    
                    arr.push($.sumdate(config));
                }
            } catch (err){
                
                var msg = {
                    ok: false, 
                    msg: err,
                    fieldMSG: $(this).attr('msg'),
                    fieldID: $(this).attr('id'),
                    fieldName: $(this).attr('name')
                };
                errors.push(msg);
            }
        });
        if(errors.length>0 && config.internationalisation.display){
            
            var i =0;
            var mensagem = msgs.error +'<br/>';
            for(i=0;i<errors.length;i++){
                    
                mensagem += (errors[i].fieldMSG||errors[i].fieldID||errors.fieldName) +': '+errors[i].msg +(i < errors.length-1?'<br/>':'');
            }
            if(config.internationalisation.divErrorId){
                
                $('#'+config.internationalisation.divErrorId).html(mensagem);
            }
           
            if(errors.length>0 && config.internationalisation.jsonError){
             
                var resultado = {"errors":errors, values: arr};
                return resultado;
            }
        }
        if(!settings.update){

            
            return arr;
        }
    };
    $.sumdate = function(settings) {
        var config = functions['populaConfig'](settings);
       
        if(config.functions.length > 0){
                
            for(var i=0;i<config.functions.length;i++){

                resultado = functions[config.functions[i]](config);
            }
        }
        return resultado;
    };
    
    var charPattern =['D','M','Y','h','m','s'];
    var functions = {
        sum : function (config) {

            var sumValues = config.sumValues;
            var data = config.date;
            var convert = false;
            if($.type(data) == 'string'){
                
                if(!functions['validate'](config)){
                    
                    throw msgs.invalidDate;
                }
                data = functions['stringToDate'](config);
                convert = true;
            }
            var dateTmp = new Date(data.getTime());
            dateTmp.setMilliseconds(dateTmp.getMilliseconds() + sumValues.milliseconds);
            dateTmp.setSeconds(dateTmp.getSeconds() + sumValues.seconds);
            dateTmp.setMinutes(dateTmp.getMinutes() + sumValues.minutes);
            dateTmp.setHours(dateTmp.getHours() + sumValues.hours);
            dateTmp.setDate(dateTmp.getDate() + sumValues.days);
            dateTmp.setMonth(dateTmp.getMonth() + sumValues.months);
            dateTmp.setFullYear(dateTmp.getFullYear() + sumValues.years);
            config.date = dateTmp;
            if(convert){
                    
                dateTmp = functions['dateToString'](config);
            }
            return dateTmp; 
           
        },
        stringToDate : function (config){

            var sumValues = config.sumValues;
            var valor = config.date;
            var pattern = config.pattern;
            if($.type(valor)=='date'){
                return valor;
            }            
            var newDate = new Date(0);
            newDate.setHours(0);
            var splitDate = new SplitDate(valor,pattern);
            var order = splitDate.getOrder();
            var charsSep = splitDate.getCharsSep();
            var date = 0;
            var month = 0;
            var year = 0;
            var hours = 0;
            var minutes = 0;
            var seconds = 0;
               
            var quebra = 0;
            var splitTmp = splitDate.split();
            var valorSplitDate = splitTmp[1];
            var valorSplitTime = splitTmp[0];
            for(var x=0;x<pattern.length;x++){
                    
                if(order.D==x){
                    date = parseInt(valorSplitDate[quebra],10);
                    quebra++;
                }else if(order.M==x){
                        
                    month = parseInt(valorSplitDate[quebra],10)-1;
                    quebra++;
                }else if(order.Y==x){
                        
                    year = parseInt(valorSplitDate[quebra],10);
                    quebra++;
                }
            }
            newDate.setFullYear(year,month,date);
            if(valorSplitTime != ''){
                quebra = 0;
                for(var x=0;x<pattern.length;x++){
                    
                    if(order.h==x){
                        hours = parseInt(valorSplitTime[quebra],10);
                        quebra++;
                    }else if(order.m==x){
                        
                        minutes = parseInt(valorSplitTime[quebra],10);
                        quebra++;
                    }else if(order.ss==x){
                        
                        seconds = parseInt(valorSplitTime[quebra],10);
                        quebra++;
                    }
                }
                newDate.setHours(hours);
                newDate.setMinutes(minutes);
                newDate.setSeconds(seconds);
            }
            return newDate;
        },
        dateToString : function(config){
           
            var sumValues = config.sumValues;
            var date = config.date;
            var pattern = config.pattern;
            if( $.type(date) == 'string'){
                    
                return date;
            }
                
            var tmpOrder = new Array();
            var dateSTR = new String();
            var splitDate = new SplitDate('',pattern);
            var order = splitDate.getOrder();
            var charsSep = splitDate.getCharsSep();
            var countSepDate = 0;
            var countSepTime = 0;

            for(var i = 0; i<pattern.length;i++){
                    
                if(order.D==i){
                        
                    if(date.getDate()<10){
                        dateSTR += '0';
                    }
                    dateSTR += date.getDate();
                    if(countSepDate < 2){
                        
                        dateSTR += charsSep.date;
                    }
                    countSepDate++;
                }else if(order.M == i){
                        
                    if(date.getMonth()<10){
                        dateSTR += '0';
                    }
                    dateSTR += (date.getMonth()+1);
                    if(countSepDate < 2){
                        
                        dateSTR += charsSep.date;
                    }
                    countSepDate++;
                }else if(order.Y == i){
                        
                    dateSTR += (date.getFullYear());
                    if(countSepDate < 2){
                        
                        dateSTR += charsSep.date;
                    }
                    countSepDate++;
                }
                    if(order.h==i){
                        
                    if(date.getHours()<10){
                        dateSTR += '0';
                    }
                    dateSTR += date.getHours();
                    if(countSepTime < 2){
                        
                        dateSTR += charsSep.time;
                    }
                    countSepTime++;
                }else if(order.m == i){
                        
                    if(date.getMinutes()<10){
                        dateSTR += '0';
                    }
                    dateSTR += (date.getMinutes());
                    if(countSepTime < 2){
                        
                        dateSTR += charsSep.time;
                    }
                    countSepTime++;
                }else if(order.ss == i){
                        
                        if(date.getSeconds()<10){
                        dateSTR += '0';
                    }
                    dateSTR += (date.getSeconds());
                    if(countSepTime < 2){
                        
                        dateSTR += charsSep.time;
                    }
                    countSepTime++;
                }
                if(charsSep.divDT!='null'&&(countSepDate == 3 ^ countSepTime == 3)){
                        
                    dateSTR += charsSep.divDT;
                    charsSep.divDT = 'null';
                }
            }
            return dateSTR;
            
        },
        validate : function(config){

            var date = config.date;
            var pattern = config.pattern;
        	if($.type(date) != 'string'){

			    return false;
			}
            var order = functions['getPos'](pattern);
        	var charTimeSep = functions['charsSeps'](pattern, order );
            var dateTmp = functions['stringToDate'](config);
        	if(date == ''){

				return true;
			}
            var data = [];
        	if(charTimeSep.divDT != 'null'){
        	    
                var tmp = date.split(charTimeSep.divDT);
                if(order.D < order.h){
                
                    data.splice(-1,0,tmp[0].split(charTimeSep.date));
                    data.splice(-1,0,tmp[1].split(charTimeSep.time));
                }else{
                    
                    data.splice(-1,0,tmp[1].split(charTimeSep.date));
                    data.splice(-1,0,tmp[0].split(charTimeSep.time));
                }
        	}else if(charTimeSep.date != ''){
        	
                data = date.split(charTimeSep.date);
        	}else if(charTimeSep.time != '' ) {
        	    
                data = date.split(charTimeSep.time);
        	}
	
			for(var i=0; i<data.length;i++){
			 
                if(order.D==i && dateTmp.getDate() != parseInt(data[i])){
                    
                    return false;
                }else if(order[i]=='M' && dateTmp.getMonth()+1 != parseInt(data[i])){
                    
                    return false;
                }else if(order[i]=='Y' && dateTmp.getFullYear() != parseInt(data[i])){
                    
                    return false;
                }else if(order[i]=='h' && dateTmp.gethours() != parseInt(data[i])){
                    
                    return false;
                }else if(order[i]=='m' && dateTmp.getMinutes() != parseInt(data[i])){
                    
                    return false;
                }else if(order[i]=='ss' && dateTmp.getSeconds() != parseInt(data[i])){
                    
                    return false;
                }
			}
			return true;
        },
        between : function (config){
            
            var configTmp = config;
            var date = config.date;
            var anotherDate = config.anotherDate;
            if( $.type(date) == 'string'){

                if(!functions['validate'](configTmp)){
                    
                    throw msgs.invalidDate;
                }
                date = functions['stringToDate'](config);
            }
            if( $.type(anotherDate) == 'string'){

                configTmp.date = anotherDate;
                if(!functions['validate'](configTmp)){
                    
                    throw (msgs.invalidDate +' ('+msgs.inAnotherDate+')');
                }
              
                anotherDate = functions['stringToDate'](configTmp);
            }
            var timestamp = anotherDate.getTime()-date.getTime();
            timestamp = (timestamp < 0? timestamp*-1: timestamp);
            var dateTmp = new Date(timestamp);
            var sumValues = {
                "years": 0,
                "months": 0,
                "days": 0,
                "hours": 0,
                "minutes": 0,
                "seconds": 0,
                "milliseconds": 0
            };
            sumValues.years = dateTmp.getUTCFullYear() - 1970;
            sumValues.months = dateTmp.getUTCMonth();
            sumValues.days = dateTmp.getUTCDate()-1;
            sumValues.hours = dateTmp.getUTCHours();
            sumValues.minutes = dateTmp.getUTCMinutes();
            sumValues.milliseconds = dateTmp.getUTCMilliseconds();
            return sumValues;
        },
        getPos : function(pattern){
            
            var pos = {D:-1,M:-1,Y:-1,h:-1,m:-1,ss:-1};
            pos.D = pattern.indexOf('DD');
            pos.M = pattern.indexOf('MM');
            pos.Y = pattern.indexOf('YYYY');
            pos.h = pattern.indexOf('hh');
            pos.m = pattern.indexOf('mm');
            pos.ss = pattern.indexOf('ss');
            if(pos.D == -1&& pos.M == -1 && pos.Y && pos.h == -1 && pos.m == -1 && pos.ss == -1){
                throw msgs.invalidPattern;
            }
            return pos;
        },
        charsSeps: function(pattern,pos){
          
            var charDate = '';
            var charTime = '';
            var divDT = null;
            var ltDate = 0;
            var ltTime = 0;
            if(pos.D > 0 || pos.M >0){
                if(pos.D<pos.Y){
                
                    charDate = pattern.substr(pos.D+2,1);
                    if(pos.Y>pos.M){
                    
                        ltDate=pos.Y;
                    }else{
                    
                        ltDate=pos.M;
                    }
                }else{
                    
                    charDate = pattern.substr(pos.Y+4,1);
                    if(pos.D > pos.M){
                    
                        ltDate = pos.D;
                    }else{
                    
                        ltDate = pos.M;
                    }
                }
            }
            if(pos.h > 0 || pos.m > 0){
                if(pos.h < pos.m){
                
                    charTime = pattern.substr(pos.h+2,1);
                    if(pos.h > pos.ss){
                        
                        ltTime = pos.ss;
                    }else{
                        
                        ltTime = pos.h;
                    }
                }else{

                    charTime = pattern.substr(pos.m+2,1);
                    if(pos.m>pos.ss){
                        
                        ltTime = pos.ss;
                    }else{
                        
                        ltTime = pos.m;
                    }
                }
                
            }
            if(ltDate > 0 && ltTime > 0){

                if(ltDate > ltTime){
                
                    divDT = pattern.substr(ltDate-1,1);
                }else{
                
                    divDT = pattern.substr(ltTime-1,1);
                }
            }
            if(charDate == '' && charTime == ''){
                
                throw msgs.invalidPattern;
            }
            var json = '{ "date": "'+charDate+'", "time": "'+charTime+'", "divDT": "'+divDT+'"}';
            return $.parseJSON(json);
        },
        populaConfig : function(settings){
            
            var sumValues = {
                "years": 0,
                "months": 0,
                "days": 0,
                "hours": 0,
                "minutes": 0,
                "seconds": 0,
                "milliseconds": 0
            };
            var language = { 
                        error: "Error",
                        invalidDate: "invalid date",
                        invalidPattern: "invalid pattern",
                        inAnotherDate: "in another date"
            };
            var  internationalisation= {
                    language:{},
                    display: false,
                    divErrorId: undefined,
                    jsonError: true
            };
            var config = {
                date: '',
                anotherDate: '',
                sumValues: {},
                functions:['sum'],
                pattern : 'DD/MM/YYYY',
                internationalisation: {}
            };
            if (settings) {
                
                if (settings.sumValues) {
                    $.extend(sumValues, settings.sumValues);
                }
                if(settings.internationalisation){

                    $.extend(internationalisation, settings.internationalisation);
                }
                if(settings.internationalisation && settings.internationalisation.language){
                    
                    $.extend(language, settings.internationalisation.language);
                }
                settings.sumValues = sumValues;
                settings.internationalisation = internationalisation;
                settings.internationalisation.language = language;
                $.extend(config, settings);
            }
            msgs = config.internationalisation.language;
            return config;
        }
    };
    SplitDate = function(str, pattern){
        
        var dataStr = str;
        var order = functions['getPos'](pattern);
        var charsSep = functions['charsSeps'](pattern,order);
        this.getOrder = function(){
            
            return order;
        };
        this.getCharsSep = function(){
            
            return charsSep;
        };
        this.split = function(){
            
            var valorSplitDate = '';
            var valorSplitTime = '';
            if(charsSep.divDT!= 'null'){
                    
                if(order.h > order.Y ){
                        
                    valorSplitDate = dataStr.split(charsSep.divDT)[0].split(charsSep.date);
                    valorSplitTime = dataStr.split(charsSep.divDT)[1].split(charsSep.time);
                }else{
                        
                    valorSplitDate = dataStr.split(charsSep.divDT)[1].split(charsSep.date);
                    valorSplitTime = dataStr.split(charsSep.divDT)[0].split(charsSep.time);
                }
            }else{
                    
                if(charsSep.date!=''){
                        
                    valorSplitDate = dataStr.split(charsSep.date);

                }else{
                        
                    valorSplitTime = dataStr.split(charsSep.time);
                }
            }
            if((dataStr != '' && valorSplitDate == '' || valorSplitDate == undefined) && (valorSplitTime == '' || valorSplitTime == undefined)){
                
                throw msgs.invalidDate;
            }
            return [valorSplitTime, valorSplitDate];
        }
    };
    var msgs = {};
    var resultado = {ok: true, valor: '', msg: ''}
})(jQuery);