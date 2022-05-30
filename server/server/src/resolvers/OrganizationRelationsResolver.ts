import { FieldResolver, Resolver, Root, Ctx, Args } from "type-graphql";
import { GraphQLContext } from "../context";
import { ConnectionArgs } from "../inputs/ConnectionArgs";
import { Organization } from "../types/Organization";
import { OrganizationMemberEdge } from "../types/OrganizationMemberEdge";
import { SeasonConnection } from "../types/Season";
import { paginate } from "../utils/paginate";

@Resolver(() => Organization)
export class OrganizationRelationsResolver {
    @FieldResolver(() => [OrganizationMemberEdge])
    async members(
        @Root() organization: Organization,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<OrganizationMemberEdge[]> {
        return prisma.userOrganization.findMany({
            where: {
                organizationId: organization.id,
            },
        });
    }

    @FieldResolver(() => SeasonConnection)
    async seasons(
        @Root() organization: Organization,
        @Args() connectionArgs: ConnectionArgs,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<SeasonConnection> {
        const seasons = await prisma.season.findMany({
            where: {
                organizationId: organization.id,
            },
        });
        const seasonEdges = seasons.map((season) => ({
            node: season,
            cursor: season.id.toString(),
        }));
        return paginate(seasonEdges, connectionArgs);
    }
}
