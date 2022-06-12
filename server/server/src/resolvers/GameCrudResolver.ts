import { Arg, Ctx, ID, Mutation, Query, Resolver } from "type-graphql";
import { GraphQLContext } from "../context";
import { ValidateInput } from "../decorators/ValidateInput";
import { CreateGameInput } from "../inputs/CreateGameInput";
import { CreateGamePayload } from "../outputs/CreateGamePayload";
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
                id: id,
            },
        });
    }

    @Mutation(() => CreateGamePayload, { nullable: true })
    @ValidateInput(CreateGameInput, "input")
    async createGame(
        @Ctx() { prisma }: GraphQLContext,
        @Arg("input") input: CreateGameInput,
    ): Promise<CreateGamePayload | null> {
        const { divisionId, ...gameData } = input;
        const positions = await prisma.position.findMany({
            where: { divisionId: Number(divisionId) },
        });
        return {
            game: await prisma.game.create({
                data: {
                    divisionId: Number(divisionId),
                    ...gameData,
                    listings: {
                        createMany: {
                            data: positions.map((position) => ({
                                positionId: position.id,
                                name: `${input.name} ${position.name}`,
                            })),
                        },
                    },
                },
            }),
            errors: [],
        };
    }
}
