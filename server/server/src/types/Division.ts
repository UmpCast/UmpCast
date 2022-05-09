import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Division {
    @Field(() => ID)
    id!: number;

    @Field()
    name!: string;

    @Field()
    createdAt!: Date;

    @Field()
    updatedAt!: Date;
}
