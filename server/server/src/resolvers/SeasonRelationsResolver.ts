import { Resolver, Ctx, Root, FieldResolver, Arg } from "type-graphql";
import { Division } from "../types/Division";
import { GraphQLContext } from "../context";
import { Organization } from "../types/Organization";
import { Season } from "../types/Season";
import { Game } from "../types/Game";
import { SeasonParticipantEdge } from "../types/SeasonParticipantEdge";

@Resolver(() => Season)
export class SeasonRelationsResolver {
    @FieldResolver(() => Organization)
    async organization(
        @Root() season: Season,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<Organization> {
        return prisma.organization.findUnique({
            where: { id: season.organizationId },
            rejectOnNotFound: () => new Error("Organization not found"),
        });
    }

    @FieldResolver(() => [Division])
    async divisions(
        @Root() season: Season,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<Division[]> {
        return prisma.division.findMany({
            where: {
                seasonId: season.id,
            },
        });
    }

    @FieldResolver(() => [Game])
    async games(
        @Root() season: Season,
        @Ctx() { prisma }: GraphQLContext,
        @Arg("startDate", () => Date) startDate: Date,
        @Arg("endDate", () => Date) endDate: Date,
    ): Promise<Game[]> {
        return prisma.game.findMany({
            where: {
                division: {
                    seasonId: season.id,
                },
                startTime: {
                    gte: startDate,
                    lt: endDate,
                },
            },
        });
    }

    @FieldResolver(() => [SeasonParticipantEdge])
    async participants(
        @Root() season: Season,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<SeasonParticipantEdge[]> {
        return prisma.userSeason.findMany({
            where: { seasonId: season.id },
        });
    }
}
