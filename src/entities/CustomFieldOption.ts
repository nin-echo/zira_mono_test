import {
  Entity,
  PrimaryKey,
  Property,
  OneToOne,
  OneToMany,
} from "@mikro-orm/core";
import { BlockType } from "../enums";
import { Field, ObjectType } from "type-graphql";
import { v4 as uuidv4 } from "uuid";
import { CustomField } from "./CustomField";
import { OptionValue } from "./CustomFieldOptionValue";

@ObjectType()
@Entity()
export class CustomFieldOption {
  /** uuid generated for custom field with prefix */
  @Field()
  @PrimaryKey()
  id: string = uuidv4();

  /** arranged in add cells to row or column */
  @Field()
  @Property()
  optionId: string = `${BlockType.FIELDOPTION}-${uuidv4()}`;

  @Field()
  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Field()
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Field()
  @Property({ version: true })
  version!: number;

  /** column title */
  @Field()
  @Property()
  title: string;

  @Field(() => CustomField)
  @OneToOne(() => CustomField, (parentField) => parentField.fieldOption)
  parentField!: CustomField;

  @Field(() => [OptionValue])
  @OneToMany(() => OptionValue, (optionValue) => optionValue.parentFieldOption)
  values!: OptionValue[];
}
