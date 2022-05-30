import { validate } from "class-validator";
import { ClassType, createMethodDecorator } from "type-graphql";
import { InputError } from "../interfaces/InputError";
import { Payload } from "../interfaces/Payload";

export function ValidateInput<T extends object>(
    Type: ClassType<T>,
    field: string,
) {
    return createMethodDecorator(async ({ args }, next): Promise<Payload> => {
        const instance = Object.assign(new Type(), args[field]);
        const validationErrors = await validate(instance);
        if (validationErrors.length > 0) {
            return {
                errors: validationErrors.flatMap((error) => {
                    return Object.entries(error.constraints!).map(
                        ([_, value]): InputError => {
                            return {
                                key: error.property,
                                message: value,
                            };
                        },
                    );
                }),
            };
        }
        return next();
    });
}
