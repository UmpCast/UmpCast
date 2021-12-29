import { gql, useMutation } from '@apollo/client'
import {
    SendEmailVerification,
    SendEmailVerificationVariables
} from './__generated__/SendEmailVerification'

export const SEND_EMAIL_VERIFICATION = gql`
    mutation SendEmailVerification(
        $email: String!
        $actionCodeSettings: ActionCodeSettingsInput!
    ) {
        sendEmailVerification(
            email: $email
            actionCodeSettings: $actionCodeSettings
        ) {
            errors {
                key
                message
            }
        }
    }
`

export default function useSendEmailVerification() {
    return useMutation<SendEmailVerification, SendEmailVerificationVariables>(
        SEND_EMAIL_VERIFICATION
    )
}
