import { Args, Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { GraphQLContext } from "../context";
import { ConnectionArgs } from "../inputs/ConnectionArgs";
import { Game } from "../types/Game";
import { GameListingConnection } from "../types/GameListing";
import { paginate } from "../utils/paginate";

@Resolver(() => Game)
export class GameRelationsResolver {
    @FieldResolver(() => GameListingConnection)
    async listings(
        @Root() game: Game,
        @Args() connectionArgs: ConnectionArgs,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<GameListingConnection> {
        const listings = await prisma.listing.findMany({
            where: { gameId: game.id },
        });
        const listingsEdge = listings.map((listing) => ({
            node: listing,
            cursor: listing.id.toString(),
        }));
        return paginate(listingsEdge, connectionArgs);
    }
}
