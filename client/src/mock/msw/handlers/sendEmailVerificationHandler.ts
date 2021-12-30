import { graphql } from 'msw'
import {
    SendEmailVerificationMutation,
    SendEmailVerificationMutationVariables
} from '@/app/generated-types'
import mswDB from '../mswDB'

const sendEmailVerificationHandler = graphql.mutation<
    SendEmailVerificationMutation,
    SendEmailVerificationMutationVariables
>('SendEmailVerification', (req, res, ctx) => {
    const { email, actionCodeSettings } = req.variables

    mswDB.emailVerification.create({
        email,
        route: ''
    })

    return res(
        ctx.data({
            sendEmailVerification: {
                errors: null
            }
        })
    )
})

export default sendEmailVerificationHandler
