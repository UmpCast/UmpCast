import { StringSchema } from 'yup'

declare module 'yup' {
    interface StringSchema {
        isDate(pattern: string, message?: string): StringSchema
    }
}
