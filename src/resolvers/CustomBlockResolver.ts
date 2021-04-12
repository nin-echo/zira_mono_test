import { CustomBlock } from "../entities/CustomBlock";
import { ZiraContext } from "../type";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { Schema } from "../entities/Schema";
import { BlockType } from "../enums";
import { v4 as uuidv4 } from "uuid";
import { CustomField } from "../entities/CustomField";
import { CustomFieldOption } from "../entities/CustomFieldOption";
import { OptionValue } from "../entities/CustomFieldOptionValue";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class CustomBlockResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => CustomBlock, { nullable: true })
  block?: CustomBlock;
}

@Resolver()
export class CustomBlockResolver {
  @Query(() => [CustomBlock])
  blocks(@Ctx() { em }: ZiraContext): Promise<CustomBlock[]> {
    return em.find(CustomBlock, {});
  }

  @Query(() => CustomBlock, { nullable: true })
  block(
    @Arg("id", () => String) id: string,
    @Ctx() { em }: ZiraContext
  ): Promise<CustomBlock | null> {
    return em.findOne(CustomBlock, { id });
  }

  @Mutation(() => CustomBlockResponse)
  async createCustomBlock(
    @Arg("title") title: string,
    @Ctx() { em }: ZiraContext
  ): Promise<CustomBlockResponse> {
    const block = em.create(CustomBlock, { title });
    try {
      await em.persistAndFlush(block);
    } catch (err) {
      // duplicate block title error
      if (err.code === "23505" || err.detail.includes("already exists")) {
        return {
          errors: [
            {
              field: "block",
              message: "block title already taken",
            },
          ],
        };
      }
    }

    const newOptionId = `${BlockType.FIELDOPTION}-${uuidv4()}`;
    const optionValue = em.create(OptionValue, {
      value: "",
    });

    const fieldOption = em.create(CustomFieldOption, {
      optionId: newOptionId,
      values: [optionValue],
    });
    const customField = em.create(CustomField, {
      valueOptionId: fieldOption.optionId,
      fieldOption: fieldOption,
    });

    const schema = em.create(Schema, {
      view: {
        row: { [`${customField.dataGroupId}`]: [optionValue.id] },
        column: [newOptionId],
      },
      customFields: [customField],
    });
    console.log(schema);
    block.schema = schema;
    em.persistAndFlush([optionValue, fieldOption, customField, schema, block]);

    return { block };
  }

  @Mutation(() => CustomBlock, { nullable: true })
  async updateCustomBlock(
    @Arg("id") id: string,
    @Arg("title", () => String, { nullable: true }) title: string,
    @Ctx() { em }: ZiraContext
  ): Promise<CustomBlock | null> {
    const block = await em.findOne(CustomBlock, { id });
    if (!block) {
      return null;
    }
    if (typeof title !== "undefined") {
      block.title = title;
      await em.persistAndFlush(block);
    }
    return block;
  }

  @Mutation(() => Boolean)
  async deleteBlock(
    @Arg("id") id: string,
    @Ctx() { em }: ZiraContext
  ): Promise<boolean> {
    await em.nativeDelete(Schema, {
      parentBlock: {
        id: id,
      },
    });
    await em.nativeDelete(CustomBlock, { id });
    return true;
  }

  @Mutation(() => Boolean)
  async deleteAllBlocks(@Ctx() { em }: ZiraContext): Promise<boolean> {
    await em.nativeDelete(CustomBlock, {});
    return true;
  }
}
