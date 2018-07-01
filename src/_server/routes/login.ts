import mongoose from '../libs/mongoose';
import User from '../models/user';
import passport from 'koa-passport';

export default class LoginRouter {
  public async logIn(ctx: any) {
    let {username:email, password:password} = ctx.request.body

    new User({email: email, password: password})
      .save()
      .then(user => {
        console.log("User created:", user);
        ctx.body = ctx.request.body;
      });
  }

  public async signIn(ctx: any, next: any) {
    await passport.authenticate('local', {
      successRedirect: '/home',
      failureRedirect: '/',
      failureFlash: true
    })(ctx, next);
  }

  public async logOut(ctx: any, next: any) {
    ctx.body = ctx.request.body;
    await next();
  }
}
