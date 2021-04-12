import { CustomField } from "../entities/CustomField";
import { ZiraContext } from "../type";
import { Ctx, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class CustomFieldResolver {
  @Query(() => [CustomField])
  customFields(@Ctx() { em }: ZiraContext): Promise<CustomField[]> {
    return em.find(CustomField, {});
  }

  @Mutation(() => Boolean)
  async deleteAllFields(@Ctx() { em }: ZiraContext): Promise<boolean> {
    await em.nativeDelete(CustomField, {});
    return true;
  }
}
