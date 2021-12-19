import { graphql } from 'msw'
import {
    SendEmailVerification,
    SendEmailVerificationVariables
} from '@/app/authentication/graphql/mutations/__generated__/SendEmailVerification'
import mswDB from '../mswDB'

const sendEmailVerificationHandler = graphql.mutation<
    SendEmailVerification,
    SendEmailVerificationVariables
>('SendEmailVerification', (req, res, ctx) => {
    const { email, route } = req.variables.input

    mswDB.emailVerification.create({
        email,
        route
    })

    return res(
        ctx.data({
            sendEmailVerification: null
        })
    )
})

export default sendEmailVerificationHandler
