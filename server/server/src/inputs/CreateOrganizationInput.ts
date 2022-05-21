import { IsEmail, IsOptional, IsUrl } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateOrganizationInput {
    @Field()
    name!: string;

    @Field(() => String, { nullable: true })
    @IsEmail()
    @IsOptional()
    email?: string | null;

    @Field(() => String, { nullable: true })
    @IsUrl()
    @IsOptional()
    websiteUrl?: string | null;

    @Field(() => String, { nullable: true })
    @IsOptional()
    description?: string | null;
}
