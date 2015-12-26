angular.module('app').factory('factoryWeek', function () {
    var createWeek, getDays, getWeek, weeks;
    weeks = {};


    function getDate(n){
        var d = new Date();

        return new Date(d.getFullYear(), d.getMonth(), d.getDate()+n)

    }

    createWeek = function (n) {
        var d, day, days, i;
        d = new Date;
        day = d.getDay();
        day = day < 6 ? day + 1 : 7;
        day = -day;
        days = [];

        for(var i = 0; i<7;i++ ){
            days.push(getDate(day))
            day++;
        }
        console.log(days);
       return days;
    };
    getWeek = function (n) {
        return weeks[n] || createWeek(n);
    };
    return {
        getWeek: getWeek
    };
});
