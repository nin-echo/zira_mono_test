import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { BlockType } from "../enums";
import { v4 as uuidv4 } from "uuid";

/** Not Necessary Class */
@Entity()
export class DataGroup {
  @PrimaryKey()
  id: string = `${BlockType.CUSTOMDATAGROUP}-${uuidv4()}`;

  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ version: true })
  version!: number;

  //   @OneToMany(()=>CustomField, customField => customField.dataGroup)
  //   customFields: CustomField[];
}
