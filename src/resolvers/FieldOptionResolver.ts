import { CustomFieldOption } from "../entities/CustomFieldOption";
import { ZiraContext } from "../type";
import { Resolver, Ctx, Query, Mutation } from "type-graphql";

@Resolver()
export class FieldOptionResolver {
  @Query(() => [CustomFieldOption])
  options(@Ctx() { em }: ZiraContext): Promise<CustomFieldOption[]> {
    return em.find(CustomFieldOption, {});
  }

  @Mutation(() => Boolean)
  async deleteAllOptions(@Ctx() { em }: ZiraContext): Promise<boolean> {
    await em.nativeDelete(CustomFieldOption, {});
    return true;
  }
}
