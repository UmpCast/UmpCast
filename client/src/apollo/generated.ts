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

export enum AuthState {
    Authenticated = 'AUTHENTICATED',
    Unauthenticated = 'UNAUTHENTICATED',
    Unregistered = 'UNREGISTERED'
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
    authState?: Maybe<AuthState>
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

export type GetAuthStateQueryVariables = Exact<{ [key: string]: never }>

export type GetAuthStateQuery = {
    __typename?: 'Query'
    authState?: AuthState | null | undefined
}

export type GetMyIdQueryVariables = Exact<{ [key: string]: never }>

export type GetMyIdQuery = {
    __typename?: 'Query'
    me?: { __typename?: 'User'; id: string } | null | undefined
}

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
export const GetAuthStateDocument = gql`
    query GetAuthState {
        authState @client
    }
`

/**
 * __useGetAuthStateQuery__
 *
 * To run a query within a React component, call `useGetAuthStateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthStateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthStateQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAuthStateQuery(
    baseOptions?: Apollo.QueryHookOptions<
        GetAuthStateQuery,
        GetAuthStateQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<GetAuthStateQuery, GetAuthStateQueryVariables>(
        GetAuthStateDocument,
        options
    )
}
export function useGetAuthStateLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        GetAuthStateQuery,
        GetAuthStateQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<GetAuthStateQuery, GetAuthStateQueryVariables>(
        GetAuthStateDocument,
        options
    )
}
export type GetAuthStateQueryHookResult = ReturnType<
    typeof useGetAuthStateQuery
>
export type GetAuthStateLazyQueryHookResult = ReturnType<
    typeof useGetAuthStateLazyQuery
>
export type GetAuthStateQueryResult = Apollo.QueryResult<
    GetAuthStateQuery,
    GetAuthStateQueryVariables
>
export const GetMyIdDocument = gql`
    query GetMyId {
        me {
            id
        }
    }
`

/**
 * __useGetMyIdQuery__
 *
 * To run a query within a React component, call `useGetMyIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyIdQuery(
    baseOptions?: Apollo.QueryHookOptions<GetMyIdQuery, GetMyIdQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<GetMyIdQuery, GetMyIdQueryVariables>(
        GetMyIdDocument,
        options
    )
}
export function useGetMyIdLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        GetMyIdQuery,
        GetMyIdQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<GetMyIdQuery, GetMyIdQueryVariables>(
        GetMyIdDocument,
        options
    )
}
export type GetMyIdQueryHookResult = ReturnType<typeof useGetMyIdQuery>
export type GetMyIdLazyQueryHookResult = ReturnType<typeof useGetMyIdLazyQuery>
export type GetMyIdQueryResult = Apollo.QueryResult<
    GetMyIdQuery,
    GetMyIdQueryVariables
>
