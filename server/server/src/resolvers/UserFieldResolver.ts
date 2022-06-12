import { Arg, Ctx, FieldResolver, ID, Resolver, Root } from "type-graphql";
import { GraphQLContext } from "../context";
import { User } from "../types/User";
import { UserParticipatingSeasonEdge } from "../types/UserParticipatingSeasonEdge";

@Resolver(() => User)
export class UserFieldResolver {
    @FieldResolver(() => UserParticipatingSeasonEdge, { nullable: true })
    async season(
        @Root() user: User,
        @Ctx() { prisma }: GraphQLContext,
        @Arg("seasonId", () => ID) seasonId: string,
    ): Promise<UserParticipatingSeasonEdge | null> {
        return prisma.userSeason.findUnique({
            where: {
                userId_seasonId: {
                    userId: user.id,
                    seasonId: seasonId,
                },
            },
        });
    }
}
