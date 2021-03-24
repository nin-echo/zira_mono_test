import {
  Entity,
  PrimaryKey,
  Property,
  OneToOne,
  Formula,
} from "@mikro-orm/core";
import { BlockType } from "../enums";
import { Field, ObjectType } from "type-graphql";
import { v4 as uuidv4 } from "uuid";
import { CustomField } from "./CustomField";

@ObjectType()
@Entity()
export class CustomFieldOption {
  /** uuid generated for custom field with prefix */
  @Field()
  @PrimaryKey()
  @Formula(`${BlockType.FIELDOPTION}-${uuidv4()}`)
  id: string = uuidv4();

  @Field()
  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Field()
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Field()
  @Property({ version: true })
  version!: number;

  @Field(() => CustomField)
  @OneToOne(() => CustomField, (parentField) => parentField.fieldOption)
  parentField!: CustomField;
}
