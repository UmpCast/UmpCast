import {
    IsDefined,
    IsEmail,
    IsOptional,
    IsUrl,
    NotEquals,
    ValidateIf,
} from "class-validator";
import { Field, ID, InputType } from "type-graphql";

@InputType()
export class UpdateOrganizationInput {
    @Field(() => ID)
    @IsDefined()
    organizationId!: string;

    @Field(() => String, { nullable: true })
    @NotEquals(null)
    @ValidateIf((_, value) => value !== undefined)
    name?: string;

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
