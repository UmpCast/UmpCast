import { ObjectType } from "type-graphql";

@ObjectType()
export class SeasonParticipantEdge {
    id!: string;

    userId!: string;

    seasonId!: string;
}
