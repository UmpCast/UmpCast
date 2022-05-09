import { Query, Resolver, Ctx, Arg } from "type-graphql";
import { Season } from "../types/Season";
import { GraphQLContext } from "../context";

@Resolver(() => Season)
export class SeasonCrudResolver {
    @Query(() => Season, { nullable: true })
    async season(
        @Ctx() { prisma }: GraphQLContext,
        @Arg("id") id: number,
    ): Promise<Season | null> {
        return prisma.season.findUnique({
            where: {
                id: id,
            },
        });
    }
}
