import { ObjectType, Field, ID } from "type-graphql";
import { ConnectionType } from "../utils/ConnectionType";
import { EdgeType } from "../utils/EdgeType";

@ObjectType()
export class Season {
    @Field(() => ID)
    id!: string;

    organizationId!: string;

    @Field()
    name!: string;

    @Field()
    endDate!: Date;

    @Field()
    createdAt!: Date;

    @Field()
    updatedAt!: Date;
}

@ObjectType()
export class SeasonEdge extends EdgeType("season", Season) {}

@ObjectType()
export class SeasonConnection extends ConnectionType("season", SeasonEdge) {}
