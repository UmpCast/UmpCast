import { ObjectType, Field, ID } from "type-graphql";

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
