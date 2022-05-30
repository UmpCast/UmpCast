import { ConnectionArguments, ConnectionCursor } from "graphql-relay";
import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export class ConnectionArgs implements ConnectionArguments {
    @Field(() => String, { nullable: true })
    before?: ConnectionCursor | null;

    @Field(() => String, { nullable: true })
    after?: ConnectionCursor | null;

    @Field(() => Int, { nullable: true })
    first?: number | null;

    @Field(() => Int, { nullable: true })
    last?: number | null;
}
