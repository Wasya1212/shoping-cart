import http from 'http';
import Koa from 'koa';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import mongooseStore from 'koa-session-mongoose';
import convert from 'koa-convert';
import flash from 'koa-better-flash';
import passport from 'koa-passport';
import {Strategy as LocalStrategy} from 'passport-local';
import router from './routes/index';
import errorHandler from './handlers/error';
import mongooseConnection from './libs/mongoose';
import User from './models/user';

const app = new Koa();

app.keys = ['secret'];

const CONFIG = {
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false,
  store: mongooseStore.create({
    model: 'Session',
    connection: mongooseConnection,
    expires: 3600 * 4
  })
};

passport.serializeUser((user: any, done: any) => {
  done(null, user.email);
});

passport.deserializeUser((email: any, done: any) => {
  User.findOne({email: email}, done);
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'passpord',
    passReqToCallback: true
  }, (req: any, email: string, password: string, done: any) => {
    console.log("User email:", email);
    User.findOne({email: email}, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, {message: "Any user not found!"});

      console.log("User finded:", user);
      done(null, user);
    });
  })
);

app.use(serve(__dirname + '/public'));
app.use(bodyParser());
app.use(session(CONFIG, app));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

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

app.use(async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    console.log("user authenticated!");
    return next();
  } else {
    console.log("user is not authenticated!");
    ctx.redirect('/');
  }
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
