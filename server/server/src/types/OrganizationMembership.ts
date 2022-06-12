import { ObjectType, Field, ID } from "type-graphql";
import { OrganizationRoleType } from "../enums/OrganizationRoleType";

@ObjectType()
export class OrganizationMembership {
    @Field(() => ID)
    id!: string;

    userId!: string;

    organizationId!: string;

    @Field()
    createdAt!: Date;

    @Field()
    updatedAt!: Date;

    @Field(() => OrganizationRoleType)
    role!: "OWNER" | "MEMBER";
}
