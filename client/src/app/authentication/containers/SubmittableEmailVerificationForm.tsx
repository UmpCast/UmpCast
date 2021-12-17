import React from 'react'
import EmailVerificationForm from '../components/EmailVerificationForm'
import useSendEmailVerification from '../graphql/mutations/sendEmailVerification'

export default function SubmittableEmailVerificationForm() {
    const [sendEmailVerification] = useSendEmailVerification()

    return (
        <EmailVerificationForm
            onSubmit={({ email }) =>
                sendEmailVerification({
                    variables: {
                        input: {
                            email,
                            route: '/verify'
                        }
                    }
                })
            }
        />
    )
}
