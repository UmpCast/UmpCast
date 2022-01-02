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
    sendSignInLink: SendSignInLinkPayload
    updateUser: UserPayload
}

export type MutationCreateUserArgs = {
    input: UserInput
}

export type MutationRegisterArgs = {
    input: UserInput
}

export type MutationSendSignInLinkArgs = {
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

export type GetMyInfoQueryVariables = Exact<{ [key: string]: never }>

export type GetMyInfoQuery = {
    __typename?: 'Query'
    me?:
        | {
              __typename?: 'User'
              id: string
              firstName: string
              lastName: string
              fullAddress: string
              streetAddress: string
              city: string
              state: string
              zipCode: number
              phoneNumber: string
          }
        | null
        | undefined
}

export type SendSignInLinkMutationVariables = Exact<{
    email: Scalars['String']
    actionCodeSettings: ActionCodeSettingsInput
}>

export type SendSignInLinkMutation = {
    __typename?: 'Mutation'
    sendSignInLink: {
        __typename?: 'SendSignInLinkPayload'
        errors?:
            | Array<{ __typename?: 'InputError'; key: string; message: string }>
            | null
            | undefined
    }
}

export const GetMyInfoDocument = gql`
    query GetMyInfo {
        me {
            id
            firstName
            lastName
            fullAddress
            streetAddress
            city
            state
            zipCode
            phoneNumber
        }
    }
`

/**
 * __useGetMyInfoQuery__
 *
 * To run a query within a React component, call `useGetMyInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyInfoQuery(
    baseOptions?: Apollo.QueryHookOptions<
        GetMyInfoQuery,
        GetMyInfoQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<GetMyInfoQuery, GetMyInfoQueryVariables>(
        GetMyInfoDocument,
        options
    )
}
export function useGetMyInfoLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        GetMyInfoQuery,
        GetMyInfoQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<GetMyInfoQuery, GetMyInfoQueryVariables>(
        GetMyInfoDocument,
        options
    )
}
export type GetMyInfoQueryHookResult = ReturnType<typeof useGetMyInfoQuery>
export type GetMyInfoLazyQueryHookResult = ReturnType<
    typeof useGetMyInfoLazyQuery
>
export type GetMyInfoQueryResult = Apollo.QueryResult<
    GetMyInfoQuery,
    GetMyInfoQueryVariables
>
export const SendSignInLinkDocument = gql`
    mutation SendSignInLink(
        $email: String!
        $actionCodeSettings: ActionCodeSettingsInput!
    ) {
        sendSignInLink(email: $email, actionCodeSettings: $actionCodeSettings) {
            errors {
                key
                message
            }
        }
    }
`
export type SendSignInLinkMutationFn = Apollo.MutationFunction<
    SendSignInLinkMutation,
    SendSignInLinkMutationVariables
>

/**
 * __useSendSignInLinkMutation__
 *
 * To run a mutation, you first call `useSendSignInLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendSignInLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendSignInLinkMutation, { data, loading, error }] = useSendSignInLinkMutation({
 *   variables: {
 *      email: // value for 'email'
 *      actionCodeSettings: // value for 'actionCodeSettings'
 *   },
 * });
 */
export function useSendSignInLinkMutation(
    baseOptions?: Apollo.MutationHookOptions<
        SendSignInLinkMutation,
        SendSignInLinkMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<
        SendSignInLinkMutation,
        SendSignInLinkMutationVariables
    >(SendSignInLinkDocument, options)
}
export type SendSignInLinkMutationHookResult = ReturnType<
    typeof useSendSignInLinkMutation
>
export type SendSignInLinkMutationResult =
    Apollo.MutationResult<SendSignInLinkMutation>
export type SendSignInLinkMutationOptions = Apollo.BaseMutationOptions<
    SendSignInLinkMutation,
    SendSignInLinkMutationVariables
>
