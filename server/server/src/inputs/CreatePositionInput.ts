import { IsDefined } from "class-validator";
import { Field, ID, InputType } from "type-graphql";

@InputType()
export class CreatePositionInput {
    @Field(() => ID)
    @IsDefined()
    divisionId!: string;

    @Field()
    @IsDefined()
    name!: string;
}
