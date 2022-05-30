import { Query, Resolver, Ctx, Arg, ID, Mutation } from "type-graphql";
import { Season } from "../types/Season";
import { GraphQLContext } from "../context";
import { CreateSeasonPayload } from "../outputs/CreateSeasonPayload";
import { ValidateInput } from "../decorators/ValidateInput";
import { CreateSeasonInput } from "../inputs/CreateSeasonInput";

@Resolver(() => Season)
export class SeasonCrudResolver {
    @Query(() => Season, { nullable: true })
    async season(
        @Ctx() { prisma }: GraphQLContext,
        @Arg("id", () => ID) id: string,
    ): Promise<Season | null> {
        return prisma.season.findUnique({
            where: {
                id: Number(id),
            },
        });
    }

    @Mutation(() => CreateSeasonPayload, { nullable: true })
    @ValidateInput(CreateSeasonInput, "input")
    async createSeason(
        @Ctx() { prisma }: GraphQLContext,
        @Arg("input") input: CreateSeasonInput,
    ): Promise<CreateSeasonPayload | null> {
        const { organizationId, ...seasonData } = input;
        return {
            season: await prisma.season.create({
                data: { organizationId: Number(organizationId), ...seasonData },
            }),
            errors: [],
        };
    }
}
