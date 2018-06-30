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
const user_1 = __importDefault(require("../models/user"));
class LoginRouter {
    logIn(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let { username: email, password: password } = ctx.request.body;
            new user_1.default({ email: email, password: password })
                .save()
                .then(user => {
                console.log("User created:", user);
                ctx.body = ctx.request.body;
            })
                .catch(err => {
                console.log("Cannot create user");
                ctx.status = 403;
                ctx.body = { errorCode: 403, errorMessage: "User is already created!" };
                ctx.throw(err);
            });
        });
    }
    logOut(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.body = ctx.request.body;
            yield next();
        });
    }
}
exports.default = LoginRouter;
//# sourceMappingURL=login.js.map