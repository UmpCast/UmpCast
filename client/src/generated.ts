import gql from 'graphql-tag'
import * as Urql from 'urql'
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
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
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

export type Division = {
    __typename?: 'Division'
    dateCreated?: Maybe<Scalars['DateTime']>
    id: Scalars['ID']
    name?: Maybe<Scalars['String']>
    positionList?: Maybe<Array<Maybe<Position>>>
    season?: Maybe<Season>
}

export type DivisionInput = {
    name?: InputMaybe<Scalars['String']>
    seasonId?: InputMaybe<Scalars['ID']>
}

export type DivisionPayload = {
    __typename?: 'DivisionPayload'
    division?: Maybe<Division>
    errors?: Maybe<Array<Maybe<InputError>>>
}

export type InputError = {
    __typename?: 'InputError'
    key: Scalars['String']
    message: Scalars['String']
}

export type Mutation = {
    __typename?: 'Mutation'
    createDivision?: Maybe<DivisionPayload>
    createPosition?: Maybe<PositionPayload>
    deleteDivision?: Maybe<DivisionPayload>
    deletePosition?: Maybe<PositionPayload>
    register: UserPayload
    sendOrganizationInvite?: Maybe<SendOrganizationInvitePayload>
    sendSignInLink: SendSignInLinkPayload
    updateUser: UserPayload
}

export type MutationCreateDivisionArgs = {
    input: DivisionInput
}

export type MutationCreatePositionArgs = {
    input: PositionInput
}

export type MutationDeleteDivisionArgs = {
    id: Scalars['ID']
}

export type MutationDeletePositionArgs = {
    id: Scalars['ID']
}

export type MutationRegisterArgs = {
    input: UserInput
}

export type MutationSendOrganizationInviteArgs = {
    actionCodeSettings: ActionCodeSettingsInput
    input: SendOrganizationInviteInput
}

export type MutationSendSignInLinkArgs = {
    actionCodeSettings: ActionCodeSettingsInput
    email: Scalars['String']
}

export type MutationUpdateUserArgs = {
    id: Scalars['ID']
    input: UserInput
}

export type Organization = {
    __typename?: 'Organization'
    email: Scalars['String']
    memberList: Array<User>
    members?: Maybe<Array<UserOrganizationPermit>>
    ownerList: Array<User>
    seasonList: Array<Season>
    title: Scalars['String']
    websiteUrl: Scalars['String']
}

export type Position = {
    __typename?: 'Position'
    dateCreated?: Maybe<Scalars['DateTime']>
    division?: Maybe<Division>
    id: Scalars['ID']
    name?: Maybe<Scalars['String']>
}

export type PositionInput = {
    divisionId?: InputMaybe<Scalars['ID']>
    name?: InputMaybe<Scalars['String']>
}

export type PositionPayload = {
    __typename?: 'PositionPayload'
    errors?: Maybe<Array<Maybe<InputError>>>
    position?: Maybe<Position>
}

export type Query = {
    __typename?: 'Query'
    isRegistered?: Maybe<Scalars['Boolean']>
    me?: Maybe<User>
    season?: Maybe<Season>
}

export type QuerySeasonArgs = {
    id: Scalars['ID']
}

export enum Role {
    Manager = 'MANAGER',
    Referee = 'REFEREE'
}

export type Season = {
    __typename?: 'Season'
    dateCreated?: Maybe<Scalars['DateTime']>
    divisionList?: Maybe<Array<Maybe<Division>>>
    endDate?: Maybe<Scalars['DateTime']>
    id: Scalars['ID']
    name: Scalars['String']
    organization?: Maybe<Organization>
    startDate?: Maybe<Scalars['DateTime']>
}

export type SendOrganizationInviteInput = {
    emailList?: InputMaybe<Array<Scalars['String']>>
    organizationId: Scalars['ID']
}

