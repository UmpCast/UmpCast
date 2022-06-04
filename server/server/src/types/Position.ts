import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Position {
    @Field(() => ID)
    id!: string;

    divisionId!: string;

    @Field()
    name!: string;

    @Field()
    createdAt!: Date;

    @Field()
    updatedAt!: Date;
}
