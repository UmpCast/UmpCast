import { Field, ObjectType } from "type-graphql";
import { Payload } from "../interfaces/Payload";
import { Position } from "../types/Position";
import { InputError } from "./InputError";

@ObjectType()
export class CreatePositionPayload implements Payload {
    @Field(() => Position, { nullable: true })
    position!: Position | null;

    @Field(() => [InputError])
    errors!: InputError[];
}
