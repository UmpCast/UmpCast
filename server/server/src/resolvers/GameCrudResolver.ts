import { Arg, Ctx, ID, Query, Resolver } from "type-graphql";
import { GraphQLContext } from "../context";
import { Game } from "../types/Game";

@Resolver(() => Game)
export class GameCrudResolver {
    @Query(() => Game, { nullable: true })
    async game(
        @Ctx() { prisma }: GraphQLContext,
        @Arg("id", () => ID) id: string,
    ): Promise<Game | null> {
        return prisma.game.findUnique({
            where: {
                id: Number(id),
            },
        });
    }
}
