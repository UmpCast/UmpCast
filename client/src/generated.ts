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
    DateTime: Date
}

export type ActionCodeSettingsInput = {
    androidMinimumVersion: Scalars['String']
    androidPackageName: Scalars['String']
    dynamicLinkDomain: Scalars['String']
    iosBundleId: Scalars['String']
    url: Scalars['String']
}

/** An input request for adding a new season participant */
export type AddSeasonParticipantRequestInput = {
    /** List of roles to assign the user */
    roles: Array<SeasonRoleType>
    /** User to add as a participant */
    userId: Scalars['ID']
}

export type AddSeasonParticipantsInput = {
    /** List of requests to batch execute */
    requests: Array<AddSeasonParticipantRequestInput>
    seasonId: Scalars['ID']
}

export type AddSeasonParticipantsPayload = {
    __typename?: 'AddSeasonParticipantsPayload'
    success: Maybe<Scalars['Boolean']>
}

export type CreateDivisionInput = {
    name: Scalars['String']
    seasonId: Scalars['ID']
}

export type CreateDivisionPayload = {
    __typename?: 'CreateDivisionPayload'
    division: Maybe<Division>
    errors: Array<InputError>
}

export type CreateOrganizationInput = {
    description: InputMaybe<Scalars['String']>
    name: Scalars['String']
}

export type CreateOrganizationPayload = {
    __typename?: 'CreateOrganizationPayload'
    errors: Array<InputError>
    organization: Maybe<Organization>
}

export type CreatePositionInput = {
    divisionId: Scalars['ID']
    name: Scalars['String']
}

export type CreatePositionPayload = {
    __typename?: 'CreatePositionPayload'
    errors: Array<InputError>
    position: Maybe<Position>
}

export type CreateSeasonInput = {
    endDate: Scalars['String']
    name: Scalars['String']
    organizationId: Scalars['ID']
    startDate: Scalars['String']
}

export type CreateSeasonPayload = {
    __typename?: 'CreateSeasonPayload'
    errors: Array<InputError>
    season: Maybe<Season>
}

export type CreateUserInput = {
    firstName: Scalars['String']
    lastName: Scalars['String']
    phoneNumber: InputMaybe<Scalars['String']>
}

export type CreateUserPayload = {
    __typename?: 'CreateUserPayload'
    errors: Array<InputError>
    user: Maybe<User>
}

export type DeleteDivisionInput = {
    divisionId: Scalars['ID']
}

export type DeleteDivisionPayload = {
    __typename?: 'DeleteDivisionPayload'
    division: Maybe<Division>
}

export type DeleteOrganizationInput = {
    organizationId: Scalars['ID']
}

export type DeleteOrganizationPayload = {
    __typename?: 'DeleteOrganizationPayload'
    organization: Maybe<Organization>
    success: Scalars['Boolean']
}

export type DeletePositionInput = {
    positionId: Scalars['ID']
}

export type DeletePositionPayload = {
    __typename?: 'DeletePositionPayload'
    position: Maybe<Position>
}

export type Division = {
    __typename?: 'Division'
    dateCreated: Scalars['DateTime']
    id: Scalars['ID']
    name: Scalars['String']
    positions: Array<Position>
    season: Season
}

export type InputError = {
    __typename?: 'InputError'
    key: Scalars['String']
    message: Scalars['String']
}

export type JoinOrganizationInput = {
    organizationId: Scalars['ID']
}

export type JoinOrganizationPayload = {
    __typename?: 'JoinOrganizationPayload'
    organization: Maybe<Organization>
    success: Scalars['Boolean']
}

export type LeaveOrganizationInput = {
    organizationId: Scalars['ID']
}

export type LeaveOrganizationPayload = {
    __typename?: 'LeaveOrganizationPayload'
    organization: Maybe<Organization>
    success: Scalars['Boolean']
}

