import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class User {
    @Field()
    id!: string;

    @Field()
    email!: string;

    @Field()
    firstName!: string;

    @Field()
    lastName!: string;

    @Field({ nullable: true })
    streetAddress?: string | null;

    @Field({ nullable: true })
    city?: string | null;

    @Field({ nullable: true })
    state?: string | null;

    @Field({ nullable: true })
    zipCode?: string | null;

    @Field({ nullable: true })
    phoneNumber?: string | null;

    @Field()
    createdAt!: Date;

    @Field()
    updatedAt!: Date;
}
