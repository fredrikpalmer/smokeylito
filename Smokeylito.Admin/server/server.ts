import fs from "fs";
import path from "path";
import Koa from "koa";
import logger from "koa-logger";
import serve from "koa-static";
import compress from "koa-compress";
import Router from "koa-router";
import MongoClient from 'mongodb';

const distFolder = path.resolve(__dirname, '../public');

const app = new Koa();
const router = new Router();

const home = (ctx: any, next: any) => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream(`${distFolder}/index.html`);
}

router.get("/", home);

const smoketests = async (ctx: any, next: any) => {
  const client = await MongoClient.connect('mongodb://localhost:27017');
  const list = await client.db('smoketest').collection('services').find().toArray();

  ctx.type = 'application/json';
  ctx.body = JSON.stringify(list);
}

router.get("/smoketests", smoketests)

app
  .use(logger())
  .use(compress())
  .use(serve(distFolder))
  .use(router.routes())
  .use(router.allowedMethods());


const port = process.env.port || 3000;
app.listen(port);

console.log('Listening on http://localhost:' + port);