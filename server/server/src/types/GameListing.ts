import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class GameListing {
    @Field(() => ID)
    id!: number;

    userId!: string | null;

    positionId!: number | null;

    gameId!: number;

    @Field()
    name!: string;

    @Field()
    createdAt!: Date;

    @Field()
    updatedAt!: Date;
}
