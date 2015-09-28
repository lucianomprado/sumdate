(function ($) {
    $.fn.sumdate = function (params) {
        var arryResult = new Array;
        var config = core['populaConfig'](params);
        var errors = new Array;
        $.each(this, function () {
            var n = $(this).val() || $(this).text();
            config.date = n;
            try {
                if (params.update) {
                    if ($(this).val() != '') {
                        $(this).val($.sumdate(config))
                    } else {
                        $(this).text($.sumdate(config))
                    }
                } else {
                    arryResult.push($.sumdate(config))
                }
            } catch (r) {
                var error = {
                    ok: false,
                    msg: r,
                    fieldMSG: $(this).attr('msg'),
                    fieldID: $(this).attr('id'),
                    fieldName: $(this).attr('name')
                };
                errors.push(error)
            }
        });
        if (errors.length > 0 && config.internationalisation.display) {
            var index = 0;
            var html = errors.error + '<br/>';
            for (index = 0; index < errors.length; index++) {
                html += (errors[index].fieldMSG || errors[index].fieldID || errors.fieldName) + ': ' + errors[index].msg + (index < errors.length - 1 ? '<br/>' : '')
            }
            if (config.internationalisation.divErrorId) {
                $('#' + config.internationalisation.divErrorId).html(html)
            }
            if (errors.length > 0 && config.internationalisation.jsonError) {
                var errors = {
                    errors: errors,
                    values: arryResult
                };
                return errors;
            }
        }
        if (!params.update) {
            return arryResult
        }
    };
    $.sumdate = function (params) {
        var config = core['populaConfig'](params);
        if (config.functions.length > 0) {
            for (var r = 0; r < config.functions.length; r++) {
                result = core[config.functions[r]](config);
            }
        }
        return result;
    };
    var core = {
        sum: function (params) {
            var sumValues = params.sumValues;
            var date = params.date;
            var parse = false;
            if ($.type(date) == 'string') {
                if (!core.validate(params)) {
                    throw errors.invalidDate
                }
                date = core.stringToDate(params);
                parse = true
            }
            var newDate = new Date(date.getTime());
            newDate.setMilliseconds(newDate.getMilliseconds() + sumValues.milliseconds);
            newDate.setSeconds(newDate.getSeconds() + sumValues.seconds);
            newDate.setMinutes(newDate.getMinutes() + sumValues.minutes);
            newDate.setHours(newDate.getHours() + sumValues.hours);
            newDate.setDate(newDate.getDate() + sumValues.days);
            if (sumValues.days > 0) {
                newDate.setMonth(newDate.getMonth() + sumValues.months)
            } else {
                var a = core.getMaxDayOfMonth(date.getMonth() + sumValues.months, date.getFullYear());
                newDate.setDate(date.getDate() > a ? a : date.getDate());
                newDate.setMonth(newDate.getMonth() + sumValues.months)
            }
            newDate.setFullYear(newDate.getFullYear() + sumValues.years);
            params.date = newDate;
            if (parse) {
                newDate = core['dateToString'](params)
            }
            return newDate;
        },
        stringToDate: function (params) {
            
            var dateSTR = params.date;
            var pattern = params.pattern;
            if ($.type(dateSTR) == 'date') {
                return dateSTR;
            }
            var dateOBJ = new Date(0);
            dateOBJ.setHours(0);
            var splitDate = new SplitDate(dateSTR, pattern);
            var order = splitDate.getOrder();
            var day = 0;
            var month = 0;
            var year = 0;
            var hour = 0;
            var minute = 0;
            var second = 0;
            var index = 0;
            var hourDate = splitDate.split();
            var dateJSON = hourDate[1];
            var hourJSON = hourDate[0];
            for (var b = 0; b < pattern.length; b++) {
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
            dateOBJ.setFullYear(year, month, day);
            if (hourJSON != '') {
                index = 0;
                for (var b = 0; b < result.length; b++) {
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
        },
        dateToString: function (params) {
            
            var date = params.date;
            var pattern = params.pattern;
            if ($.type(date) == 'string') {
                return date;
            }
            var dateSTR = new String;
            var splitDate = new SplitDate('', pattern);
            var order = splitDate.getOrder();
            var charsSeps = splitDate.getCharsSep();
            var indexDate = 0;
            var indexHour = 0;
            for (var h = 0; h < pattern.length; h++) {
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
        },
        validate: function (params) {
            var dateSTR = params.date;
            var pattern = params.pattern;
            if ($.type(dateSTR) != 'string') {
                return false
            }
            var position = core['getPos'](pattern);
            var charsSeps = core['charsSeps'](pattern, position);
            var dateOBJ = core['stringToDate'](params);
            if (dateSTR == '') {
                return true
            }
            var arryDATE = [];
            if (charsSeps.divDT != 'null') {
                var dateTime = dateSTR.split(charsSeps.divDT);
                if (position.D < position.h) {
                    arryDATE.splice( - 1, 0, dateTime[0].split(charsSeps.date));
                    arryDATE.splice( - 1, 0, dateTime[1].split(charsSeps.time))
                } else {
                    arryDATE.splice( - 1, 0, dateTime[1].split(charsSeps.date));
                    arryDATE.splice( - 1, 0, dateTime[0].split(charsSeps.time))
                }
            } else if (charsSeps.date != '') {
                arryDATE = dateSTR.split(charsSeps.date)
            } else if (charsSeps.time != '') {
                arryDATE = dateSTR.split(charsSeps.time)
            }
            for (var l = 0; l < arryDATE.length; l++) {
                if (position.D == l && dateOBJ.getDate() != parseInt(arryDATE[l])) {
                    return false
                } else if (position[l] == 'M' && dateOBJ.getMonth() + 1 != parseInt(arryDATE[l])) {
                    return false
                } else if (position[l] == 'Y' && dateOBJ.getFullYear() != parseInt(arryDATE[l])) {
                    return false
                } else if (position[l] == 'h' && dateOBJ.gethours() != parseInt(arryDATE[l])) {
                    return false
                } else if (position[l] == 'm' && dateOBJ.getMinutes() != parseInt(arryDATE[l])) {
                    return false
                } else if (position[l] == 'ss' && dateOBJ.getSeconds() != parseInt(arryDATE[l])) {
                    return false
                }
            }
            return true
        },
        between: function (params) {
            var paramsTMP = params;
            var dateOBJ = params.date;
            var anotherDate = params.anotherDate;
            if ($.type(dateOBJ) == 'string') {
                if (!core['validate'](params)) {
                    throw errors.invalidDate
                }
                dateOBJ = core['stringToDate'](params)
            }
            if ($.type(anotherDate) == 'string') {
                paramsTMP.date = anotherDate;
                if (!core['validate'](paramsTMP)) {
                    throw errors.invalidDate + ' (' + errors.inAnotherDate + ')'
                }
                anotherDate = core['stringToDate'](paramsTMP)
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
        },
        getPos: function (pattern) {
            var jsonPOS = {
                D: - 1,
                M: - 1,
                Y: - 1,
                h: - 1,
                m: - 1,
                ss: - 1
            };
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
        },
        charsSeps: function (dateTimeSTR, pattern) {
            var dateSTR = '';
            var timeSTR = '';
            var divDT = null;
            var divDate = 0;
            var divTime = 0;
            if (pattern.D > 0 || pattern.M > 0) {
                if (pattern.D < pattern.Y) {
                    dateSTR = dateTimeSTR.substr(pattern.D + 2, 1);
                    if (pattern.Y > pattern.M) {
                        divDate = pattern.Y
                    } else {
                        divDate = pattern.M
                    }
                } else {
                    dateSTR = dateTimeSTR.substr(pattern.Y + 4, 1);
                    if (pattern.D > pattern.M) {
                        divDate = pattern.D
                    } else {
                        divDate = pattern.M
                    }
                }
            }
            if (pattern.h > 0 || pattern.m > 0) {
                if (pattern.h < pattern.m) {
                    timeSTR = dateTimeSTR.substr(pattern.h + 2, 1);
                    if (pattern.h > pattern.ss) {
                        divTime = pattern.ss
                    } else {
                        divTime = pattern.h
                    }
                } else {
                    timeSTR = dateTimeSTR.substr(pattern.m + 2, 1);
                    if (pattern.m > pattern.ss) {
                        divTime = pattern.ss
                    } else {
                        divTime = pattern.m
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
            var f = '{ "date": "' + dateSTR + '", "time": "' + timeSTR + '", "divDT": "' + divDT + '"}';
            return $.parseJSON(f)
        },
        populaConfig: function (config) {
            var dateJSON = {
                years: 0,
                months: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                milliseconds: 0
            };
            var language = {
                error: 'Error',
                invalidDate: 'invalid date',
                invalidPattern: 'invalid pattern',
                inAnotherDate: 'in another date'
            };
            var internationalisation = {
                language: {
                },
                display: false,
                divErrorId: undefined,
                jsonError: true
            };
            var newConfig = {
                date: '',
                anotherDate: '',
                sumValues: {
                },
                functions: [
                    'sum'
                ],
                pattern: 'DD/MM/YYYY',
                internationalisation: {
                }
            };
            if (config) {
                if (config.sumValues) {
                    $.extend(dateJSON, config.sumValues)
                }
                if (config.internationalisation) {
                    $.extend(internationalisation, config.internationalisation)
                }
                if (config.internationalisation && config.internationalisation.language) {
                    $.extend(language, config.internationalisation.language)
                }
                config.sumValues = dateJSON;
                config.internationalisation = internationalisation;
                config.internationalisation.language = language;
                $.extend(newConfig, config)
            }
            errors = newConfig.internationalisation.language;
            return newConfig
        },
        getMaxDayOfMonth: function (month, year) {
            var date = new Date(0);
            date.setHours(0);
            date.setMonth(parseInt(month, 10));
            date.setFullYear(parseInt(year, 10));
            var r = 32;
            do {
                date.setMonth(parseInt(month, 10));
                r = r - 1;
                date.setDate(r)
            } while (date.getMonth() != month);
            return r
        }
    };
    SplitDate = function (date, pattern) {
        var dateTMP = date;
        var order = core['getPos'](pattern);
        var charsSeps = core['charsSeps'](pattern, order);
        this.getOrder = function () {
            return order
        };
        this.getCharsSep = function () {
            return charsSeps;
        };
        this.split = function () {
            var date = '';
            var time = '';
            if (charsSeps.divDT != 'null') {
                if (order.h > order.Y) {
                    date = dateTMP.split(charsSeps.divDT) [0].split(charsSeps.date);
                    time = dateTMP.split(charsSeps.divDT) [1].split(charsSeps.time)
                } else {
                    date = dateTMP.split(charsSeps.divDT) [1].split(charsSeps.date);
                    time = dateTMP.split(charsSeps.divDT) [0].split(charsSeps.time)
                }
            } else {
                if (charsSeps.date != '') {
                    date = dateTMP.split(charsSeps.date)
                } else {
                    time = dateTMP.split(charsSeps.time)
                }
            }
            if ((dateTMP != '' && date == '' || date == undefined) && (time == '' || time == undefined)) {
                throw errors.invalidDate
            }
            return [time,date]
        }
    };
    var errors = {
    };
    var result = {
        ok: true,
        valor: '',
        msg: ''
    }
}) (jQuery)
