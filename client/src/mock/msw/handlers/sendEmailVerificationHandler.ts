import { graphql } from 'msw'
import {
    SendEmailVerification,
    SendEmailVerificationVariables
} from '@/app/signin/graphql/mutations/__generated__/SendEmailVerification'
import mswDB from '../mswDB'

const sendEmailVerificationHandler = graphql.mutation<
    SendEmailVerification,
    SendEmailVerificationVariables
>('SendEmailVerification', (req, res, ctx) => {
    const { input, route } = req.variables

    mswDB.emailVerification.create({
        email: input.email,
        route
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
