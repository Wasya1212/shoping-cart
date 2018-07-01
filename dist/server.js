"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const koa_1 = __importDefault(require("koa"));
const koa_static_1 = __importDefault(require("koa-static"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_session_1 = __importDefault(require("koa-session"));
const koa_session_mongoose_1 = __importDefault(require("koa-session-mongoose"));
const koa_better_flash_1 = __importDefault(require("koa-better-flash"));
const koa_passport_1 = __importDefault(require("koa-passport"));
const passport_local_1 = require("passport-local");
const index_1 = __importDefault(require("./routes/index"));
const error_1 = __importDefault(require("./handlers/error"));
const mongoose_1 = __importDefault(require("./libs/mongoose"));
const user_1 = __importDefault(require("./models/user"));
const app = new koa_1.default();
app.keys = ['secret'];
const CONFIG = {
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
    store: koa_session_mongoose_1.default.create({
        model: 'Session',
        connection: mongoose_1.default,
        expires: 3600 * 4
    })
};
koa_passport_1.default.serializeUser((user, done) => {
    done(null, user.email);
});
koa_passport_1.default.deserializeUser((email, done) => {
    user_1.default.findOne({ email: email }, done);
});
koa_passport_1.default.use(new passport_local_1.Strategy({
    usernameField: 'email',
    passwordField: 'passpord',
    passReqToCallback: true
}, (req, email, password, done) => {
    console.log("User email:", email);
    user_1.default.findOne({ email: email }, (err, user) => {
        if (err)
            return done(err);
        if (!user)
            return done(null, false, { message: "Any user not found!" });
        console.log("User finded:", user);
        done(null, user);
    });
}));
app.use(koa_static_1.default(__dirname + '/public'));
app.use(koa_bodyparser_1.default());
app.use(koa_session_1.default(CONFIG, app));
app.use(koa_better_flash_1.default());
app.use(koa_passport_1.default.initialize());
app.use(koa_passport_1.default.session());
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const start = Date.now();
    yield next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
}));
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const start = Date.now();
    yield next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
}));
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    if (ctx.isAuthenticated()) {
        console.log("user authenticated!");
        return next();
    }
    else {
        console.log("user is not authenticated!");
        ctx.redirect('/');
    }
}));
app.use(index_1.default.routes());
app.use(index_1.default.allowedMethods());
app.use(error_1.default());
app.on('error', (err, ctx) => {
    console.error("Server error:", err);
});
const PORT = process.env.PORT || 3000;
http_1.default.createServer(app.callback()).listen(PORT, () => {
    console.log(`Server work on port: ${PORT}`);
});
//# sourceMappingURL=server.js.map