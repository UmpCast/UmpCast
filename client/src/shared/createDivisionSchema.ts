import * as yup from 'yup'

export const createDivisionSchema = yup.object({
    name: yup.string().required()
})
