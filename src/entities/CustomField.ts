import {
  Entity,
  PrimaryKey,
  Property,
  Enum,
  ManyToOne,
  OneToOne,
} from "@mikro-orm/core";
import { BlockType, UserType, CustomFieldType } from "../enums";
import { v4 as uuidv4 } from "uuid";
import { CustomFieldOption } from "./CustomFieldOption";
import { Schema } from "./Schema";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class CustomField {
  /** uuid generated for custom field with prefix */
  @Field()
  @PrimaryKey()
  id: string = `${BlockType.CUSTOMFIELD}-${uuidv4()}`;

  /** arranged in add cells to row or column */
  @Field()
  dataGroupId: string = `${BlockType.CUSTOMDATAGROUP}-${uuidv4()}`;

  @Field()
  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Field()
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Field()
  @Property({ version: true })
  version!: number;

  @Field(() => Schema)
  @ManyToOne(() => Schema)
  schema!: Schema;

  @Field(() => String)
  @Enum({ default: UserType.MANAGER })
  permitEditBy: UserType = UserType.MANAGER;

  @Field(() => String)
  @Enum({ default: CustomFieldType.TEXT })
  type: CustomFieldType = CustomFieldType.TEXT;

  /** point to option id or other objects id */
  /** displayed value from options */
  @Field(() => [String])
  @Property()
  valueOptionId!: String[];

  @Field()
  @OneToOne()
  fieldOption!: CustomFieldOption;
}
