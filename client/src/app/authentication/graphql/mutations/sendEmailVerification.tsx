import { gql, useMutation } from '@apollo/client'
import {
    SendEmailVerification,
    SendEmailVerificationVariables
} from './__generated__/SendEmailVerification'

export const SEND_EMAIL_VERIFICATION = gql`
    mutation SendEmailVerification($input: SendEmailVerificationInput!) {
        sendEmailVerification(input: $input)
    }
`

export default function useSendEmailVerification() {
    return useMutation<SendEmailVerification, SendEmailVerificationVariables>(
        SEND_EMAIL_VERIFICATION
    )
}
