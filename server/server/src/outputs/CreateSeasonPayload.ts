import { Field, ObjectType } from "type-graphql";
import { Payload } from "../interfaces/Payload";
import { Season } from "../types/Season";
import { InputError } from "./InputError";

@ObjectType()
export class CreateSeasonPayload implements Payload {
    @Field(() => Season, { nullable: true })
    season!: Season | null;

    @Field(() => [InputError])
    errors!: InputError[];
}
