import gql from 'graphql-tag'
import * as Urql from 'urql'

export type Maybe<T> = T | null
export type InputMaybe<T> = T | null
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
    dateCreated: Maybe<Scalars['DateTime']>
    id: Scalars['ID']
    name: Maybe<Scalars['String']>
    positionList: Maybe<Array<Maybe<Position>>>
    season: Maybe<Season>
}

export type DivisionInput = {
    name: InputMaybe<Scalars['String']>
    seasonId: InputMaybe<Scalars['ID']>
}

export type DivisionPayload = {
    __typename?: 'DivisionPayload'
    division: Maybe<Division>
    errors: Maybe<Array<Maybe<InputError>>>
}

export type InputError = {
    __typename?: 'InputError'
    key: Scalars['String']
    message: Scalars['String']
}

export type Mutation = {
    __typename?: 'Mutation'
    createDivision: Maybe<DivisionPayload>
    createOrganization: OrganizationPayload
    createPosition: Maybe<PositionPayload>
    deleteDivision: Maybe<DivisionPayload>
    deleteOrganization: OrganizationPayload
    deletePosition: Maybe<PositionPayload>
    joinOrganization: OrganizationPayload
    leaveOrganization: OrganizationPayload
    register: UserPayload
    sendOrganizationInvite: Maybe<SendOrganizationInvitePayload>
    sendSignInLink: SendSignInLinkPayload
    updateOrganization: OrganizationPayload
    updateUser: UserPayload
}

export type MutationCreateDivisionArgs = {
    input: DivisionInput
}

export type MutationCreateOrganizationArgs = {
    input: OrganizationInput
}

export type MutationCreatePositionArgs = {
    input: PositionInput
}

export type MutationDeleteDivisionArgs = {
    id: Scalars['ID']
}

export type MutationDeleteOrganizationArgs = {
    id: Scalars['ID']
}

export type MutationDeletePositionArgs = {
    id: Scalars['ID']
}

export type MutationJoinOrganizationArgs = {
    id: Scalars['ID']
}