export type Mutation = {
    __typename?: 'Mutation'
    _empty: Maybe<Scalars['String']>
    addSeasonParticipants: Maybe<AddSeasonParticipantsPayload>
    createDivision: Maybe<CreateDivisionPayload>
    createOrganization: Maybe<CreateOrganizationPayload>
    createPosition: Maybe<CreatePositionPayload>
    createSeason: Maybe<CreateSeasonPayload>
    createUser: CreateUserPayload
    deleteDivision: Maybe<DeleteDivisionPayload>
    deleteOrganization: Maybe<DeleteOrganizationPayload>
    deletePosition: Maybe<DeletePositionPayload>
    joinOrganization: Maybe<JoinOrganizationPayload>
    leaveOrganization: Maybe<LeaveOrganizationPayload>
    removeSeasonParticipant: Maybe<RemoveSeasonParticipantPayload>
    sendSignInLink: SendSignInLinkPayload
    updateOrganization: Maybe<UpdateOrganizationPayload>
    updateSeason: Maybe<UpdateSeasonPayload>
    updateUser: UpdateUserPayload
}

export type MutationAddSeasonParticipantsArgs = {
    input: AddSeasonParticipantsInput
}

export type MutationCreateDivisionArgs = {
    input: CreateDivisionInput
}

export type MutationCreateOrganizationArgs = {
    input: CreateOrganizationInput
}

export type MutationCreatePositionArgs = {
    input: CreatePositionInput
}

export type MutationCreateSeasonArgs = {
    input: CreateSeasonInput
}

export type MutationCreateUserArgs = {
    input: CreateUserInput
}

export type MutationDeleteDivisionArgs = {
    input: DeleteDivisionInput
}

export type MutationDeleteOrganizationArgs = {
    input: DeleteOrganizationInput
}

export type MutationDeletePositionArgs = {
    input: DeletePositionInput
}

export type MutationJoinOrganizationArgs = {
    input: JoinOrganizationInput
}

export type MutationLeaveOrganizationArgs = {
    input: LeaveOrganizationInput
}

export type MutationRemoveSeasonParticipantArgs = {
    input: RemoveSeasonParticipantInput
}

export type MutationSendSignInLinkArgs = {
    input: SendSignInLinkInput
}

export type MutationUpdateOrganizationArgs = {
    input: UpdateOrganizationInput
}

export type MutationUpdateSeasonArgs = {
    input: UpdateSeasonInput
}

export type MutationUpdateUserArgs = {
    input: UpdateUserInput
}

export type Organization = {
    __typename?: 'Organization'
    dateCreated: Scalars['DateTime']
    description: Maybe<Scalars['String']>
    email: Maybe<Scalars['String']>
    id: Scalars['ID']
    logoUrl: Maybe<Scalars['String']>
    members: Array<OrganizationMemberEdge>
    name: Scalars['String']
    seasons: Array<Season>
    websiteUrl: Maybe<Scalars['String']>
}

/** Represents a user in the organization */
export type OrganizationMemberEdge = {
    __typename?: 'OrganizationMemberEdge'
    /** Indicates whether member is participating in a particular season in the organization */
    isParticipating: Maybe<Scalars['Boolean']>
    /** The membership of the user in the organization */
    membership: OrganizationMembership
    node: User
}

/** Represents a user in the organization */
export type OrganizationMemberEdgeIsParticipatingArgs = {
    id: Scalars['ID']
}

/** Membership of a user in an organization */
export type OrganizationMembership = {
    __typename?: 'OrganizationMembership'
    id: Scalars['ID']
    /** The role of the user in the organization */
    role: OrganizationRoleType
}

export enum OrganizationRoleType {
    Member = 'MEMBER',
    Owner = 'OWNER'
}

export type Position = {
    __typename?: 'Position'
    dateCreated: Scalars['DateTime']
    division: Division
    id: Scalars['ID']
    name: Scalars['String']
}

export type Query = {
    __typename?: 'Query'
    _empty: Maybe<Scalars['String']>
    organization: Maybe<Organization>
    season: Maybe<Season>
    viewer: Maybe<User>
}

export type QueryOrganizationArgs = {
    id: Scalars['ID']
}

export type QuerySeasonArgs = {
    id: Scalars['ID']
}

export type RemoveSeasonParticipantInput = {
    seasonId: Scalars['ID']
    userId: Scalars['ID']
}

export type RemoveSeasonParticipantPayload = {
    __typename?: 'RemoveSeasonParticipantPayload'
    success: Maybe<Scalars['Boolean']>
}

export type Season = {
    __typename?: 'Season'
    dateCreated: Scalars['DateTime']
    /** The divisions of the season */
    divisions: Array<Maybe<Division>>
    endDate: Scalars['DateTime']
    id: Scalars['ID']
    name: Scalars['String']
    /** The organization that owns the season */
    organization: Organization
    /** A list of users participating in the season */
    participants: Array<SeasonParticipantEdge>
    startDate: Scalars['DateTime']
}

