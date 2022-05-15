import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { GraphQLContext } from "../context";
import { Season } from "../types/Season";
import { SeasonParticipationPermit } from "../types/SeasonParticipationPermit";
import { UserParticipatingSeasonEdge } from "../types/UserParticipatingSeasonEdge";

@Resolver(() => UserParticipatingSeasonEdge)
export class UserParticipatingSeasonEdgeRelationsResolver {
    @FieldResolver(() => Season)
    async node(
        @Root() userParticipatingSeasonEdge: UserParticipatingSeasonEdge,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<Season> {
        return prisma.season.findUnique({
            where: { id: userParticipatingSeasonEdge.seasonId },
            rejectOnNotFound: () => new Error("Season not found"),
        });
    }

    @FieldResolver(() => SeasonParticipationPermit)
    async permit(
        @Root() userParticipatingSeasonEdge: UserParticipatingSeasonEdge,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<SeasonParticipationPermit> {
        return prisma.userSeason.findUnique({
            where: { id: userParticipatingSeasonEdge.id },
            rejectOnNotFound: () =>
                new Error("SeasonParticipationPermit not found"),
        });
    }
}
