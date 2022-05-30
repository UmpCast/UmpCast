import { ObjectType, Field, ID } from "type-graphql";
import { ConnectionType } from "../utils/ConnectionType";
import { EdgeType } from "../utils/EdgeType";

@ObjectType()
export class Position {
    @Field(() => ID)
    id!: number;

    divisionId!: number;

    @Field()
    name!: string;

    @Field()
    createdAt!: Date;

    @Field()
    updatedAt!: Date;
}

@ObjectType()
export class PositionEdge extends EdgeType("position", Position) {}

@ObjectType()
export class PositionConnection extends ConnectionType(
    "position",
    PositionEdge,
) {}
