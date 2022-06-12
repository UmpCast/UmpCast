import { Field, ObjectType } from "type-graphql";
import { Payload } from "../interfaces/Payload";
import { Game } from "../types/Game";
import { InputError } from "./InputError";

@ObjectType()
export class CreateGamePayload implements Payload {
    @Field(() => Game, { nullable: true })
    game!: Game | null;

    @Field(() => [InputError])
    errors!: InputError[];
}
