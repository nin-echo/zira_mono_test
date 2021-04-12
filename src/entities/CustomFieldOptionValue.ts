import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { BlockType } from "../enums";
import { ObjectType, Field } from "type-graphql";
import { v4 as uuidv4 } from "uuid";
import { CustomFieldOption } from "./CustomFieldOption";

@ObjectType()
@Entity()
export class OptionValue {
  @Field()
  @PrimaryKey()
  id: string = `${BlockType.OPTIONVALUE}-${uuidv4()}`;

  @Field()
  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Field()
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Field()
  @Property({ version: true })
  version!: number;

  @Field(() => CustomFieldOption)
  @ManyToOne(() => CustomFieldOption)
  parentFieldOption: CustomFieldOption;

  @Field()
  @Property()
  value: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  color?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  isVisible?: boolean;
}
