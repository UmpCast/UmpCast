import { ObjectType } from "type-graphql";

@ObjectType()
export class OrganizationMemberEdge {
    id!: string;

    userId!: string;

    organizationId!: string;
}
