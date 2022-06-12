import { ObjectType, Field, ID } from "type-graphql";
import { ConnectionType } from "../utils/ConnectionType";
import { EdgeType } from "../utils/EdgeType";

@ObjectType()
export class Game {
    @Field(() => ID)
    id!: string;

    divisionId!: string;

    @Field()
    name!: string;

    @Field(() => String, { nullable: true })
    location!: string | null;

    @Field()
    startTime!: Date;

    @Field(() => Date, { nullable: true })
    endTime!: Date | null;

    @Field()
    createdAt!: Date;

    @Field()
    updatedAt!: Date;
}

@ObjectType()
export class GameEdge extends EdgeType("game", Game) {}

@ObjectType()
export class GameConnection extends ConnectionType("game", GameEdge) {}
