import {
  Entity,
  Property,
  OneToOne,
  PrimaryKey,
  Formula,
} from "@mikro-orm/core";
import { BlockType } from "../enums";
import { Field, ObjectType } from "type-graphql";
import { v4 as uuidv4 } from "uuid";
import { Schema } from "./Schema";

@ObjectType()
@Entity()
export class CustomBlock {
  /** uuid generated for custom block with prefix */
  @Field()
  @PrimaryKey()
  @Formula(`${BlockType.CUSTOMBLOCK}-${uuidv4()}`)
  id!: string;

  @Field()
  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Field()
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Field()
  @Property({ default: "My New Block" })
  title!: string;

  /** relation ids for this block */
  @Field(() => [String])
  @Property()
  public relationIds: string[];

  @Field()
  @OneToOne(() => Schema, (schema) => schema.parentBlock)
  schema: Schema;

  @Field()
  @Property({ version: true })
  version!: number;
}
