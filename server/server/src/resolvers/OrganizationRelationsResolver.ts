import { FieldResolver, Resolver, Root, Ctx } from "type-graphql";
import { GraphQLContext } from "../context";
import { Organization } from "../types/Organization";
import { OrganizationMemberEdge } from "../types/OrganizationMemberEdge";
import { Season } from "../types/Season";

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

    @FieldResolver(() => [Season])
    async seasons(
        @Root() organization: Organization,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<Season[]> {
        return prisma.season.findMany({
            where: {
                organizationId: organization.id,
            },
        });
    }
}
