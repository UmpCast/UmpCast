import { registerEnumType } from "type-graphql";

export enum SeasonRoleType {
    MANAGER = "MANAGER",
    REFEREE = "REFEREE",
}
registerEnumType(SeasonRoleType, {
    name: "SeasonRoleType",
});
