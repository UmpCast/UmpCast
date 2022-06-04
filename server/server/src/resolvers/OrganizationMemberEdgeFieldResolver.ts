import { Arg, Ctx, FieldResolver, ID, Resolver, Root } from "type-graphql";
import { GraphQLContext } from "../context";
import { OrganizationMemberEdge } from "../types/OrganizationMemberEdge";

@Resolver(() => OrganizationMemberEdge)
export class OrganizationMemberEdgeFieldResolver {
    @FieldResolver(() => Boolean)
    async isParticipating(
        @Root() organizationMemberEdge: OrganizationMemberEdge,
        @Ctx() { prisma }: GraphQLContext,
        @Arg("seasonId", () => ID) seasonId: string,
    ): Promise<Boolean> {
        const count = await prisma.userSeason.count({
            where: {
                seasonId: seasonId,
                userId: organizationMemberEdge.userId,
                season: {
                    organizationId: organizationMemberEdge.organizationId,
                },
            },
        });
        return count != 0;
    }
}
