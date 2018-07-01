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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
const koa_router_1 = __importDefault(require("koa-router"));
const login_1 = __importDefault(require("./login"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const html_minifier_1 = require("html-minifier");
const HTML_PAGE = html_minifier_1.minify(fs.readFileSync(path.resolve(__dirname, '../public/index.html')).toString(), {
    removeAttributeQuotes: true,
    removeComments: true,
    caseSensitive: true,
    useShortDoctype: true,
    minifyURLs: true
});
const router = new koa_router_1.default();
const loginRouter = new login_1.default();
router.get('/*', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    ctx.type = 'html';
    ctx.body = HTML_PAGE;
    yield next();
}));
router.get('/home', (ctx) => __awaiter(this, void 0, void 0, function* () {
    ctx.body = "Hello, Wordl! (REGISTER DONE!)";
}));
router.post('/login', loginRouter.signIn);
router.post('/logout', loginRouter.logOut);
module.exports = router;
//# sourceMappingURL=index.js.map