import * as yup from 'yup'

export type EmailSignInInput = {
    email: string
}

const emailSignInSchema = yup.object().shape({
    email: yup.string().email().required()
})

export default emailSignInSchema
