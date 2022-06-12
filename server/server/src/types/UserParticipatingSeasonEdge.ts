import { ObjectType } from "type-graphql";

@ObjectType()
export class UserParticipatingSeasonEdge {
    id!: string;

    userId!: string;

    seasonId!: string;
}