export type SeasonParticipantEdge = {
    __typename?: 'SeasonParticipantEdge'
    /** The user participating in the season */
    node: User
    /** The permit of the user participating in the season */
    permit: SeasonParticipationPermit
}

/** Permit for a user participating in a season */
export type SeasonParticipationPermit = {
    __typename?: 'SeasonParticipationPermit'
    id: Scalars['ID']
    /** The membership of the user in the organization that owns the season */
    membership: OrganizationMembership
    /** List of roles assigned to the participant */
    roles: Array<SeasonRoleType>
    /** Season positions available for signup if they are a referee */
    visibility: Maybe<Array<Position>>
}

export enum SeasonRoleType {
    Manager = 'MANAGER',
    Referee = 'REFEREE'
}

export type SendSignInLinkInput = {
    actionCodeSettings: ActionCodeSettingsInput
    email: Scalars['String']
}

export type SendSignInLinkPayload = {
    __typename?: 'SendSignInLinkPayload'
    errors: Array<InputError>
}

export type UpdateOrganizationInput = {
    description: InputMaybe<Scalars['String']>
    email: InputMaybe<Scalars['String']>
    logoB64: InputMaybe<Scalars['String']>
    name: Scalars['String']
    organizationId: Scalars['ID']
    websiteUrl: InputMaybe<Scalars['String']>
}

export type UpdateOrganizationPayload = {
    __typename?: 'UpdateOrganizationPayload'
    errors: Array<InputError>
    organization: Maybe<Organization>
}

export type UpdateSeasonInput = {
    endDate: InputMaybe<Scalars['String']>
    name: InputMaybe<Scalars['String']>
    seasonId: Scalars['ID']
    startDate: InputMaybe<Scalars['String']>
}

export type UpdateSeasonPayload = {
    __typename?: 'UpdateSeasonPayload'
    errors: Array<InputError>
    season: Maybe<Season>
}

export type UpdateUserInput = {
    city: InputMaybe<Scalars['String']>
    firstName: InputMaybe<Scalars['String']>
    lastName: InputMaybe<Scalars['String']>
    phoneNumber: InputMaybe<Scalars['Int']>
    profilePictureB64: InputMaybe<Scalars['String']>
    state: InputMaybe<Scalars['String']>
    streetAddress: InputMaybe<Scalars['String']>
    userId: Scalars['ID']
    zipCode: InputMaybe<Scalars['Int']>
}

export type UpdateUserPayload = {
    __typename?: 'UpdateUserPayload'
    errors: Array<InputError>
    user: Maybe<User>
}

/** OwnerPolicy: An owner of an organization the user is in */
export type User = {
    __typename?: 'User'
    city: Maybe<Scalars['String']>
    dateCreated: Scalars['DateTime']
    email: Scalars['String']
    firstName: Scalars['String']
    fullAddress: Maybe<Scalars['String']>
    id: Scalars['ID']
    lastName: Scalars['String']
    /** Organizations the user has joined */
    organizations: Maybe<Array<UserJoinedOrganizationEdge>>
    phoneNumber: Maybe<Scalars['String']>
    profilePictureUrl: Maybe<Scalars['String']>
    /** Lookup a season the user is particpating in */
    season: Maybe<UserParticipatingSeasonEdge>
    /** Seasons the user is participating in */
    seasons: Maybe<Array<UserParticipatingSeasonEdge>>
    state: Maybe<Scalars['String']>
    streetAddress: Maybe<Scalars['String']>
    zipCode: Maybe<Scalars['Int']>
}

/** OwnerPolicy: An owner of an organization the user is in */
export type UserSeasonArgs = {
    id: Scalars['ID']
}

/** Represents an organization a user joined */
export type UserJoinedOrganizationEdge = {
    __typename?: 'UserJoinedOrganizationEdge'
    /** The membership of the user in the organization */
    membership: OrganizationMembership
    node: Organization
}

/** Represents a season the user is participating in */
export type UserParticipatingSeasonEdge = {
    __typename?: 'UserParticipatingSeasonEdge'
    node: Season
    /** The membership of the user in the organization that owns the season */
    permit: SeasonParticipationPermit
}

export type AuthStateQueryVariables = Exact<{ [key: string]: never }>

