import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
    DateTime: any
}

export type ActionCodeSettingsInput = {
    androidMinimumVersion: Scalars['String']
    androidPackageName: Scalars['String']
    dynamicLinkDomain: Scalars['String']
    iosBundleId: Scalars['String']
    url: Scalars['String']
}

export type InputError = {
    __typename?: 'InputError'
    key: Scalars['String']
    message: Scalars['String']
}

export type Mutation = {
    __typename?: 'Mutation'
    _empty: Scalars['String']
    createUser: UserPayload
    register: UserPayload
    sendEmailVerification: SendSignInLinkPayload
    updateUser: UserPayload
}

export type MutationCreateUserArgs = {
    input: UserInput
}

export type MutationRegisterArgs = {
    input: UserInput
}

export type MutationSendEmailVerificationArgs = {
    actionCodeSettings: ActionCodeSettingsInput
    email: Scalars['String']
}

export type MutationUpdateUserArgs = {
    id: Scalars['ID']
    input: UserInput
}

export type Query = {
    __typename?: 'Query'
    _empty: Scalars['String']
    me?: Maybe<User>
}

export enum Role {
    Manager = 'MANAGER',
    Referee = 'REFEREE'
}

export type SendSignInLinkPayload = {
    __typename?: 'SendSignInLinkPayload'
    errors?: Maybe<Array<InputError>>
}

export type User = {
    __typename?: 'User'
    city: Scalars['String']
    dateCreated: Scalars['DateTime']
    email: Scalars['String']
    firstName: Scalars['String']
    fullAddress: Scalars['String']
    id: Scalars['ID']
    lastName: Scalars['String']
    phoneNumber: Scalars['String']
    state: Scalars['String']
    streetAddress: Scalars['String']
    zipCode: Scalars['Int']
}

export type UserInput = {
    city: Scalars['String']
    firstName: Scalars['String']
    lastName: Scalars['String']
    phoneNumber: Scalars['String']
    state: Scalars['String']
    streetAddress: Scalars['String']
    zipCode: Scalars['Int']
}

export type UserPayload = {
    __typename?: 'UserPayload'
    errors: Array<InputError>
    user?: Maybe<User>
}

export type SendEmailVerificationMutationVariables = Exact<{
    email: Scalars['String']
    actionCodeSettings: ActionCodeSettingsInput
}>

export type SendEmailVerificationMutation = {
    __typename?: 'Mutation'
    sendEmailVerification: {
        __typename?: 'SendSignInLinkPayload'
        errors?:
            | Array<{ __typename?: 'InputError'; key: string; message: string }>
            | null
            | undefined
    }
}

export const SendEmailVerificationDocument = gql`
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
export type SendEmailVerificationMutationFn = Apollo.MutationFunction<
    SendEmailVerificationMutation,
    SendEmailVerificationMutationVariables
>

/**
 * __useSendEmailVerificationMutation__
 *
 * To run a mutation, you first call `useSendEmailVerificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendEmailVerificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendEmailVerificationMutation, { data, loading, error }] = useSendEmailVerificationMutation({
 *   variables: {
 *      email: // value for 'email'
 *      actionCodeSettings: // value for 'actionCodeSettings'
 *   },
 * });
 */
export function useSendEmailVerificationMutation(
    baseOptions?: Apollo.MutationHookOptions<
        SendEmailVerificationMutation,
        SendEmailVerificationMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<
        SendEmailVerificationMutation,
        SendEmailVerificationMutationVariables
    >(SendEmailVerificationDocument, options)
}
export type SendEmailVerificationMutationHookResult = ReturnType<
    typeof useSendEmailVerificationMutation
>
export type SendEmailVerificationMutationResult =
    Apollo.MutationResult<SendEmailVerificationMutation>
export type SendEmailVerificationMutationOptions = Apollo.BaseMutationOptions<
    SendEmailVerificationMutation,
    SendEmailVerificationMutationVariables
>