export type SendOrganizationInvitePayload = {
    __typename?: 'SendOrganizationInvitePayload'
    errors?: Maybe<Array<InputError>>
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
    organizationPermitList?: Maybe<Array<UserOrganizationPermit>>
    phoneNumber: Scalars['String']
    state: Scalars['String']
    streetAddress: Scalars['String']
    zipCode: Scalars['Int']
}

export type UserInput = {
    city: Scalars['String']
    firstName: Scalars['String']
    lastName: Scalars['String']
    phoneNumber: Scalars['Int']
    state: Scalars['String']
    streetAddress: Scalars['String']
    zipCode: Scalars['Int']
}

export enum UserOrganizationPermission {
    Member = 'MEMBER',
    Owner = 'OWNER'
}

export type UserOrganizationPermit = {
    __typename?: 'UserOrganizationPermit'
    organization: Organization
    permissionList: Array<UserOrganizationPermission>
    user: User
}

export type UserPayload = {
    __typename?: 'UserPayload'
    errors: Array<InputError>
    user?: Maybe<User>
}

export type CreateDivisionMutationVariables = Exact<{
    input: DivisionInput
}>

export type CreateDivisionMutation = {
    __typename?: 'Mutation'
    createDivision?:
        | {
              __typename?: 'DivisionPayload'
              division?:
                  | {
                        __typename?: 'Division'
                        id: string
                        name?: string | null | undefined
                        season?:
                            | { __typename?: 'Season'; id: string }
                            | null
                            | undefined
                    }
                  | null
                  | undefined
              errors?:
                  | Array<
                        | {
                              __typename?: 'InputError'
                              key: string
                              message: string
                          }
                        | null
                        | undefined
                    >
                  | null
                  | undefined
          }
        | null
        | undefined
}

export type CreatePositionMutationVariables = Exact<{
    input: PositionInput
}>

export type CreatePositionMutation = {
    __typename?: 'Mutation'
    createPosition?:
        | {
              __typename?: 'PositionPayload'
              position?:
                  | {
                        __typename?: 'Position'
                        id: string
                        name?: string | null | undefined
                        division?:
                            | { __typename?: 'Division'; id: string }
                            | null
                            | undefined
                    }
                  | null
                  | undefined
              errors?:
                  | Array<
                        | {
                              __typename?: 'InputError'
                              key: string
                              message: string
                          }
                        | null
                        | undefined
                    >
                  | null
                  | undefined
          }
        | null
        | undefined
}

export type DeleteDivisionMutationVariables = Exact<{
    id: Scalars['ID']
}>

export type DeleteDivisionMutation = {
    __typename?: 'Mutation'
    deleteDivision?:
        | {
              __typename?: 'DivisionPayload'
              division?:
                  | { __typename?: 'Division'; id: string }
                  | null
                  | undefined
              errors?:
                  | Array<
                        | {
                              __typename?: 'InputError'
                              key: string
                              message: string
                          }
                        | null
                        | undefined
                    >
                  | null
                  | undefined
          }
        | null
        | undefined
}

export type DeletePositionMutationVariables = Exact<{
    id: Scalars['ID']
}>

export type DeletePositionMutation = {
    __typename?: 'Mutation'
    deletePosition?:
        | {
              __typename?: 'PositionPayload'
              position?:
                  | { __typename?: 'Position'; id: string }
                  | null
                  | undefined
              errors?:
                  | Array<
                        | {
                              __typename?: 'InputError'
                              key: string
                              message: string
                          }
                        | null
                        | undefined
                    >
                  | null
                  | undefined
          }
        | null
        | undefined
}

export type RegisterUserMutationVariables = Exact<{
    input: UserInput
}>

