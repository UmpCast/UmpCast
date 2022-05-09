import { Resolver, Ctx, Root, FieldResolver } from "type-graphql";
import { Division } from "../types/Division";
import { GraphQLContext } from "../context";
import { Organization } from "../types/Organization";
import { Season } from "../types/Season";

@Resolver(() => Season)
export class SeasonRelationsResolver {
    @FieldResolver(() => Organization)
    async organization(
        @Root() season: Season,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<Organization> {
        return prisma.organization.findUnique({
            where: { id: season.organizationId },
            rejectOnNotFound: () => new Error("Organization not found"),
        });
    }

    @FieldResolver(() => [Division])
    async divisions(
        @Root() season: Season,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<Division[]> {
        return prisma.season
            .findUnique({ where: { id: season.id } })
            .divisions({});
    }
}
