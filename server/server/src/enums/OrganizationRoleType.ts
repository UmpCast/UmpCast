import { registerEnumType } from "type-graphql";

export enum OrganizationRoleType {
    OWNER = "OWNER",
    MEMBER = "MEMBER",
}
registerEnumType(OrganizationRoleType, {
    name: "OrganizationRoleType",
});
