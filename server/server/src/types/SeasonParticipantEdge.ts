import { ObjectType } from "type-graphql";

@ObjectType()
export class SeasonParticipantEdge {
    id!: number;

    userId!: string;

    seasonId!: number;
}
