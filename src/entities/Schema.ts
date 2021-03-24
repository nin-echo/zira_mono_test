import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
  Formula,
  OneToOne,
} from "@mikro-orm/core";
import { BlockType } from "src/enums";
import { v4 as uuidv4 } from "uuid";
import { CustomBlock } from "./CustomBlock";
import { CustomField } from "./CustomField";

@Entity()
export class Schema {
  /** uuid generated for schema with prefix */
  @PrimaryKey()
  @Formula(`${BlockType.SCHEMA}-${uuidv4()}`)
  id!: string;

  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ type: "json", nullable: false })
  view!: { row: CustomField[]; column: CustomField[] };

  @OneToOne(() => CustomBlock)
  parentBlock: CustomBlock;

  @OneToMany(() => CustomField, (customField) => customField.schema)
  customFields = new Collection<CustomField>(this);

  @Property({ version: true })
  version!: number;
}
