import fs from "fs";
import path from "path";
import Koa from "koa";
import logger from "koa-logger";
import serve from "koa-static";
import compress from "koa-compress";
import Router from "koa-router";
import MongoClient from 'mongodb';
import { TargetApplication } from '../models/target-application';
import { SmokeTestScenario } from '../models/smoketest-scenario';

const distFolder = path.resolve(__dirname, '../public');

const app = new Koa();
const router = new Router();

const home = (ctx: any, next: any) => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream(`${distFolder}/index.html`);
}

router.get("/", home);

const targetApplications = async (ctx: any, next: any) => {
  // const client = await MongoClient.connect('mongodb://admin:admin123@mongod-0.mongodb-service,mongod-1.mongodb-service,mongod-0.mongodb-service:27017/?replicaSet=MainRepSet');
  // const list = await client.db('smoketest').collection('targetApplications').find().toArray();

  const list = [
    new TargetApplication(
      'Smokeylito admin',
      'http://localhost:3000',
      null,
      new Array<SmokeTestScenario>(
        new SmokeTestScenario()
      )
    )
  ];

  ctx.type = 'application/json';
  ctx.body = JSON.stringify(list);
}

router.get("/targetApplications", targetApplications);

app
  .use(compress())
  .use(serve(distFolder))
  .use(router.routes())
  .use(router.allowedMethods());

let port = 3000;

if(!module.parent) {
  app
    .use(logger())
    .listen(port);

  console.log('Listening on http://localhost:' + port);
}

export default app;

