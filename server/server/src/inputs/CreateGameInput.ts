import { IsDate, IsDefined, IsOptional } from "class-validator";
import { Field, ID, InputType } from "type-graphql";

@InputType()
export class CreateGameInput {
    @Field(() => ID)
    @IsDefined()
    divisionId!: string;

    @Field()
    @IsDefined()
    name!: string;

    @Field()
    @IsDate()
    startTime!: Date;

    @Field(() => Date, { nullable: true })
    @IsDate()
    @IsOptional()
    endDate?: Date | null;

    @Field(() => String, { nullable: true })
    @IsOptional()
    location?: string | null;
}
