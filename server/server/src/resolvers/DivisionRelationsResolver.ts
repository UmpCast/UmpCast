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
        const season = await prisma.division
            .findUnique({
                where: { id: division.id },
            })
            .season({});
        if (season != null) {
            return season!;
        } else {
            throw new Error("Season not found");
        }
    }

    @FieldResolver(() => [Position])
    async positions(
        @Root() division: Division,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<Position[]> {
        return prisma.division
            .findUnique({ where: { id: division.id } })
            .positions({});
    }

    @FieldResolver(() => [Game])
    async games(
        @Root() division: Division,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<Game[]> {
        return prisma.division
            .findUnique({ where: { id: division.id } })
            .games({});
    }
}
