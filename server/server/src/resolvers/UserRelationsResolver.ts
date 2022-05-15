import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { GraphQLContext } from "../context";
import { User } from "../types/User";
import { UserJoinedOrganizationEdge } from "../types/UserJoinedOrganizationEdge";
import { UserParticipatingSeasonEdge } from "../types/UserParticipatingSeasonEdge";

@Resolver(() => User)
export class UserRelationsResolver {
    @FieldResolver(() => [UserJoinedOrganizationEdge])
    async organizations(
        @Root() user: User,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<UserJoinedOrganizationEdge[]> {
        return prisma.userOrganization.findMany({
            where: {
                userId: user.id,
            },
        });
    }

    @FieldResolver(() => [UserParticipatingSeasonEdge])
    async seasons(
        @Root() user: User,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<UserParticipatingSeasonEdge[]> {
        return prisma.userSeason.findMany({
            where: {
                userId: user.id,
            },
        });
    }
}
