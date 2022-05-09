import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Season {
    @Field(() => ID)
    id!: number;

    @Field()
    name!: string;

    @Field()
    endDate!: Date;

    @Field()
    createdAt!: Date;

    @Field()
    updatedAt!: Date;
}
