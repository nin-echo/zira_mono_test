import {
  Entity,
  PrimaryKey,
  Property,
  Enum,
  Formula,
  ManyToOne,
  OneToOne,
} from "@mikro-orm/core";
import { BlockType, CustomFieldType, UserType } from "src/enums";
import { v4 as uuidv4 } from "uuid";
import { CustomFieldOption } from "./CustomFieldOption";
import { Schema } from "./Schema";

@Entity()
export class CustomField {
  /** uuid generated for custom field with prefix */
  @PrimaryKey()
  @Formula(`${BlockType.CUSTOMFIELD}-${uuidv4()}`)
  id!: string;

  @Formula(`${BlockType.CUSTOMDATAGROUP}-${uuidv4()}`)
  dataGroupId!: string;

  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ version: true })
  version!: number;

  @ManyToOne(() => Schema)
  schema!: Schema;

  @Enum({ default: UserType.MANAGER })
  permitEditBy: UserType = UserType.MANAGER;

  @Enum({ default: CustomFieldType.TEXT })
  type: CustomFieldType = CustomFieldType.TEXT;

  @OneToOne()
  fieldOption!: CustomFieldOption;
}
