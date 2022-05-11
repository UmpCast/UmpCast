import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class User {
    @Field(() => ID)
    id!: string;

    @Field()
    email!: string;

    @Field()
    firstName!: string;

    @Field()
    lastName!: string;

    @Field(() => String, { nullable: true })
    streetAddress!: string | null;

    @Field(() => String, { nullable: true })
    city!: string | null;

    @Field(() => String, { nullable: true })
    state!: string | null;

    @Field(() => String, { nullable: true })
    zipCode!: string | null;

    @Field(() => String, { nullable: true })
    phoneNumber!: string | null;

    @Field()
    createdAt!: Date;

    @Field()
    updatedAt!: Date;
}
