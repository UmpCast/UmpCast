import { IsDefined, IsEmail, IsOptional, IsUrl } from "class-validator";
import { Field, ID, InputType } from "type-graphql";

@InputType()
export class UpdateOrganizationInput {
    @Field(() => ID)
    @IsDefined()
    organizationId!: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    name!: string | undefined;

    @Field(() => String, { nullable: true })
    @IsEmail()
    @IsOptional()
    email!: string | null;

    @Field(() => String, { nullable: true })
    @IsUrl()
    @IsOptional()
    websiteUrl!: string | null;

    @Field(() => String, { nullable: true })
    @IsOptional()
    description!: string | null;
}
