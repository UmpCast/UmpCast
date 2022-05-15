import { Arg, Ctx, ID, Query, Resolver } from "type-graphql";
import { GraphQLContext } from "../context";
import { OrganizationMembership } from "../types/OrganizationMembership";

@Resolver(() => OrganizationMembership)
export class OrganizationMembershipCrudResolver {
    @Query(() => OrganizationMembership, { nullable: true })
    async organizationMembership(
        @Ctx() { prisma }: GraphQLContext,
        @Arg("id", () => ID) id: string,
    ): Promise<OrganizationMembership | null> {
        return prisma.userOrganization.findUnique({
            where: {
                id: Number(id),
            },
        });
    }
}
