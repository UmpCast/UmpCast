import { Resolver, FieldResolver, Ctx, Root, Args } from "type-graphql";
import { GameConnection } from "../types/Game";
import { GraphQLContext } from "../context";
import { Division } from "../types/Division";
import { Position } from "../types/Position";
import { Season } from "../types/Season";
import { ConnectionArgs } from "../inputs/ConnectionArgs";
import { paginate } from "../utils/paginate";

@Resolver(() => Division)
export class DivisionRelationsResolver {
    @FieldResolver(() => Season)
    async season(
        @Root() division: Division,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<Season> {
        return prisma.season.findUnique({
            where: { id: division.seasonId },
            rejectOnNotFound: () => new Error("Season not found"),
        });
    }

    @FieldResolver(() => [Position])
    async positions(
        @Root() division: Division,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<Position[]> {
        return prisma.position.findMany({
            where: {
                divisionId: division.id,
            },
        });
    }

    @FieldResolver(() => GameConnection)
    async games(
        @Root() division: Division,
        @Args() connectionArgs: ConnectionArgs,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<GameConnection> {
        const games = await prisma.game.findMany({
            where: {
                divisionId: division.id,
            },
        });
        const gameEdges = games.map((game) => ({
            node: game,
            cursor: game.id.toString(),
        }));
        return paginate(gameEdges, connectionArgs);
    }
}
