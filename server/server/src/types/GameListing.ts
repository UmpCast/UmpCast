import { Field, ID, ObjectType } from "type-graphql";
import { ConnectionType } from "../utils/ConnectionType";
import { EdgeType } from "../utils/EdgeType";

@ObjectType()
export class GameListing {
    @Field(() => ID)
    id!: string;

    userId!: string | null;

    positionId!: string | null;

    gameId!: string;

    @Field()
    name!: string;

    @Field()
    createdAt!: Date;

    @Field()
    updatedAt!: Date;
}

@ObjectType()
export class GameListingEdge extends EdgeType("gameListing", GameListing) {}

@ObjectType()
export class GameListingConnection extends ConnectionType(
    "gameListing",
    GameListingEdge,
) {}
