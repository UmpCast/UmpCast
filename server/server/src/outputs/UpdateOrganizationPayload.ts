import { Field, ObjectType } from "type-graphql";
import { Payload } from "../interfaces/Payload";
import { Organization } from "../types/Organization";
import { InputError } from "./InputError";

@ObjectType()
export class UpdateOrganizationPayload implements Payload {
    @Field(() => Organization, { nullable: true })
    organization!: Organization | null;

    @Field(() => [InputError])
    errors!: InputError[];
}
