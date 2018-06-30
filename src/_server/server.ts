import http from 'http';
import Koa from 'koa';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import flash from 'koa-connect-flash';
import router from './routes/index';
import errorHandler from './handlers/error';

const app = new Koa();

app.use(serve(__dirname + '/public'));
app.use(bodyParser());
app.use(flash());

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use(errorHandler());

app.on('error', (err, ctx) => {
  console.error("Server error:", err);
  // write log to database
});

const PORT = process.env.PORT || 3000;

http.createServer(app.callback()).listen(PORT, () => {
  console.log(`Server work on port: ${PORT}`);
});
