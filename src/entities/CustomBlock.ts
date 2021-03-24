import {
  Entity,
  Property,
  OneToOne,
  Formula,
  PrimaryKey,
} from "@mikro-orm/core";
import { BlockType } from "src/enums";
import { v4 as uuidv4 } from "uuid";
import { Schema } from "./Schema";

@Entity()
export class CustomBlock {
  /** uuid generated for custom block with prefix */
  @PrimaryKey()
  @Formula(`${BlockType.CUSTOMBLOCK}-${uuidv4()}`)
  id!: string;

  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ default: "My New Block" })
  title!: string;

  /** relation ids for this block */
  @Property()
  public relationIds: string[];

  @OneToOne(() => Schema, (schema) => schema.parentBlock)
  schema: Schema;

  @Property({ version: true })
  version!: number;
}
