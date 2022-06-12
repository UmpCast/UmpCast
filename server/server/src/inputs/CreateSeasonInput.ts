import { IsDate, IsDefined } from "class-validator";
import { Field, ID, InputType } from "type-graphql";

@InputType()
export class CreateSeasonInput {
    @Field(() => ID)
    @IsDefined()
    organizationId!: string;

    @Field()
    @IsDefined()
    name!: string;

    @Field()
    @IsDate()
    endDate!: Date;
}
