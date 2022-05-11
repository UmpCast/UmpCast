import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { GraphQLContext } from "../context";
import { GameListingAssigneeEdge } from "../types/GameListingAssigneeEdge";
import { SeasonParticipationPermit } from "../types/SeasonParticipationPermit";
import { User } from "../types/User";

@Resolver(() => GameListingAssigneeEdge)
export class GameListingAssigneeEdgeRelationsResolver {
    @FieldResolver(() => User)
    async node(
        @Root() gameListingAssigneeEdge: GameListingAssigneeEdge,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<User> {
        return prisma.user.findUnique({
            where: { id: gameListingAssigneeEdge.userId },
            rejectOnNotFound: () => new Error("User not found"),
        });
    }

    @FieldResolver(() => SeasonParticipationPermit)
    async permit(
        @Root() gameListingAssigneeEdge: GameListingAssigneeEdge,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<SeasonParticipationPermit> {
        return prisma.userSeason.findUnique({
            where: {
                userId_seasonId: {
                    userId: gameListingAssigneeEdge.userId,
                    seasonId: gameListingAssigneeEdge.seasonId,
                },
            },
            rejectOnNotFound: () =>
                new Error("SeasonParticipationPermit not found"),
        });
    }
}
