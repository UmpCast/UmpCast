import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { GraphQLContext } from "../context";
import { Game } from "../types/Game";
import { GameListing } from "../types/GameListing";

@Resolver(() => Game)
export class GameRelationsResolver {
    @FieldResolver(() => [GameListing])
    async listings(
        @Root() game: Game,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<GameListing[]> {
        return prisma.listing.findMany({
            where: { gameId: game.id },
        });
    }
}
