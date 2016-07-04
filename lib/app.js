'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

// app.js
var Koa = require('koa');
var app = new Koa();
var moment = require('moment');

var arrangement = ['hao', 'max', 'biao', 'hao', 'max', 'Sat', 'Sun', 'biao', 'hao', 'max', 'biao', 'hao', 'Sat', 'Sun', 'max', 'biao', 'hao', 'max', 'biao', 'Sat', 'Sun'];

var start = moment("2016-06-26 00:00 +0800", "YYYY-MM-DD HH:mm Z");

app.use(function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
        var start, ms;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        start = new Date();
                        _context.next = 3;
                        return next();

                    case 3:
                        ms = new Date() - start;

                        console.log(ctx.method + ' ' + ctx.url + ' - ' + ms + 'ms');

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

// response
app.use(function (ctx) {
    var now = moment();
    var days = now.diff(start, 'days');

    console.log('Days: ' + days);

    var who = arrangement[days % arrangement.length];

    console.log('Who: ' + who);

    if (['Sat', 'Sun'].indexOf(who) != -1) {
        ctx.body = 'No one does rebase today because it is ' + who + ' today';
    } else {
        ctx.body = who + ' does rebase today';
    }
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening to %s', port);