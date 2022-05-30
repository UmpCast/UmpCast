import { PageInfo as RelayPageInfo, ConnectionCursor } from "graphql-relay";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PageInfo implements RelayPageInfo {
    @Field(() => Boolean)
    hasNextPage!: boolean;

    @Field(() => Boolean)
    hasPreviousPage!: boolean;

    @Field(() => String, { nullable: true })
    startCursor!: ConnectionCursor | null;

    @Field(() => String, { nullable: true })
    endCursor!: ConnectionCursor | null;
}
