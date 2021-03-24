import {
  Entity,
  PrimaryKey,
  Property,
  Formula,
  OneToOne,
} from "@mikro-orm/core";
import { BlockType } from "src/enums";
import { v4 as uuidv4 } from "uuid";
import { CustomField } from "./CustomField";

@Entity()
export class CustomFieldOption {
  /** uuid generated for custom field with prefix */
  @PrimaryKey()
  @Formula(`${BlockType.FIELDOPTION}-${uuidv4()}`)
  id!: string;

  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ version: true })
  version!: number;

  @OneToOne(() => CustomField, (parentField) => parentField.fieldOption)
  parentField!: CustomField;
}
