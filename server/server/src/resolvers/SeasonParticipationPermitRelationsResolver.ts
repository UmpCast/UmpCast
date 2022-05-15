import { FieldResolver, Ctx, Resolver, Root } from "type-graphql";
import { GraphQLContext } from "../context";
import { OrganizationMembership } from "../types/OrganizationMembership";
import { Position } from "../types/Position";
import { SeasonParticipationPermit } from "../types/SeasonParticipationPermit";

@Resolver(() => SeasonParticipationPermit)
export class SeasonParticipationPermitRelationsResolver {
    @FieldResolver(() => OrganizationMembership)
    async membership(
        @Root() seasonParticipationPermit: SeasonParticipationPermit,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<OrganizationMembership> {
        const { organizationId } = await prisma.season.findUnique({
            where: { id: seasonParticipationPermit.seasonId },
            select: {
                organizationId: true,
            },
            rejectOnNotFound: () => new Error("Season not found"),
        });
        return prisma.userOrganization.findUnique({
            where: {
                userId_organizationId: {
                    userId: seasonParticipationPermit.userId,
                    organizationId: organizationId,
                },
            },
            rejectOnNotFound: () =>
                new Error("OrganizationMembership not found"),
        });
    }

    @FieldResolver(() => [Position])
    async visibility(
        @Root() seasonParticipationPermit: SeasonParticipationPermit,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<Position[]> {
        return prisma.position.findMany({
            where: {
                userPositions: {
                    some: {
                        userId: seasonParticipationPermit.userId,
                        position: {
                            division: {
                                seasonId: seasonParticipationPermit.seasonId,
                            },
                        },
                    },
                },
            },
        });
    }
}