export type AuthStateQuery = {
    __typename?: 'Query'
    viewer: { __typename?: 'User'; id: string } | null
}

export type OrgEditUseForm_OrganizationFragment = {
    __typename?: 'Organization'
    id: string
    name: string
    description: string | null
    email: string | null
    logoUrl: string | null
    websiteUrl: string | null
}

export type SeasonParticipantAddRequests_OrganizationMemberEdgeFragment = {
    __typename?: 'OrganizationMemberEdge'
    node: { __typename?: 'User'; id: string }
}

export type SeasonViewerOrgRoleQueryVariables = Exact<{
    seasonId: Scalars['ID']
}>

export type SeasonViewerOrgRoleQuery = {
    __typename?: 'Query'
    viewer: {
        __typename?: 'User'
        id: string
        season: {
            __typename?: 'UserParticipatingSeasonEdge'
            permit: {
                __typename?: 'SeasonParticipationPermit'
                id: string
                membership: {
                    __typename?: 'OrganizationMembership'
                    id: string
                    role: OrganizationRoleType
                }
            }
        } | null
    } | null
}

export type AuthSignInSendEmailLinkMutationVariables = Exact<{
    input: SendSignInLinkInput
}>

export type AuthSignInSendEmailLinkMutation = {
    __typename?: 'Mutation'
    sendSignInLink: {
        __typename?: 'SendSignInLinkPayload'
        errors: Array<{
            __typename?: 'InputError'
            key: string
            message: string
        }>
    }
}

export type DivisionCreateMutationVariables = Exact<{
    input: CreateDivisionInput
}>

export type DivisionCreateMutation = {
    __typename?: 'Mutation'
    createDivision: {
        __typename?: 'CreateDivisionPayload'
        errors: Array<{
            __typename?: 'InputError'
            key: string
            message: string
        }>
    } | null
}

export type DivisionDeleteMutationVariables = Exact<{
    input: DeleteDivisionInput
}>

export type DivisionDeleteMutation = {
    __typename?: 'Mutation'
    deleteDivision: {
        __typename?: 'DeleteDivisionPayload'
        division: { __typename?: 'Division'; id: string } | null
    } | null
}

export type OrgCreateMutationVariables = Exact<{
    input: CreateOrganizationInput
}>

export type OrgCreateMutation = {
    __typename?: 'Mutation'
    createOrganization: {
        __typename?: 'CreateOrganizationPayload'
        errors: Array<{
            __typename?: 'InputError'
            key: string
            message: string
        }>
    } | null
}

export type OrgDeleteMutationVariables = Exact<{
    input: DeleteOrganizationInput
}>

export type OrgDeleteMutation = {
    __typename?: 'Mutation'
    deleteOrganization: {
        __typename?: 'DeleteOrganizationPayload'
        success: boolean
    } | null
}

export type OrgEditMutationVariables = Exact<{
    input: UpdateOrganizationInput
}>

export type OrgEditMutation = {
    __typename?: 'Mutation'
    updateOrganization: {
        __typename?: 'UpdateOrganizationPayload'
        errors: Array<{
            __typename?: 'InputError'
            key: string
            message: string
        }>
    } | null
}

export type OrgJoinMutationVariables = Exact<{
    input: JoinOrganizationInput
}>

export type OrgJoinMutation = {
    __typename?: 'Mutation'
    joinOrganization: {
        __typename?: 'JoinOrganizationPayload'
        success: boolean
    } | null
}

export type OrgLeaveMutationVariables = Exact<{
    input: LeaveOrganizationInput
}>

export type OrgLeaveMutation = {
    __typename?: 'Mutation'
    leaveOrganization: {
        __typename?: 'LeaveOrganizationPayload'
        success: boolean
    } | null
}

export type PositionCreateMutationVariables = Exact<{
    input: CreatePositionInput
}>

export type PositionCreateMutation = {
    __typename?: 'Mutation'
    createPosition: {
        __typename?: 'CreatePositionPayload'
        errors: Array<{
            __typename?: 'InputError'
            key: string
            message: string
        }>
    } | null
}

export type PositionDeleteMutationVariables = Exact<{
    input: DeletePositionInput
}>

export type PositionDeleteMutation = {
    __typename?: 'Mutation'
    deletePosition: {
        __typename?: 'DeletePositionPayload'
        position: { __typename?: 'Position'; id: string } | null
    } | null
}

