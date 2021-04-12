import { Entity, Property, OneToOne, PrimaryKey } from "@mikro-orm/core";
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
  id: string = `${BlockType.CUSTOMBLOCK}-${uuidv4()}`;

  @Field()
  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Field()
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Field()
  @Property({ type: "text", unique: true })
  title!: string;

  /** relation ids for this block */
  @Field(() => [String], { nullable: true })
  @Property({ nullable: true })
  relationIds: string[];

  @Field({ nullable: true })
  @OneToOne(() => Schema, (schema) => schema.parentBlock)
  schema: Schema;

  @Field()
  @Property({ version: true })
  version!: number;
}
