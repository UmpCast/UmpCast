import { StringSchema as YupStringSchema } from 'yup'

declare module 'yup' {
    interface StringSchema extends YupStringSchema {
        isDate(pattern: string, message?: string): StringSchema
    }
}
