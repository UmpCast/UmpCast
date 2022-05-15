import { Field, ObjectType } from "type-graphql";
import { InputError as IInputError } from "../interfaces/InputError";

@ObjectType()
export class InputError implements IInputError {
    @Field()
    key!: string;

    @Field()
    message!: string;
}
