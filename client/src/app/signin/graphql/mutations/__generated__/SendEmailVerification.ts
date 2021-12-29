/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SendEmailVerificationInput } from '../../../../__generated__/globalTypes'

// ====================================================
// GraphQL mutation operation: SendEmailVerification
// ====================================================

export interface SendEmailVerification_sendEmailVerification_errors {
    key: string
    message: string
}

export interface SendEmailVerification_sendEmailVerification {
    errors: SendEmailVerification_sendEmailVerification_errors[] | null
}

export interface SendEmailVerification {
    sendEmailVerification: SendEmailVerification_sendEmailVerification
}

export interface SendEmailVerificationVariables {
    input: SendEmailVerificationInput
    route: string
}
