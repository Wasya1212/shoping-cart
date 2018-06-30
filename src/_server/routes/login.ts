import mongoose from '../libs/mongoose';
import User from '../models/user';

export default class LoginRouter {
  public async logIn(ctx: any) {
    let {username:email, password:password} = ctx.request.body

    new User({email: email, password: password})
      .save()
      .then(user => {
        console.log("User created:", user);
        ctx.body = ctx.request.body;
      })
      .catch(err => {
        console.log("Cannot create user");
        ctx.status = 403;
        ctx.body = {errorCode: 403, errorMessage: "User is already created!"};
        ctx.throw(err);
      });
  }

  public async logOut(ctx: any, next: any) {
    ctx.body = ctx.request.body;
    await next();
  }
}
