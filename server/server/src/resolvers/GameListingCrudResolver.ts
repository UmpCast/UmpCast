import { Arg, Ctx, ID, Query, Resolver } from "type-graphql";
import { GraphQLContext } from "../context";
import { GameListing } from "../types/GameListing";

@Resolver(() => GameListing)
export class GameListingCrudResolver {
    @Query(() => GameListing, { nullable: true })
    async gameListing(
        @Ctx() { prisma }: GraphQLContext,
        @Arg("id", () => ID) id: string,
    ): Promise<GameListing | null> {
        return prisma.listing.findUnique({
            where: {
                id: id,
            },
        });
    }
}
