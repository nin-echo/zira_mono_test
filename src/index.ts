import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { CustomBlockResolver } from "./resolvers/customBlock";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  const app = express();

  const apollorServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [CustomBlockResolver],
      validate: false,
    }),
    /** context is accessible by resolvers */
    context: () => ({ em: orm.em }),
  });

  /** create a graphql endpoint */
  apollorServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
