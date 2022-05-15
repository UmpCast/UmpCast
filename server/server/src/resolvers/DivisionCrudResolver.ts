import { Arg, Ctx, ID, Query, Resolver } from "type-graphql";
import { GraphQLContext } from "../context";
import { Division } from "../types/Division";

@Resolver(() => Division)
export class DivisionCrudResolver {
    @Query(() => Division, { nullable: true })
    async division(
        @Ctx() { prisma }: GraphQLContext,
        @Arg("id", () => ID) id: string,
    ): Promise<Division | null> {
        return prisma.division.findUnique({
            where: {
                id: Number(id),
            },
        });
    }
}
