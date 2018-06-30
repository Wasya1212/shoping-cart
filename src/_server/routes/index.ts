import Router from 'koa-router';
import LoginRouter from './login';

import * as fs from 'fs';
import * as path from 'path';
import {minify} from 'html-minifier';

const HTML_PAGE = minify(fs.readFileSync(path.resolve(__dirname, '../public/index.html')).toString(), {
  removeAttributeQuotes: true,
  removeComments: true,
  caseSensitive: true,
  useShortDoctype: true,
  minifyURLs: true
});

const router = new Router();
const loginRouter = new LoginRouter();

router.get('/*', async (ctx, next) => {
  ctx.type = 'html';
  ctx.body = HTML_PAGE;
  await next();
});

router.post('/login', loginRouter.logIn);
router.post('/logout', loginRouter.logOut);

export = router;
