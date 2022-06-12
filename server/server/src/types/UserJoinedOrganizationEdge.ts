import { ObjectType } from "type-graphql";

@ObjectType()
export class UserJoinedOrganizationEdge {
    id!: string;

    userId!: string;

    organizationId!: string;
}
