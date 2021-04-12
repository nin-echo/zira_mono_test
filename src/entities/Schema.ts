import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
  OneToOne,
} from "@mikro-orm/core";
import { BlockType } from "../enums";
import { v4 as uuidv4 } from "uuid";
import { CustomBlock } from "./CustomBlock";
import { CustomField } from "./CustomField";
import { Field, ObjectType } from "type-graphql";
import { GraphQLJSONObject } from "graphql-type-json";

@ObjectType()
@Entity()
export class Schema {
  /** uuid generated for schema with prefix */
  @Field()
  @PrimaryKey()
  id: string = `${BlockType.SCHEMA}-${uuidv4()}`;

  @Field()
  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Field()
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  /**
   * better to be called
   * row: array of dataGroupId
   * column: array of optionId
   */
  @Field(() => GraphQLJSONObject)
  @Property({ type: "json", nullable: true })
  view!: { row: any; column: string[] };

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
