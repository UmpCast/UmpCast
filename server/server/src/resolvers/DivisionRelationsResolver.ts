import { Resolver, FieldResolver, Ctx, Root } from "type-graphql";
import { Game } from "../types/Game";
import { GraphQLContext } from "../context";
import { Division } from "../types/Division";
import { Position } from "../types/Position";
import { Season } from "../types/Season";

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

    @FieldResolver(() => [Game])
    async games(
        @Root() division: Division,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<Game[]> {
        return prisma.game.findMany({
            where: {
                divisionId: division.id,
            },
        });
    }
}
