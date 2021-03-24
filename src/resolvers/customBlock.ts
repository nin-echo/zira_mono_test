import { CustomBlock } from "../entities/CustomBlock";
import { ZiraContext } from "src/type";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class CustomBlockResolver {
  @Query(() => [CustomBlock])
  blocks(@Ctx() { em }: ZiraContext): Promise<CustomBlock[]> {
    return em.find(CustomBlock, {});
  }
}
