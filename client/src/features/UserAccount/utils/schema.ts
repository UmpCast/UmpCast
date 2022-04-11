import { stringNullified } from '@/utils/yupExt'
import * as yup from 'yup'

export const userAccountSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phoneNumber: stringNullified.matches(/[0-9]{10}/, {
        message: 'Invalid phone number'
    }),
    state: stringNullified,
    city: stringNullified,
    streetAddress: stringNullified,
    zipCode: stringNullified.length(5, 'Zip code must be 5 digits')
})
