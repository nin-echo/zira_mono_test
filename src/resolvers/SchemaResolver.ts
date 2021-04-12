import { Schema } from "../entities/Schema";
import { ZiraContext } from "../type";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { BlockType, CustomFieldType } from "../enums";
import { CustomFieldOption } from "../entities/CustomFieldOption";
import { CustomField } from "../entities/CustomField";
import { v4 as uuidv4 } from "uuid";
import { OptionValue } from "../entities/CustomFieldOptionValue";

@InputType()
class CustomFieldInput {
  @Field()
  schemaId: string;

  @Field({ nullable: true })
  dataGroupId?: String;

  @Field({ nullable: true })
  optionId?: String;

  @Field({ nullable: true })
  type: CustomFieldType;

  @Field()
  fieldValue: string;
}

@Resolver()
export class SchemaResolver {
  @Query(() => Schema, { nullable: true })
  schemaByBlockId(
    @Arg("blockId", () => String) blockId: string,
    @Ctx() { em }: ZiraContext
  ): Promise<Schema | null> {
    return em.findOne(Schema, {
      parentBlock: {
        id: blockId,
      },
    });
  }

  /** horizonal direction */
  @Mutation(() => Schema, { nullable: true })
  async newCustomFieldInSameRow(
    @Arg("customField", () => CustomFieldInput) newField: CustomFieldInput,
    @Ctx() { em }: ZiraContext
  ): Promise<Schema | null> {
    const schema = await em.findOne(Schema, { id: newField.schemaId });

    const optionValue = em.create(OptionValue, {
      value: newField.fieldValue,
    });

    const fieldOption = em.create(CustomFieldOption, {
      values: [optionValue],
    });

    /** create new with old groupId */
    const newCustomFieldInHorizon = em.create(CustomField, {
      dataGroupId: newField.dataGroupId,
      fieldOption: fieldOption,
      type: newField.type,
      valueOptionId: fieldOption.optionId,
    });

    /** add to view */
    schema?.view.row[`${newField.dataGroupId as string}`].push(optionValue.id);
    schema?.view.column.push(newCustomFieldInHorizon.fieldOption.optionId);
    schema?.customFields.add(newCustomFieldInHorizon);

    em.persistAndFlush([
      optionValue,
      fieldOption,
      newCustomFieldInHorizon,
      schema,
    ]);

    return schema;
  }

  /** vertical direction */
  @Mutation(() => Schema, { nullable: true })
  async newCustomFieldInSameColumn(
    @Arg("customField", () => CustomFieldInput) newField: CustomFieldInput,
    @Ctx() { em }: ZiraContext
  ): Promise<Schema | null> {
    const schema = await em.findOne(Schema, { id: newField.schemaId });
    /** generate new dateGroupId */
    const newDataGroupId = `${BlockType.CUSTOMDATAGROUP}-${uuidv4()}`;

    const optionValue = em.create(OptionValue, {
      value: newField.fieldValue,
    });

    const fieldOption = em.create(CustomFieldOption, {
      optionId: newField.optionId,
      values: [optionValue],
    });

    /** create new with new groupId */
    const newCustomFieldInVertical = em.create(CustomField, {
      dataGroupId: newDataGroupId,
      fieldOption: fieldOption,
      type: newField.type,
      valueOptionId: fieldOption.optionId,
    });
    /** copy columns options */
    /** add to view */
    // schema?.view.row.push(newDataGroupId);
    schema?.customFields.add(newCustomFieldInVertical);

    em.persistAndFlush([
      optionValue,
      fieldOption,
      newCustomFieldInVertical,
      schema,
    ]);

    return schema;
  }

  @Mutation(() => Boolean)
  async deleteAllSchemas(@Ctx() { em }: ZiraContext): Promise<boolean> {
    await em.nativeDelete(Schema, {});
    return true;
  }
}
