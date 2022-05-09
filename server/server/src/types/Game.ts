import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Game {
    @Field(() => ID)
    id!: number;

    divisionId!: number;

    @Field()
    name!: string;

    @Field(() => String, { nullable: true })
    location?: string | null;

    @Field()
    startTime!: Date;

    @Field(() => Date, { nullable: true })
    endTime?: Date | null;

    @Field()
    createdAt!: Date;

    @Field()
    updatedAt!: Date;
}
