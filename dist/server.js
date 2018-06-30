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
const koa_connect_flash_1 = __importDefault(require("koa-connect-flash"));
const index_1 = __importDefault(require("./routes/index"));
const error_1 = __importDefault(require("./handlers/error"));
const app = new koa_1.default();
app.use(koa_static_1.default(__dirname + '/public'));
app.use(koa_bodyparser_1.default());
app.use(koa_connect_flash_1.default());
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