import * as yup from 'yup'

import { SEASON_DATE_FORMAT } from '@/config/constants/dfns'

export const seasonSchema = yup.object({
    name: yup
        .string()
        .required()
        .matches(
            /^[A-Za-z0-9 ]*$/,
            'Only alphanumeric characters or space allowed'
        ),
    endDate: yup.string().required().isDate(SEASON_DATE_FORMAT)
})