export type MutationLeaveOrganizationArgs = {
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

export type MutationUpdateOrganizationArgs = {
    id: Scalars['ID']
    input: UpdateOrganizationInput
}

export type MutationUpdateUserArgs = {
    id: Scalars['ID']
    input: UserInput
}

export type Organization = {
    __typename?: 'Organization'
    description: Maybe<Scalars['String']>
    email: Maybe<Scalars['String']>
    id: Scalars['ID']
    logoUrl: Maybe<Scalars['String']>
    memberList: Maybe<Array<Maybe<UserOrganizationPermit>>>
    seasonList: Maybe<Array<Maybe<Season>>>
    title: Scalars['String']
    websiteUrl: Maybe<Scalars['String']>
}

export type OrganizationInput = {
    description: InputMaybe<Scalars['String']>
    title: Scalars['String']
}

export type OrganizationPayload = {
    __typename?: 'OrganizationPayload'
    errors: Maybe<Array<Maybe<InputError>>>
    organization: Maybe<Organization>
}

export enum OrganizationPermissionLevel {
    Member = 'MEMBER',
    Owner = 'OWNER'
}

export type Position = {
    __typename?: 'Position'
    dateCreated: Maybe<Scalars['DateTime']>
    division: Maybe<Division>
    id: Scalars['ID']
    name: Maybe<Scalars['String']>
}

export type PositionInput = {
    divisionId: InputMaybe<Scalars['ID']>
    name: InputMaybe<Scalars['String']>
}

export type PositionPayload = {
    __typename?: 'PositionPayload'
    errors: Maybe<Array<Maybe<InputError>>>
    position: Maybe<Position>
}

export type Query = {
    __typename?: 'Query'
    isRegistered: Maybe<Scalars['Boolean']>
    me: Maybe<User>
    organization: Maybe<Organization>
    season: Maybe<Season>
}

export type QueryOrganizationArgs = {
    id: Scalars['ID']
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
    dateCreated: Maybe<Scalars['DateTime']>
    divisionList: Maybe<Array<Maybe<Division>>>
    endDate: Maybe<Scalars['DateTime']>
    id: Scalars['ID']
    name: Scalars['String']
    organization: Maybe<Organization>
    startDate: Maybe<Scalars['DateTime']>
}

export type SendOrganizationInviteInput = {
    emailList: InputMaybe<Array<Scalars['String']>>
    organizationId: Scalars['ID']
}

export type SendOrganizationInvitePayload = {
    __typename?: 'SendOrganizationInvitePayload'
    errors: Maybe<Array<InputError>>
}

export type SendSignInLinkPayload = {
    __typename?: 'SendSignInLinkPayload'
    errors: Maybe<Array<Maybe<InputError>>>
}

export type UpdateOrganizationInput = {
    description: InputMaybe<Scalars['String']>
    email: InputMaybe<Scalars['String']>
    logoB64: InputMaybe<Scalars['String']>
    title: InputMaybe<Scalars['String']>
    websiteUrl: InputMaybe<Scalars['String']>
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
    organizationPermitList: Array<Maybe<UserOrganizationPermit>>
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

export type UserOrganizationPermit = {
    __typename?: 'UserOrganizationPermit'
    id: Scalars['ID']
    organization: Organization
    permissionLevel: OrganizationPermissionLevel
    user: User
}

export type UserPayload = {
    __typename?: 'UserPayload'
    errors: Array<InputError>
    user: Maybe<User>
}

export type DivisionHeader_DivisionFragment = {
    __typename?: 'Division'
    id: string
    name: string | null
}

export type OrgEditScreenQueryVariables = Exact<{
    id: Scalars['ID']
}>

export type OrgEditScreenQuery = {
    __typename?: 'Query'
    organization: {
        __typename?: 'Organization'
        id: string
        title: string
        email: string | null
        logoUrl: string | null
        description: string | null
        websiteUrl: string | null
    } | null
}

export type OrgInfoItemFragment = {
    __typename?: 'Organization'
    id: string
    title: string
    logoUrl: string | null
}

export type OrgInfoListFragment = {
    __typename?: 'UserOrganizationPermit'
    permissionLevel: OrganizationPermissionLevel
    id: string
    organization: {
        __typename?: 'Organization'
        id: string
        email: string | null
        websiteUrl: string | null
        description: string | null
        title: string
        logoUrl: string | null
    }
}

export type OrgInfoSheet_PermitFragment = {
    __typename?: 'UserOrganizationPermit'
    id: string
    permissionLevel: OrganizationPermissionLevel
    organization: {
        __typename?: 'Organization'
        id: string
        email: string | null
        websiteUrl: string | null
        description: string | null
        title: string
        logoUrl: string | null
    }
}

export type OrgJoinedScreenQueryVariables = Exact<{ [key: string]: never }>

export type OrgJoinedScreenQuery = {
    __typename?: 'Query'
    me: {
        __typename?: 'User'
        id: string
        organizationPermitList: Array<{
            __typename?: 'UserOrganizationPermit'
            permissionLevel: OrganizationPermissionLevel
            id: string
            organization: {
                __typename?: 'Organization'
                id: string
                email: string | null
                websiteUrl: string | null
                description: string | null
                title: string
                logoUrl: string | null
            }
        } | null>
    } | null
}

export type OrgLeaveMutationVariables = Exact<{
    id: Scalars['ID']
}>

export type OrgLeaveMutation = {
    __typename?: 'Mutation'
    leaveOrganization: {
        __typename?: 'OrganizationPayload'
        errors: Array<{
            __typename?: 'InputError'
            key: string
            message: string
        } | null> | null
    }
}

export type OrgLogo_OrganizationFragment = {
    __typename?: 'Organization'
    title: string
    logoUrl: string | null
}

export type OrgCreateMutationVariables = Exact<{
    input: OrganizationInput
}>

export type OrgCreateMutation = {
    __typename?: 'Mutation'
    createOrganization: {
        __typename?: 'OrganizationPayload'
        errors: Array<{
            __typename?: 'InputError'
            key: string
            message: string
        } | null> | null
    }
}

export type OrgJoinMutationVariables = Exact<{
    id: Scalars['ID']
}>

export type OrgJoinMutation = {
    __typename?: 'Mutation'
    joinOrganization: {
        __typename?: 'OrganizationPayload'
        errors: Array<{
            __typename?: 'InputError'
            key: string
            message: string
        } | null> | null
    }
}

export type OrgEditMutationVariables = Exact<{
    id: Scalars['ID']
    input: UpdateOrganizationInput
}>

export type OrgEditMutation = {
    __typename?: 'Mutation'
    updateOrganization: {
        __typename?: 'OrganizationPayload'
        errors: Array<{
            __typename?: 'InputError'
            key: string
            message: string
        } | null> | null
    }
}

export type PositionEditItem_PositionFragment = {
    __typename?: 'Position'
    id: string
    name: string | null
}

export type SeasonStructureEditorQueryVariables = Exact<{
    id: Scalars['ID']
}>

export type SeasonStructureEditorQuery = {
    __typename?: 'Query'
    season: {
        __typename?: 'Season'
        id: string
        divisionList: Array<{
            __typename?: 'Division'
            id: string
            name: string | null
            positionList: Array<{
                __typename?: 'Position'
                id: string
                name: string | null
            } | null> | null
        } | null> | null
    } | null
}

export type CreateDivisionMutationVariables = Exact<{
    input: DivisionInput
}>

export type CreateDivisionMutation = {
    __typename?: 'Mutation'
    createDivision: {
        __typename?: 'DivisionPayload'
        division: {
            __typename?: 'Division'
            id: string
            name: string | null
            season: { __typename?: 'Season'; id: string } | null
        } | null
        errors: Array<{
            __typename?: 'InputError'
            key: string
            message: string
        } | null> | null
    } | null
}

export type CreatePositionMutationVariables = Exact<{
    input: PositionInput
}>

export type CreatePositionMutation = {
    __typename?: 'Mutation'
    createPosition: {
        __typename?: 'PositionPayload'
        position: {
            __typename?: 'Position'
            id: string
            name: string | null
            division: { __typename?: 'Division'; id: string } | null
        } | null
        errors: Array<{
            __typename?: 'InputError'
            key: string
            message: string
        } | null> | null
    } | null
}

export type DeleteDivisionMutationVariables = Exact<{
    id: Scalars['ID']
}>

export type DeleteDivisionMutation = {
    __typename?: 'Mutation'
    deleteDivision: {
        __typename?: 'DivisionPayload'
        division: { __typename?: 'Division'; id: string } | null
        errors: Array<{
            __typename?: 'InputError'
            key: string
            message: string
        } | null> | null
    } | null
}

export type DeletePositionMutationVariables = Exact<{
    id: Scalars['ID']
}>

export type DeletePositionMutation = {
    __typename?: 'Mutation'
    deletePosition: {
        __typename?: 'PositionPayload'
        position: { __typename?: 'Position'; id: string } | null
        errors: Array<{
            __typename?: 'InputError'
            key: string
            message: string
        } | null> | null
    } | null
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
        errors: Array<{
            __typename?: 'InputError'
            key: string
            message: string
        } | null> | null
    }
}

export type IsRegisteredQueryVariables = Exact<{ [key: string]: never }>

export type IsRegisteredQuery = {
    __typename?: 'Query'
    isRegistered: boolean | null
}

export const DivisionHeader_DivisionFragmentDoc = gql`
    fragment DivisionHeader_Division on Division {
        id
        name
    }
`
export const OrgLogo_OrganizationFragmentDoc = gql`
    fragment OrgLogo_Organization on Organization {
        title
        logoUrl
    }
`
export const OrgInfoSheet_PermitFragmentDoc = gql`
    fragment OrgInfoSheet_Permit on UserOrganizationPermit {
        id
        organization {
            id
            email
            websiteUrl
            description
            ...OrgLogo_Organization
        }
        permissionLevel
    }
    ${OrgLogo_OrganizationFragmentDoc}
`
export const OrgInfoItemFragmentDoc = gql`
    fragment OrgInfoItemFragment on Organization {
        id
        title
        logoUrl
    }
`
export const OrgInfoListFragmentDoc = gql`
    fragment OrgInfoListFragment on UserOrganizationPermit {
        ...OrgInfoSheet_Permit
        organization {
            ...OrgInfoItemFragment
        }
        permissionLevel
    }
    ${OrgInfoSheet_PermitFragmentDoc}
    ${OrgInfoItemFragmentDoc}
`
export const PositionEditItem_PositionFragmentDoc = gql`
    fragment PositionEditItem_Position on Position {
        id
        name
    }
`
export const OrgEditScreenDocument = gql`
    query OrgEditScreen($id: ID!) {
        organization(id: $id) {
            id
            title
            email
            logoUrl
            description
            websiteUrl
            ...OrgLogo_Organization
        }
    }
    ${OrgLogo_OrganizationFragmentDoc}
`

export function useOrgEditScreenQuery(
    options: Omit<Urql.UseQueryArgs<OrgEditScreenQueryVariables>, 'query'> = {}
) {
    return Urql.useQuery<OrgEditScreenQuery>({
        query: OrgEditScreenDocument,
        ...options
    })
}
export const OrgJoinedScreenDocument = gql`
    query OrgJoinedScreen {
        me {
            id
            organizationPermitList {
                ...OrgInfoListFragment
            }
        }
    }
    ${OrgInfoListFragmentDoc}
`

export function useOrgJoinedScreenQuery(
    options: Omit<
        Urql.UseQueryArgs<OrgJoinedScreenQueryVariables>,
        'query'
    > = {}
) {
    return Urql.useQuery<OrgJoinedScreenQuery>({
        query: OrgJoinedScreenDocument,
        ...options
    })
}
export const OrgLeaveDocument = gql`
    mutation OrgLeave($id: ID!) {
        leaveOrganization(id: $id) {
            errors {
                key
                message
            }
        }
    }
`

export function useOrgLeaveMutation() {
    return Urql.useMutation<OrgLeaveMutation, OrgLeaveMutationVariables>(
        OrgLeaveDocument
    )
}
export const OrgCreateDocument = gql`
    mutation OrgCreate($input: OrganizationInput!) {
        createOrganization(input: $input) {
            errors {
                key
                message
            }
        }
    }
`

export function useOrgCreateMutation() {
    return Urql.useMutation<OrgCreateMutation, OrgCreateMutationVariables>(
        OrgCreateDocument
    )
}
export const OrgJoinDocument = gql`
    mutation OrgJoin($id: ID!) {
        joinOrganization(id: $id) {
            errors {
                key
                message
            }
        }
    }
`

export function useOrgJoinMutation() {
    return Urql.useMutation<OrgJoinMutation, OrgJoinMutationVariables>(
        OrgJoinDocument
    )
}
export const OrgEditDocument = gql`
    mutation OrgEdit($id: ID!, $input: UpdateOrganizationInput!) {
        updateOrganization(id: $id, input: $input) {
            errors {
                key
                message
            }
        }
    }
`

export function useOrgEditMutation() {
    return Urql.useMutation<OrgEditMutation, OrgEditMutationVariables>(
        OrgEditDocument
    )
}
export const SeasonStructureEditorDocument = gql`
    query SeasonStructureEditor($id: ID!) {
        season(id: $id) {
            id
            divisionList {
                ...DivisionHeader_Division
                positionList {
                    ...PositionEditItem_Position
                }
            }
        }
    }
    ${DivisionHeader_DivisionFragmentDoc}
    ${PositionEditItem_PositionFragmentDoc}
`

export function useSeasonStructureEditorQuery(
    options: Omit<
        Urql.UseQueryArgs<SeasonStructureEditorQueryVariables>,
        'query'
    > = {}
) {
    return Urql.useQuery<SeasonStructureEditorQuery>({
        query: SeasonStructureEditorDocument,
        ...options
    })
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
