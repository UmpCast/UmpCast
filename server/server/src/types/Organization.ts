import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Organization {
    @Field(() => ID)
    id!: string;

    @Field()
    name!: string;

    @Field(() => String, { nullable: true })
    email!: string | null;

    @Field(() => String, { nullable: true })
    websiteUrl!: string | null;

    @Field(() => String, { nullable: true })
    description!: string | null;

    @Field()
    createdAt!: Date;

    @Field()
    updatedAt!: Date;
}
