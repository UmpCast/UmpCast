import { ObjectType, Field, ID } from "type-graphql";
import { ConnectionType } from "../utils/ConnectionType";
import { EdgeType } from "../utils/EdgeType";

@ObjectType()
export class Division {
    @Field(() => ID)
    id!: string;

    seasonId!: string;

    @Field()
    name!: string;

    @Field()
    createdAt!: Date;

    @Field()
    updatedAt!: Date;
}

@ObjectType()
export class DivisionEdge extends EdgeType("division", Division) {}

@ObjectType()
export class DivisionConnection extends ConnectionType(
    "division",
    DivisionEdge,
) {}