export type SeasonCreateMutationVariables = Exact<{
    input: CreateSeasonInput
}>

export type SeasonCreateMutation = {
    __typename?: 'Mutation'
    createSeason: {
        __typename?: 'CreateSeasonPayload'
        errors: Array<{
            __typename?: 'InputError'
            key: string
            message: string
        }>
    } | null
}

export type SeasonEditMutationVariables = Exact<{
    input: UpdateSeasonInput
}>

export type SeasonEditMutation = {
    __typename?: 'Mutation'
    updateSeason: {
        __typename?: 'UpdateSeasonPayload'
        season: {
            __typename?: 'Season'
            id: string
            startDate: Date
            endDate: Date
        } | null
        errors: Array<{
            __typename?: 'InputError'
            key: string
            message: string
        }>
    } | null
}

export type SeasonParticipantBatchAddMutationVariables = Exact<{
    input: AddSeasonParticipantsInput
}>

export type SeasonParticipantBatchAddMutation = {
    __typename?: 'Mutation'
    addSeasonParticipants: {
        __typename?: 'AddSeasonParticipantsPayload'
        success: boolean | null
    } | null
}

export type SeasonParticipantRemoveMutationVariables = Exact<{
    input: RemoveSeasonParticipantInput
}>

export type SeasonParticipantRemoveMutation = {
    __typename?: 'Mutation'
    removeSeasonParticipant: {
        __typename?: 'RemoveSeasonParticipantPayload'
        success: boolean | null
    } | null
}

export type UserRegisterMutationVariables = Exact<{
    input: CreateUserInput
}>

export type UserRegisterMutation = {
    __typename?: 'Mutation'
    createUser: {
        __typename?: 'CreateUserPayload'
        errors: Array<{
            __typename?: 'InputError'
            key: string
            message: string
        }>
    }
}

export const OrgEditUseForm_OrganizationFragmentDoc = gql`
    fragment OrgEditUseForm_Organization on Organization {
        id
        name
        description
        email
        logoUrl
        websiteUrl
    }
`
export const SeasonParticipantAddRequests_OrganizationMemberEdgeFragmentDoc = gql`
    fragment SeasonParticipantAddRequests_OrganizationMemberEdge on OrganizationMemberEdge {
        node {
            id
        }
    }
`
export const AuthStateDocument = gql`
    query AuthState {
        viewer {
            id
        }
    }
`

export function useAuthStateQuery(
    options: Omit<Urql.UseQueryArgs<AuthStateQueryVariables>, 'query'> = {}
) {
    return Urql.useQuery<AuthStateQuery>({
        query: AuthStateDocument,
        ...options
    })
}
export const SeasonViewerOrgRoleDocument = gql`
    query SeasonViewerOrgRole($seasonId: ID!) {
        viewer {
            id
            season(id: $seasonId) {
                permit {
                    id
                    membership {
                        id
                        role
                    }
                }
            }
        }
    }
`

export function useSeasonViewerOrgRoleQuery(
    options: Omit<
        Urql.UseQueryArgs<SeasonViewerOrgRoleQueryVariables>,
        'query'
    > = {}
) {
    return Urql.useQuery<SeasonViewerOrgRoleQuery>({
        query: SeasonViewerOrgRoleDocument,
        ...options
    })
}
export const AuthSignInSendEmailLinkDocument = gql`
    mutation AuthSignInSendEmailLink($input: SendSignInLinkInput!) {
        sendSignInLink(input: $input) {
            errors {
                key
                message
            }
        }
    }
`

export function useAuthSignInSendEmailLinkMutation() {
    return Urql.useMutation<
        AuthSignInSendEmailLinkMutation,
        AuthSignInSendEmailLinkMutationVariables
    >(AuthSignInSendEmailLinkDocument)
}
export const DivisionCreateDocument = gql`
    mutation DivisionCreate($input: CreateDivisionInput!) {
        createDivision(input: $input) {
            errors {
                key
                message
            }
        }
    }
`

export function useDivisionCreateMutation() {
    return Urql.useMutation<
        DivisionCreateMutation,
        DivisionCreateMutationVariables
    >(DivisionCreateDocument)
}
export const DivisionDeleteDocument = gql`
    mutation DivisionDelete($input: DeleteDivisionInput!) {
        deleteDivision(input: $input) {
            division {
                id
            }
        }
    }
`

