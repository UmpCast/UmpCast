import { ObjectType, Field, ID } from "type-graphql";
import { OrganizationRoleType } from "../enums/OrganizationRoleType";

@ObjectType()
export class OrganizationMembership {
    @Field(() => ID)
    id!: number;

    userId!: string;

    organizationId!: number;

    @Field()
    createdAt!: Date;

    @Field()
    updatedAt!: Date;

    @Field(() => OrganizationRoleType)
    role!: "OWNER" | "MEMBER";
}
