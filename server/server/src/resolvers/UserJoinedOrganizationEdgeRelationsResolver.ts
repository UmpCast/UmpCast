import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { GraphQLContext } from "../context";
import { Organization } from "../types/Organization";
import { OrganizationMembership } from "../types/OrganizationMembership";
import { UserJoinedOrganizationEdge } from "../types/UserJoinedOrganizationEdge";

@Resolver(() => UserJoinedOrganizationEdge)
export class UserJoinedOrganizationEdgeRelationsResolver {
    @FieldResolver(() => Organization)
    async node(
        @Root() userJoinedOrganizationEdge: UserJoinedOrganizationEdge,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<Organization> {
        return prisma.organization.findUnique({
            where: { id: userJoinedOrganizationEdge.organizationId },
            rejectOnNotFound: () => new Error("Organization not found"),
        });
    }

    @FieldResolver(() => OrganizationMembership)
    async membership(
        @Root() userJoinedOrganizationEdge: UserJoinedOrganizationEdge,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<OrganizationMembership> {
        return prisma.userOrganization.findUnique({
            where: { id: userJoinedOrganizationEdge.id },
            rejectOnNotFound: () =>
                new Error("OrganizationMembership not found"),
        });
    }
}