export function useDivisionDeleteMutation() {
    return Urql.useMutation<
        DivisionDeleteMutation,
        DivisionDeleteMutationVariables
    >(DivisionDeleteDocument)
}
export const OrgCreateDocument = gql`
    mutation OrgCreate($input: CreateOrganizationInput!) {
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
export const OrgDeleteDocument = gql`
    mutation OrgDelete($input: DeleteOrganizationInput!) {
        deleteOrganization(input: $input) {
            success
        }
    }
`

export function useOrgDeleteMutation() {
    return Urql.useMutation<OrgDeleteMutation, OrgDeleteMutationVariables>(
        OrgDeleteDocument
    )
}
export const OrgEditDocument = gql`
    mutation OrgEdit($input: UpdateOrganizationInput!) {
        updateOrganization(input: $input) {
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
export const OrgJoinDocument = gql`
    mutation OrgJoin($input: JoinOrganizationInput!) {
        joinOrganization(input: $input) {
            success
        }
    }
`

export function useOrgJoinMutation() {
    return Urql.useMutation<OrgJoinMutation, OrgJoinMutationVariables>(
        OrgJoinDocument
    )
}
export const OrgLeaveDocument = gql`
    mutation OrgLeave($input: LeaveOrganizationInput!) {
        leaveOrganization(input: $input) {
            success
        }
    }
`

export function useOrgLeaveMutation() {
    return Urql.useMutation<OrgLeaveMutation, OrgLeaveMutationVariables>(
        OrgLeaveDocument
    )
}
export const PositionCreateDocument = gql`
    mutation PositionCreate($input: CreatePositionInput!) {
        createPosition(input: $input) {
            errors {
                key
                message
            }
        }
    }
`

export function usePositionCreateMutation() {
    return Urql.useMutation<
        PositionCreateMutation,
        PositionCreateMutationVariables
    >(PositionCreateDocument)
}
export const PositionDeleteDocument = gql`
    mutation PositionDelete($input: DeletePositionInput!) {
        deletePosition(input: $input) {
            position {
                id
            }
        }
    }
`

export function usePositionDeleteMutation() {
    return Urql.useMutation<
        PositionDeleteMutation,
        PositionDeleteMutationVariables
    >(PositionDeleteDocument)
}
export const SeasonCreateDocument = gql`
    mutation SeasonCreate($input: CreateSeasonInput!) {
        createSeason(input: $input) {
            errors {
                key
                message
            }
        }
    }
`

export function useSeasonCreateMutation() {
    return Urql.useMutation<
        SeasonCreateMutation,
        SeasonCreateMutationVariables
    >(SeasonCreateDocument)
}
export const SeasonEditDocument = gql`
    mutation SeasonEdit($input: UpdateSeasonInput!) {
        updateSeason(input: $input) {
            season {
                id
                startDate
                endDate
            }
            errors {
                key
                message
            }
        }
    }
`

export function useSeasonEditMutation() {
    return Urql.useMutation<SeasonEditMutation, SeasonEditMutationVariables>(
        SeasonEditDocument
    )
}
export const SeasonParticipantBatchAddDocument = gql`
    mutation SeasonParticipantBatchAdd($input: AddSeasonParticipantsInput!) {
        addSeasonParticipants(input: $input) {
            success
        }
    }
`

export function useSeasonParticipantBatchAddMutation() {
    return Urql.useMutation<
        SeasonParticipantBatchAddMutation,
        SeasonParticipantBatchAddMutationVariables
    >(SeasonParticipantBatchAddDocument)
}
export const SeasonParticipantRemoveDocument = gql`
    mutation SeasonParticipantRemove($input: RemoveSeasonParticipantInput!) {
        removeSeasonParticipant(input: $input) {
            success
        }
    }
`

export function useSeasonParticipantRemoveMutation() {
    return Urql.useMutation<
        SeasonParticipantRemoveMutation,
        SeasonParticipantRemoveMutationVariables
    >(SeasonParticipantRemoveDocument)
}
export const UserRegisterDocument = gql`
    mutation UserRegister($input: CreateUserInput!) {
        createUser(input: $input) {
            errors {
                key
                message
            }
        }
    }
`

export function useUserRegisterMutation() {
    return Urql.useMutation<
        UserRegisterMutation,
        UserRegisterMutationVariables
    >(UserRegisterDocument)
}
