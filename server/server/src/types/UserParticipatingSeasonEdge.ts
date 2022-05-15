import { ObjectType } from "type-graphql";

@ObjectType()
export class UserParticipatingSeasonEdge {
    id!: number;

    userId!: string;

    seasonId!: number;
}
