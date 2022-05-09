import { ObjectType, Field, ID } from "type-graphql";

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
