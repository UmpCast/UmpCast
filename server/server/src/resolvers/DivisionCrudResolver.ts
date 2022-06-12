import { Arg, Ctx, ID, Mutation, Query, Resolver } from "type-graphql";
import { GraphQLContext } from "../context";
import { ValidateInput } from "../decorators/ValidateInput";
import { CreateDivisionInput } from "../inputs/CreateDivisionInput";
import { CreateDivisionPayload } from "../outputs/CreateDivisionPayload";
import { Division } from "../types/Division";

@Resolver(() => Division)
export class DivisionCrudResolver {
    @Query(() => Division, { nullable: true })
    async division(
        @Ctx() { prisma }: GraphQLContext,
        @Arg("id", () => ID) id: string,
    ): Promise<Division | null> {
        return prisma.division.findUnique({
            where: {
                id: id,
            },
        });
    }

    @Mutation(() => CreateDivisionPayload, { nullable: true })
    @ValidateInput(CreateDivisionInput, "input")
    async createDivision(
        @Ctx() { prisma }: GraphQLContext,
        @Arg("input") input: CreateDivisionInput,
    ): Promise<CreateDivisionPayload | null> {
        const { seasonId, ...divisionData } = input;
        return {
            division: await prisma.division.create({
                data: {
                    seasonId: Number(seasonId),
                    ...divisionData,
                },
            }),
            errors: [],
        };
    }
}
