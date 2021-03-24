import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";

export type ZiraContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
};
