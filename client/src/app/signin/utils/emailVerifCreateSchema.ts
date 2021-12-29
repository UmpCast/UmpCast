import * as yup from 'yup'

export type EmailVerifCreateInput = {
    email: string
}

const emailVerifCreateSchema = yup.object().shape({
    email: yup.string().email().required()
})

export default emailVerifCreateSchema
