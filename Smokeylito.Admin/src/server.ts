import fs from "fs";
import path from "path";
import Koa from "koa";
import logger from "koa-logger";
import serve from "koa-static";
import compress from "koa-compress";
import Router from "koa-router";

const distFolder = path.resolve(__dirname, '../public');

const app = new Koa();
const router = new Router();

const home = (ctx: any, next: any) => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream(`${distFolder}/index.html`);
}

router.get("/", home);

app
  .use(logger())
  .use(compress())
  .use(serve(distFolder))
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);