import { ObjectType } from "type-graphql";

@ObjectType()
export class OrganizationMemberEdge {
    id!: number;

    userId!: string;

    organizationId!: number;
}