export type RegisterUserMutation = {
    __typename?: 'Mutation'
    register: {
        __typename?: 'UserPayload'
        errors: Array<{
            __typename?: 'InputError'
            key: string
            message: string
        }>
    }
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

export type GetSeasonStructureQueryVariables = Exact<{
    id: Scalars['ID']
}>

export type GetSeasonStructureQuery = {
    __typename?: 'Query'
    season?:
        | {
              __typename?: 'Season'
              id: string
              divisionList?:
                  | Array<
                        | {
                              __typename?: 'Division'
                              id: string
                              name?: string | null | undefined
                              positionList?:
                                  | Array<
                                        | {
                                              __typename?: 'Position'
                                              id: string
                                              name?: string | null | undefined
                                          }
                                        | null
                                        | undefined
                                    >
                                  | null
                                  | undefined
                          }
                        | null
                        | undefined
                    >
                  | null
                  | undefined
          }
        | null
        | undefined
}

export type IsRegisteredQueryVariables = Exact<{ [key: string]: never }>

export type IsRegisteredQuery = {
    __typename?: 'Query'
    isRegistered?: boolean | null | undefined
}

export const CreateDivisionDocument = gql`
    mutation CreateDivision($input: DivisionInput!) {
        createDivision(input: $input) {
            division {
                id
                name
                season {
                    id
                }
            }
            errors {
                key
                message
            }
        }
    }
`

export function useCreateDivisionMutation() {
    return Urql.useMutation<
        CreateDivisionMutation,
        CreateDivisionMutationVariables
    >(CreateDivisionDocument)
}
export const CreatePositionDocument = gql`
    mutation CreatePosition($input: PositionInput!) {
        createPosition(input: $input) {
            position {
                id
                name
                division {
                    id
                }
            }
            errors {
                key
                message
            }
        }
    }
`

export function useCreatePositionMutation() {
    return Urql.useMutation<
        CreatePositionMutation,
        CreatePositionMutationVariables
    >(CreatePositionDocument)
}
export const DeleteDivisionDocument = gql`
    mutation DeleteDivision($id: ID!) {
        deleteDivision(id: $id) {
            division {
                id
            }
            errors {
                key
                message
            }
        }
    }
`

export function useDeleteDivisionMutation() {
    return Urql.useMutation<
        DeleteDivisionMutation,
        DeleteDivisionMutationVariables
    >(DeleteDivisionDocument)
}
export const DeletePositionDocument = gql`
    mutation DeletePosition($id: ID!) {
        deletePosition(id: $id) {
            position {
                id
            }
            errors {
                key
                message
            }
        }
    }
`

export function useDeletePositionMutation() {
    return Urql.useMutation<
        DeletePositionMutation,
        DeletePositionMutationVariables
    >(DeletePositionDocument)
}
export const RegisterUserDocument = gql`
    mutation RegisterUser($input: UserInput!) {
        register(input: $input) {
            errors {
                key
                message
            }
        }
    }
`

export function useRegisterUserMutation() {
    return Urql.useMutation<
        RegisterUserMutation,
        RegisterUserMutationVariables
    >(RegisterUserDocument)
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

export function useSendSignInLinkMutation() {
    return Urql.useMutation<
        SendSignInLinkMutation,
        SendSignInLinkMutationVariables
    >(SendSignInLinkDocument)
}
export const GetSeasonStructureDocument = gql`
    query GetSeasonStructure($id: ID!) {
        season(id: $id) {
            id
            divisionList {
                id
                name
                positionList {
                    id
                    name
                }
            }
        }
    }
`

export function useGetSeasonStructureQuery(
    options: Omit<
        Urql.UseQueryArgs<GetSeasonStructureQueryVariables>,
        'query'
    > = {}
) {
    return Urql.useQuery<GetSeasonStructureQuery>({
        query: GetSeasonStructureDocument,
        ...options
    })
}
export const IsRegisteredDocument = gql`
    query IsRegistered {
        isRegistered
    }
`

export function useIsRegisteredQuery(
    options: Omit<Urql.UseQueryArgs<IsRegisteredQueryVariables>, 'query'> = {}
) {
    return Urql.useQuery<IsRegisteredQuery>({
        query: IsRegisteredDocument,
        ...options
    })
}
