import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { GraphQLContext } from "../context";
import { GameListing } from "../types/GameListing";
import { GameListingAssigneeEdge } from "../types/GameListingAssigneeEdge";
import { Position } from "../types/Position";

@Resolver(() => GameListing)
export class GameListingRelationsResolver {
    @FieldResolver(() => Position, { nullable: true })
    async position(
        @Root() gameListing: GameListing,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<Position | null> {
        const positionId = gameListing.positionId;
        if (positionId != null) {
            return prisma.position.findUnique({
                where: { id: positionId! },
                rejectOnNotFound: () => new Error("Position not found"),
            });
        } else {
            return null;
        }
    }

    @FieldResolver(() => GameListingAssigneeEdge, { nullable: true })
    async assignee(
        @Root() gameListing: GameListing,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<GameListingAssigneeEdge | null> {
        const userId = gameListing.userId;
        if (userId != null) {
            const {
                division: { seasonId },
            } = await prisma.game.findUnique({
                where: { id: gameListing.gameId },
                select: {
                    division: {
                        select: {
                            seasonId: true,
                        },
                    },
                },
                rejectOnNotFound: () => new Error("Game not found"),
            });
            return {
                userId: userId,
                seasonId: seasonId,
            };
        } else {
            return null;
        }
    }
}
