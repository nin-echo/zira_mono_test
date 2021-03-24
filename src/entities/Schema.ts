import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
  OneToOne,
  Formula,
} from "@mikro-orm/core";
import { BlockType } from "../enums";
import { v4 as uuidv4 } from "uuid";
import { CustomBlock } from "./CustomBlock";
import { CustomField } from "./CustomField";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Schema {
  /** uuid generated for schema with prefix */
  @Field()
  @PrimaryKey()
  @Formula(`${BlockType.SCHEMA}-${uuidv4()}`)
  id!: string;

  @Field()
  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Field()
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Field(() => String)
  @Property({ type: "json", nullable: false })
  view!: { row: CustomField[]; column: CustomField[] };

  @Field(() => CustomBlock)
  @OneToOne(() => CustomBlock)
  parentBlock: CustomBlock;

  @Field(() => [CustomField])
  @OneToMany(() => CustomField, (customField) => customField.schema)
  customFields = new Collection<CustomField>(this);

  @Field()
  @Property({ version: true })
  version!: number;
}
