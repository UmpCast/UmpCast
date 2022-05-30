import { IsDefined } from "class-validator";
import { Field, ID, InputType } from "type-graphql";

@InputType()
export class CreateDivisionInput {
    @Field(() => ID)
    @IsDefined()
    seasonId!: string;

    @Field()
    @IsDefined()
    name!: string;
}
