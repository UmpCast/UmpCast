import { Query, Resolver, Ctx, Arg, ID, Mutation } from "type-graphql";
import { Organization } from "../types/Organization";
import { GraphQLContext } from "../context";
import { CreateOrganizationPayload } from "../outputs/CreateOrganizationPayload";
import { ValidateInput } from "../decorators/ValidateInput";
import { CreateOrganizationInput } from "../inputs/CreateOrganizationInput";
import { UpdateOrganizationPayload } from "../outputs/UpdateOrganizationPayload";
import { UpdateOrganizationInput } from "../inputs/UpdateOrganizationInput";

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

    @Mutation(() => CreateOrganizationPayload, { nullable: true })
    @ValidateInput(CreateOrganizationInput, "input")
    async createOrganization(
        @Ctx() { prisma }: GraphQLContext,
        @Arg("input") input: CreateOrganizationInput,
    ): Promise<CreateOrganizationPayload | null> {
        return {
            organization: await prisma.organization.create({ data: input }),
            errors: [],
        };
    }

    @Mutation(() => UpdateOrganizationPayload, { nullable: true })
    @ValidateInput(UpdateOrganizationInput, "input")
    async updateOrganization(
        @Ctx() { prisma }: GraphQLContext,
        @Arg("input") input: UpdateOrganizationInput,
    ): Promise<UpdateOrganizationPayload | null> {
        const { organizationId, ...organizationData } = input;
        return {
            organization: await prisma.organization.update({
                where: {
                    id: Number(organizationId),
                },
                data: organizationData,
            }),
            errors: [],
        };
    }
}
