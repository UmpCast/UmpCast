import { ObjectType } from "type-graphql";

@ObjectType()
export class UserJoinedOrganizationEdge {
    id!: number;

    userId!: string;

    organizationId!: number;
}
