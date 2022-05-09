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
        let division = await prisma.position
            .findUnique({
                where: { id: position.id },
            })
            .division({});
        if (division != null) {
            return division!;
        } else {
            throw new Error("Division not found");
        }
    }
}
