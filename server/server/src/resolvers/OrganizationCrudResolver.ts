import { Query, Resolver, Ctx, Arg, ID } from "type-graphql";
import { Organization } from "../types/Organization";
import { GraphQLContext } from "../context";

@Resolver(() => Organization)
export class OrganizationCrudResolver {
    @Query(() => Organization, { nullable: true })
    async organization(
        @Ctx() { prisma }: GraphQLContext,
        @Arg("id", () => ID) id: string,
    ): Promise<Organization | null> {
        return prisma.organization.findUnique({
            where: {
                id: Number(id),
            },
        });
    }
}
