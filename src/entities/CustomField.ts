import {
  Entity,
  PrimaryKey,
  Property,
  Enum,
  ManyToOne,
  OneToOne,
  Formula,
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
  @Formula(`${BlockType.CUSTOMFIELD}-${uuidv4()}`)
  id!: string;

  @Field()
  @Formula(`${BlockType.CUSTOMDATAGROUP}-${uuidv4()}`)
  dataGroupId!: string;

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

  @Field()
  @Enum({ default: UserType.MANAGER })
  permitEditBy: UserType = UserType.MANAGER;

  @Field()
  @Enum({ default: CustomFieldType.TEXT })
  type: CustomFieldType = CustomFieldType.TEXT;

  @Field()
  @OneToOne()
  fieldOption!: CustomFieldOption;
}
