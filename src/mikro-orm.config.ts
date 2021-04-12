import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import { CustomBlock } from "./entities/CustomBlock";
import { CustomField } from "./entities/CustomField";
import { CustomFieldOption } from "./entities/CustomFieldOption";
import { Schema } from "./entities/Schema";
import path from "path";
import { OptionValue } from "./entities/CustomFieldOptionValue";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [CustomBlock, CustomField, Schema, CustomFieldOption, OptionValue],
  dbName: "ziratest",
  type: "postgresql",
  user: "bingqiliu",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
