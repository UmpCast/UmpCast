import { FieldResolver, Ctx, Resolver, Root, Args } from "type-graphql";
import { GraphQLContext } from "../context";
import { ConnectionArgs } from "../inputs/ConnectionArgs";
import { OrganizationMembership } from "../types/OrganizationMembership";
import { PositionConnection } from "../types/Position";
import { SeasonParticipationPermit } from "../types/SeasonParticipationPermit";
import { paginate } from "../utils/paginate";

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

    @FieldResolver(() => PositionConnection)
    async visibility(
        @Root() seasonParticipationPermit: SeasonParticipationPermit,
        @Args() connectionArgs: ConnectionArgs,
        @Ctx() { prisma }: GraphQLContext,
    ): Promise<PositionConnection> {
        const positions = await prisma.position.findMany({
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
        const positionEdges = positions.map((position) => ({
            node: position,
            cursor: position.id.toString(),
        }));
        return paginate(positionEdges, connectionArgs);
    }
}
