import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { GraphQLContext } from "../context";
import { SeasonParticipantEdge } from "../types/SeasonParticipantEdge";
import { SeasonParticipationPermit } from "../types/SeasonParticipationPermit";
import { User } from "../types/User";

@Resolver(() => SeasonParticipantEdge)
export class SeasonParticipantEdgeRelationsResolver {
    @FieldResolver(() => User)
    async node(
        @Root() seasonParticipantEdge: SeasonParticipantEdge,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<User> {
        return prisma.user.findUnique({
            where: { id: seasonParticipantEdge.userId },
            rejectOnNotFound: () => new Error("User not found"),
        });
    }

    @FieldResolver(() => SeasonParticipationPermit)
    async permit(
        @Root() seasonParticipantEdge: SeasonParticipantEdge,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<SeasonParticipationPermit> {
        return prisma.userSeason.findUnique({
            where: { id: seasonParticipantEdge.id },
            rejectOnNotFound: () =>
                new Error("SeasonParticipationPermit not found"),
        });
    }
}
