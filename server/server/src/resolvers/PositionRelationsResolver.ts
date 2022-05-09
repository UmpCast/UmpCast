import { Resolver, FieldResolver, Ctx, Root } from "type-graphql";
import { Position } from "../types/Position";
import { Division } from "../types/Division";
import { GraphQLContext } from "../context";

@Resolver(() => Position)
export class PositionRelationsResolver {
    @FieldResolver(() => Division)
    async division(
        @Root() position: Position,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<Division> {
        return prisma.division.findUnique({
            where: { id: position.divisionId },
            rejectOnNotFound: () => new Error("Division not found"),
        });
    }
}
