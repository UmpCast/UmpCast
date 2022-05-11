import { Arg, Ctx, ID, Query, Resolver } from "type-graphql";
import { GraphQLContext } from "../context";
import { SeasonParticipationPermit } from "../types/SeasonParticipationPermit";

@Resolver(() => SeasonParticipationPermit)
export class SeasonParticipationPermitCrudResolver {
    @Query(() => SeasonParticipationPermit, { nullable: true })
    async seasonParticipationPermit(
        @Ctx() { prisma }: GraphQLContext,
        @Arg("id", () => ID) id: string,
    ): Promise<SeasonParticipationPermit | null> {
        return prisma.userSeason.findUnique({
            where: {
                id: Number(id),
            },
        });
    }
}
