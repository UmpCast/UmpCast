import { IsEmail, IsUrl } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateOrganizationInput {
    @Field()
    name!: string;

    @Field(() => String, { nullable: true })
    @IsEmail()
    email!: string | null;

    @Field(() => String, { nullable: true })
    @IsUrl()
    websiteUrl!: string | null;

    @Field(() => String, { nullable: true })
    description!: string | null;
}
