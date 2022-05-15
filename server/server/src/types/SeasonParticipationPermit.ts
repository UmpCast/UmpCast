import { Field, ID, Int, ObjectType } from "type-graphql";
import { SeasonRoleType } from "../enums/SeasonRoleType";

@ObjectType()
export class SeasonParticipationPermit {
    @Field(() => ID)
    id!: number;

    userId!: string;

    seasonId!: number;

    @Field(() => Int)
    maxCasts!: number;

    @Field()
    createdAt!: Date;

    @Field()
    updatedAt!: Date;

    @Field(() => SeasonRoleType)
    role!: "MANAGER" | "REFEREE";
}
