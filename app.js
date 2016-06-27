// app.js
const Koa = require('koa');
const app = new Koa();
let moment = require('moment');

const arrangement = [
    'hao', 'max', 'biao', 'hao', 'max', 'Sat', 'Sun',
    'biao', 'hao', 'max', 'biao', 'hao', 'Sat', 'Sun',
    'max', 'biao', 'hao', 'max', 'biao', 'Sat', 'Sun'
];

const start = moment("2016-06-26 00:00 +0800", "YYYY-MM-DD HH:mm Z");


app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});


// response
app.use(ctx => {
  const now = moment();
  const days = now.diff(start, 'days');

  console.log(`Days: ${days}`);

  let who = arrangement[days % arrangement.length]

  console.log(`Who: ${who}`);

  if (['Sat', 'Sun'].indexOf(who) != -1) {
      ctx.body = `No one does rebase today because it is ${who} today`
  }
  else {
      ctx.body = `${who} does rebase today`;
  }
});


const port = process.env.PORT || 3000;
app.listen(port);

