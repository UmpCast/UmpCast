import { Resolver, FieldResolver, Ctx, Root } from "type-graphql";
import { GraphQLContext } from "../context";
import { OrganizationMemberEdge } from "../types/OrganizationMemberEdge";
import { OrganizationMembership } from "../types/OrganizationMembership";
import { User } from "../types/User";

@Resolver(() => OrganizationMemberEdge)
export class OrganizationMemberEdgeRelationsResolver {
    @FieldResolver(() => User)
    async node(
        @Root() organizationMemberEdge: OrganizationMemberEdge,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<User> {
        return prisma.user.findUnique({
            where: { id: organizationMemberEdge.userId },
            rejectOnNotFound: () => new Error("User not found"),
        });
    }

    @FieldResolver(() => OrganizationMembership)
    async membership(
        @Root() organizationMemberEdge: OrganizationMemberEdge,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<OrganizationMembership> {
        return prisma.userOrganization.findUnique({
            where: { id: organizationMemberEdge.id },
            rejectOnNotFound: () =>
                new Error("OrganizationMembership not found"),
        });
    }
}
