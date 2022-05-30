import {
    Resolver,
    Ctx,
    Root,
    FieldResolver,
    Arg,
    Args,
    Field,
} from "type-graphql";
import { Division, DivisionConnection } from "../types/Division";
import { GraphQLContext } from "../context";
import { Organization } from "../types/Organization";
import { Season } from "../types/Season";
import { GameConnection } from "../types/Game";
import { SeasonParticipantEdge } from "../types/SeasonParticipantEdge";
import { ConnectionArgs } from "../inputs/ConnectionArgs";
import { paginate } from "../utils/paginate";

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

    @FieldResolver(() => DivisionConnection)
    async divisions(
        @Root() season: Season,
        @Ctx() { prisma }: GraphQLContext,
        @Args() connectionArgs: ConnectionArgs,
    ): Promise<DivisionConnection> {
        const divisions = await prisma.division.findMany({
            where: {
                seasonId: season.id,
            },
        });
        const divisionEdges = divisions.map((division) => ({
            node: division,
            cursor: division.id.toString(),
        }));
        return paginate(divisionEdges, connectionArgs);
    }

    @FieldResolver(() => GameConnection)
    async games(
        @Root() season: Season,
        @Ctx() { prisma }: GraphQLContext,
        @Args() connectionArgs: ConnectionArgs,
        @Arg("startDate", () => Date) startDate: Date,
        @Arg("endDate", () => Date) endDate: Date,
    ): Promise<GameConnection> {
        const games = await prisma.game.findMany({
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
        const gameEdges = games.map((game) => ({
            node: game,
            cursor: game.id.toString(),
        }));
        return paginate(gameEdges, connectionArgs);
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
