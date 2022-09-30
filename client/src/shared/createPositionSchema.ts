import * as yup from 'yup'

export const createPositionSchema = yup.object({
    name: yup.string().required()
})
