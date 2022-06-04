import { Field, ID, ObjectType } from "type-graphql";

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
