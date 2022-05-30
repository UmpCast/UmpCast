import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { GraphQLContext } from "../context";
import { ValidateInput } from "../decorators/ValidateInput";
import { CreatePositionInput } from "../inputs/CreatePositionInput";
import { CreatePositionPayload } from "../outputs/CreatePositionPayload";
import { Position } from "../types/Position";

@Resolver(() => Position)
export class PositionCrudResolver {
    @Mutation(() => CreatePositionPayload, { nullable: true })
    @ValidateInput(CreatePositionInput, "input")
    async createPosition(
        @Ctx() { prisma }: GraphQLContext,
        @Arg("input") input: CreatePositionInput,
    ): Promise<CreatePositionPayload | null> {
        const { divisionId, ...positionData } = input;
        return {
            position: await prisma.position.create({
                data: { divisionId: Number(divisionId), ...positionData },
            }),
            errors: [],
        };
    }
}
