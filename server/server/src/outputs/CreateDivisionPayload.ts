import { Field, ObjectType } from "type-graphql";
import { Payload } from "../interfaces/Payload";
import { Division } from "../types/Division";
import { InputError } from "./InputError";

@ObjectType()
export class CreateDivisionPayload implements Payload {
    @Field(() => Division, { nullable: true })
    division!: Division | null;

    @Field(() => [InputError])
    errors!: InputError[];
}
