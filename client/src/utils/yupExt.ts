import * as yup from 'yup'

export const stringNullified = yup
    .string()
    .nullable()
    .transform((s) => (s === '' ? null : s))
