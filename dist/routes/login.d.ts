export default class LoginRouter {
    logIn(ctx: any): Promise<void>;
    logOut(ctx: any, next: any): Promise<void>;
}
