import { graphql } from 'msw'

const sendEmailVerificationHandler = graphql.mutation(
    'SendEmailVerification',
    (_, res, ctx) =>
        res(
            ctx.data({
                sendEmailVerification: null
            })
        )
)

export default sendEmailVerificationHandler
