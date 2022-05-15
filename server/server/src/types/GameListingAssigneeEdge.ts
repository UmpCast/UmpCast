import { ObjectType } from "type-graphql";

@ObjectType()
export class GameListingAssigneeEdge {
    userId!: string;

    seasonId!: number;
}
