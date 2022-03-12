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

export type SendSignInLinkMutationVariables = Exact<{
    input: SendSignInLinkInput
}>

export type SendSignInLinkMutation = {
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

export type DivisionEditActionsheet_DivisionFragment = {
    __typename?: 'Division'
    id: string
    name: string
}

export type DivisionHeader_DivisionFragment = {
    __typename?: 'Division'
    id: string
    name: string
}

export type CreateDivisionMutationVariables = Exact<{
    input: CreateDivisionInput
}>

export type CreateDivisionMutation = {
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

export type DeleteDivisionMutationVariables = Exact<{
    input: DeleteDivisionInput
}>

export type DeleteDivisionMutation = {
    __typename?: 'Mutation'
    deleteDivision: {
        __typename?: 'DeleteDivisionPayload'
        division: { __typename?: 'Division'; id: string } | null
    } | null
}

export type OrgDeleteButton_OrganizationFragment = {
    __typename?: 'Organization'
    id: string
    name: string
}

export type OrgDeleteModal_OrganizationFragment = {
    __typename?: 'Organization'
    id: string
    name: string
}

export type OrgEditScreen_OrganizationFragment = {
    __typename?: 'Organization'
    id: string
    name: string
    description: string | null
    email: string | null
    logoUrl: string | null
    websiteUrl: string | null
}

export type OrgEditScreenQueryVariables = Exact<{
    id: Scalars['ID']
}>

export type OrgEditScreenQuery = {
    __typename?: 'Query'
    organization: {
        __typename?: 'Organization'
        id: string
        name: string
        description: string | null
        email: string | null
        logoUrl: string | null
        websiteUrl: string | null
    } | null
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

export type OrgInfoItem_OrganizationFragment = {
    __typename?: 'Organization'
    id: string
    name: string
    logoUrl: string | null
}

export type OrgInfoList_UserJoinedOrganizationEdgeFragment = {
    __typename?: 'UserJoinedOrganizationEdge'
    node: {
        __typename?: 'Organization'
        id: string
        email: string | null
        websiteUrl: string | null
        description: string | null
        name: string
        logoUrl: string | null
    }
    membership: {
        __typename?: 'OrganizationMembership'
        id: string
        role: OrganizationRoleType
    }
}

export type OrgInfoSheet_UserJoinedOrganizationEdgeFragment = {
    __typename?: 'UserJoinedOrganizationEdge'
    node: {
        __typename?: 'Organization'
        id: string
        email: string | null
        websiteUrl: string | null
        description: string | null
        name: string
        logoUrl: string | null
    }
    membership: {
        __typename?: 'OrganizationMembership'
        id: string
        role: OrganizationRoleType
    }
}

export type OrgLogo_OrganizationFragment = {
    __typename?: 'Organization'
    id: string
    name: string
    logoUrl: string | null
}

export type OrgMemberItem_UserFragment = {
    __typename?: 'User'
    id: string
    firstName: string
    lastName: string
    profilePictureUrl: string | null
}

export type OrgMemberScreen_OrganizationMemberEdgeFragment = {
    __typename?: 'OrganizationMemberEdge'
    node: {
        __typename?: 'User'
        id: string
        firstName: string
        lastName: string
        profilePictureUrl: string | null
    }
    membership: {
        __typename?: 'OrganizationMembership'
        id: string
        role: OrganizationRoleType
    }
}

export type OrgMemberScreen_OrganizationFragment = {
    __typename?: 'Organization'
    id: string
    members: Array<{
        __typename?: 'OrganizationMemberEdge'
        node: {
            __typename?: 'User'
            id: string
            firstName: string
            lastName: string
            profilePictureUrl: string | null
        }
        membership: {
            __typename?: 'OrganizationMembership'
            id: string
            role: OrganizationRoleType
        }
    }>
}

export type OrgMemberScreenQueryVariables = Exact<{
    id: Scalars['ID']
}>

export type OrgMemberScreenQuery = {
    __typename?: 'Query'
    organization: {
        __typename?: 'Organization'
        id: string
        members: Array<{
            __typename?: 'OrganizationMemberEdge'
            node: {
                __typename?: 'User'
                id: string
                firstName: string
                lastName: string
                profilePictureUrl: string | null
            }
            membership: {
                __typename?: 'OrganizationMembership'
                id: string
                role: OrganizationRoleType
            }
        }>
    } | null
}

export type OrgInviteButton_OrganizationFragment = {
    __typename?: 'Organization'
    id: string
}

export type OrgInviteButtonQueryVariables = Exact<{
    id: Scalars['ID']
}>

export type OrgInviteButtonQuery = {
    __typename?: 'Query'
    organization: { __typename?: 'Organization'; id: string } | null
}

export type OrgInviteModal_OrganizationFragment = {
    __typename?: 'Organization'
    id: string
}

export type OrgSeasonScreen_SeasonFragment = {
    __typename?: 'Season'
    id: string
    name: string
    startDate: Date
    endDate: Date
}

export type OrgSeasonScreenQueryVariables = Exact<{
    id: Scalars['ID']
}>

export type OrgSeasonScreenQuery = {
    __typename?: 'Query'
    organization: {
        __typename?: 'Organization'
        id: string
        seasons: Array<{
            __typename?: 'Season'
            id: string
            name: string
            startDate: Date
            endDate: Date
        }>
    } | null
}

export type OrgSettingsScreen_OrganizationFragment = {
    __typename?: 'Organization'
    id: string
    name: string
}

export type OrgSettingsScreenQueryVariables = Exact<{
    id: Scalars['ID']
}>

export type OrgSettingsScreenQuery = {
    __typename?: 'Query'
    organization: {
        __typename?: 'Organization'
        id: string
        name: string
    } | null
}

export type CreateOrganizationMutationVariables = Exact<{
    input: CreateOrganizationInput
}>

export type CreateOrganizationMutation = {
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

export type EditOrganizationMutationVariables = Exact<{
    input: UpdateOrganizationInput
}>

export type EditOrganizationMutation = {
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

export type DeleteOrganizationMutationVariables = Exact<{
    input: DeleteOrganizationInput
}>

export type DeleteOrganizationMutation = {
    __typename?: 'Mutation'
    deleteOrganization: {
        __typename?: 'DeleteOrganizationPayload'
        success: boolean
    } | null
}

export type JoinOrganizationMutationVariables = Exact<{
    input: JoinOrganizationInput
}>

export type JoinOrganizationMutation = {
    __typename?: 'Mutation'
    joinOrganization: {
        __typename?: 'JoinOrganizationPayload'
        success: boolean
    } | null
}

export type LeaveOrganizationMutationVariables = Exact<{
    input: LeaveOrganizationInput
}>

export type LeaveOrganizationMutation = {
    __typename?: 'Mutation'
    leaveOrganization: {
        __typename?: 'LeaveOrganizationPayload'
        success: boolean
    } | null
}

export type PositionEditActionsheet_PositionFragment = {
    __typename?: 'Position'
    id: string
    name: string
}

export type PositionEditItem_PositionFragment = {
    __typename?: 'Position'
    id: string
    name: string
}

export type CreatePositionMutationVariables = Exact<{
    input: CreatePositionInput
}>

export type CreatePositionMutation = {
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

export type DeletePositionMutationVariables = Exact<{
    input: DeletePositionInput
}>

export type DeletePositionMutation = {
    __typename?: 'Mutation'
    deletePosition: {
        __typename?: 'DeletePositionPayload'
        position: { __typename?: 'Position'; id: string } | null
    } | null
}

export type SeasonEditScreen_SeasonFragment = {
    __typename?: 'Season'
    id: string
    name: string
    startDate: Date
    endDate: Date
}

export type SeasonEditScreenQueryVariables = Exact<{
    seasonId: Scalars['ID']
}>

export type SeasonEditScreenQuery = {
    __typename?: 'Query'
    season: {
        __typename?: 'Season'
        id: string
        name: string
        startDate: Date
        endDate: Date
    } | null
}

export type SeasonInfoCard_SeasonFragment = {
    __typename?: 'Season'
    id: string
    name: string
    startDate: Date
    endDate: Date
}

export type SeasonInfoItem_SeasonFragment = {
    __typename?: 'Season'
    id: string
    name: string
    startDate: Date
    endDate: Date
}

export type SeasonAboutScreenQueryVariables = Exact<{
    seasonId: Scalars['ID']
}>

export type SeasonAboutScreenQuery = {
    __typename?: 'Query'
    season: {
        __typename?: 'Season'
        id: string
        name: string
        startDate: Date
        endDate: Date
    } | null
    viewer: {
        __typename?: 'User'
        season: {
            __typename?: 'UserParticipatingSeasonEdge'
            node: { __typename?: 'Season'; id: string }
            permit: {
                __typename?: 'SeasonParticipationPermit'
                roles: Array<SeasonRoleType>
            }
        } | null
    } | null
}

export type SeasonParticipantAddItem_OrganizationMemberEdgeEdgeFragment = {
    __typename?: 'OrganizationMemberEdge'
    isParticipating: boolean | null
    node: {
        __typename?: 'User'
        id: string
        firstName: string
        profilePictureUrl: string | null
        lastName: string
    }
}

export type SeasonParticipantAddScreen_OrganizationMemberEdgeFragment = {
    __typename?: 'OrganizationMemberEdge'
    isParticipating: boolean | null
    node: {
        __typename?: 'User'
        id: string
        firstName: string
        profilePictureUrl: string | null
        lastName: string
    }
}

export type SeasonParticipantAddScreenQueryVariables = Exact<{
    seasonId: Scalars['ID']
}>

export type SeasonParticipantAddScreenQuery = {
    __typename?: 'Query'
    season: {
        __typename?: 'Season'
        id: string
        organization: {
            __typename?: 'Organization'
            id: string
            members: Array<{
                __typename?: 'OrganizationMemberEdge'
                isParticipating: boolean | null
                node: {
                    __typename?: 'User'
                    id: string
                    firstName: string
                    profilePictureUrl: string | null
                    lastName: string
                }
            }>
        }
    } | null
}

export type UseSeasonParticipantAddRequest_OrganizationMemberEdgeFragment = {
    __typename?: 'OrganizationMemberEdge'
    node: { __typename?: 'User'; id: string }
}

export type SeasonParticipantListHeaderRightQueryVariables = Exact<{
    seasonId: Scalars['ID']
}>

export type SeasonParticipantListHeaderRightQuery = {
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

export type SeasonParticipantListItem_SeasonParticipantEdgeFragment = {
    __typename?: 'SeasonParticipantEdge'
    node: {
        __typename?: 'User'
        id: string
        firstName: string
        lastName: string
        profilePictureUrl: string | null
    }
    permit: {
        __typename?: 'SeasonParticipationPermit'
        id: string
        roles: Array<SeasonRoleType>
    }
}

export type SeasonParticipantListScreenQueryVariables = Exact<{
    seasonId: Scalars['ID']
}>

export type SeasonParticipantListScreenQuery = {
    __typename?: 'Query'
    season: {
        __typename?: 'Season'
        id: string
        participants: Array<{
            __typename?: 'SeasonParticipantEdge'
            node: {
                __typename?: 'User'
                id: string
                firstName: string
                lastName: string
                profilePictureUrl: string | null
            }
            permit: {
                __typename?: 'SeasonParticipationPermit'
                id: string
                roles: Array<SeasonRoleType>
            }
        }>
    } | null
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

export type SeasonParticipantRemoveButton_SeasonFragment = {
    __typename?: 'Season'
    id: string
}

export type SeasonParticipantRemoveButton_UserFragment = {
    __typename?: 'User'
    id: string
}

export type SeasonParticipantRoleCard_UserParticipatingSeasonEdgeFragment = {
    __typename?: 'UserParticipatingSeasonEdge'
    node: { __typename?: 'Season'; id: string }
    permit: {
        __typename?: 'SeasonParticipationPermit'
        roles: Array<SeasonRoleType>
    }
}

export type AddSeasonParticipantsMutationVariables = Exact<{
    input: AddSeasonParticipantsInput
}>

export type AddSeasonParticipantsMutation = {
    __typename?: 'Mutation'
    addSeasonParticipants: {
        __typename?: 'AddSeasonParticipantsPayload'
        success: boolean | null
    } | null
}

export type RemoveSeasonParticipantMutationVariables = Exact<{
    input: RemoveSeasonParticipantInput
}>

export type RemoveSeasonParticipantMutation = {
    __typename?: 'Mutation'
    removeSeasonParticipant: {
        __typename?: 'RemoveSeasonParticipantPayload'
        success: boolean | null
    } | null
}

export type UseSeasonParticipantOrgRole_QueryFragment = {
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

export type SeasonStructureEditor_PositionFragment = {
    __typename?: 'Position'
    id: string
    name: string
}

export type SeasonStructureEditor_DivisionFragment = {
    __typename?: 'Division'
    id: string
    name: string
    positions: Array<{ __typename?: 'Position'; id: string; name: string }>
}

export type SeasonStructureEditorQueryVariables = Exact<{
    id: Scalars['ID']
}>

export type SeasonStructureEditorQuery = {
    __typename?: 'Query'
    season: {
        __typename?: 'Season'
        id: string
        divisions: Array<{
            __typename?: 'Division'
            id: string
            name: string
            positions: Array<{
                __typename?: 'Position'
                id: string
                name: string
            }>
        } | null>
    } | null
}

export type CreateSeasonMutationVariables = Exact<{
    input: CreateSeasonInput
}>

export type CreateSeasonMutation = {
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

export type UpdateSeasonMutationVariables = Exact<{
    input: UpdateSeasonInput
}>

export type UpdateSeasonMutation = {
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

export type UserItemName_UserFragment = {
    __typename?: 'User'
    id: string
    firstName: string
    lastName: string
}

export type UserOrgScreenQueryVariables = Exact<{ [key: string]: never }>

export type UserOrgScreenQuery = {
    __typename?: 'Query'
    viewer: {
        __typename?: 'User'
        id: string
        organizations: Array<{
            __typename?: 'UserJoinedOrganizationEdge'
            node: {
                __typename?: 'Organization'
                id: string
                email: string | null
                websiteUrl: string | null
                description: string | null
                name: string
                logoUrl: string | null
            }
            membership: {
                __typename?: 'OrganizationMembership'
                id: string
                role: OrganizationRoleType
            }
        }> | null
    } | null
}

export type UserProfilePicture_UserFragment = {
    __typename?: 'User'
    id: string
    firstName: string
    profilePictureUrl: string | null
}

export type CreateUserMutationVariables = Exact<{
    input: CreateUserInput
}>

export type CreateUserMutation = {
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
export const OrgLogo_OrganizationFragmentDoc = gql`
    fragment OrgLogo_Organization on Organization {
        id
        name
        logoUrl
    }
`
export const OrgEditScreen_OrganizationFragmentDoc = gql`
    fragment OrgEditScreen_Organization on Organization {
        id
        ...OrgEditUseForm_Organization
        ...OrgLogo_Organization
    }
    ${OrgEditUseForm_OrganizationFragmentDoc}
    ${OrgLogo_OrganizationFragmentDoc}
`
export const OrgInfoItem_OrganizationFragmentDoc = gql`
    fragment OrgInfoItem_Organization on Organization {
        id
        name
        logoUrl
    }
`
export const OrgInfoSheet_UserJoinedOrganizationEdgeFragmentDoc = gql`
    fragment OrgInfoSheet_UserJoinedOrganizationEdge on UserJoinedOrganizationEdge {
        node {
            id
            email
            websiteUrl
            description
            ...OrgLogo_Organization
        }
        membership {
            id
            role
        }
    }
    ${OrgLogo_OrganizationFragmentDoc}
`
export const OrgInfoList_UserJoinedOrganizationEdgeFragmentDoc = gql`
    fragment OrgInfoList_UserJoinedOrganizationEdge on UserJoinedOrganizationEdge {
        node {
            id
            ...OrgInfoItem_Organization
        }
        membership {
            id
            role
        }
        ...OrgInfoSheet_UserJoinedOrganizationEdge
    }
    ${OrgInfoItem_OrganizationFragmentDoc}
    ${OrgInfoSheet_UserJoinedOrganizationEdgeFragmentDoc}
`
export const UserProfilePicture_UserFragmentDoc = gql`
    fragment UserProfilePicture_User on User {
        id
        firstName
        profilePictureUrl
    }
`
export const OrgMemberItem_UserFragmentDoc = gql`
    fragment OrgMemberItem_User on User {
        id
        firstName
        lastName
        ...UserProfilePicture_User
    }
    ${UserProfilePicture_UserFragmentDoc}
`
export const OrgMemberScreen_OrganizationMemberEdgeFragmentDoc = gql`
    fragment OrgMemberScreen_OrganizationMemberEdge on OrganizationMemberEdge {
        node {
            id
            ...OrgMemberItem_User
        }
        membership {
            id
            role
        }
    }
    ${OrgMemberItem_UserFragmentDoc}
`
export const OrgMemberScreen_OrganizationFragmentDoc = gql`
    fragment OrgMemberScreen_Organization on Organization {
        id
        members {
            ...OrgMemberScreen_OrganizationMemberEdge
        }
    }
    ${OrgMemberScreen_OrganizationMemberEdgeFragmentDoc}
`
export const OrgInviteModal_OrganizationFragmentDoc = gql`
    fragment OrgInviteModal_Organization on Organization {
        id
    }
`
export const OrgInviteButton_OrganizationFragmentDoc = gql`
    fragment OrgInviteButton_Organization on Organization {
        id
        ...OrgInviteModal_Organization
    }
    ${OrgInviteModal_OrganizationFragmentDoc}
`
export const SeasonInfoItem_SeasonFragmentDoc = gql`
    fragment SeasonInfoItem_Season on Season {
        id
        name
        startDate
        endDate
    }
`
export const OrgSeasonScreen_SeasonFragmentDoc = gql`
    fragment OrgSeasonScreen_Season on Season {
        id
        ...SeasonInfoItem_Season
    }
    ${SeasonInfoItem_SeasonFragmentDoc}
`
export const OrgDeleteModal_OrganizationFragmentDoc = gql`
    fragment OrgDeleteModal_Organization on Organization {
        id
        name
    }
`
export const OrgDeleteButton_OrganizationFragmentDoc = gql`
    fragment OrgDeleteButton_Organization on Organization {
        id
        ...OrgDeleteModal_Organization
    }
    ${OrgDeleteModal_OrganizationFragmentDoc}
`
export const OrgSettingsScreen_OrganizationFragmentDoc = gql`
    fragment OrgSettingsScreen_Organization on Organization {
        ...OrgDeleteButton_Organization
    }
    ${OrgDeleteButton_OrganizationFragmentDoc}
`
export const SeasonEditScreen_SeasonFragmentDoc = gql`
    fragment SeasonEditScreen_Season on Season {
        id
        name
        startDate
        endDate
    }
`
export const SeasonInfoCard_SeasonFragmentDoc = gql`
    fragment SeasonInfoCard_Season on Season {
        id
        name
        startDate
        endDate
    }
`
export const UserItemName_UserFragmentDoc = gql`
    fragment UserItemName_User on User {
        id
        firstName
        lastName
    }
`
export const SeasonParticipantAddItem_OrganizationMemberEdgeEdgeFragmentDoc = gql`
    fragment SeasonParticipantAddItem_OrganizationMemberEdgeEdge on OrganizationMemberEdge {
        node {
            id
            ...UserProfilePicture_User
            ...UserItemName_User
        }
        isParticipating(id: $seasonId)
    }
    ${UserProfilePicture_UserFragmentDoc}
    ${UserItemName_UserFragmentDoc}
`
export const UseSeasonParticipantAddRequest_OrganizationMemberEdgeFragmentDoc = gql`
    fragment UseSeasonParticipantAddRequest_OrganizationMemberEdge on OrganizationMemberEdge {
        node {
            id
        }
    }
`
export const SeasonParticipantAddScreen_OrganizationMemberEdgeFragmentDoc = gql`
    fragment SeasonParticipantAddScreen_OrganizationMemberEdge on OrganizationMemberEdge {
        ...SeasonParticipantAddItem_OrganizationMemberEdgeEdge
        ...UseSeasonParticipantAddRequest_OrganizationMemberEdge
    }
    ${SeasonParticipantAddItem_OrganizationMemberEdgeEdgeFragmentDoc}
    ${UseSeasonParticipantAddRequest_OrganizationMemberEdgeFragmentDoc}
`
export const SeasonParticipantListItem_SeasonParticipantEdgeFragmentDoc = gql`
    fragment SeasonParticipantListItem_SeasonParticipantEdge on SeasonParticipantEdge {
        node {
            id
            ...UserItemName_User
            ...UserProfilePicture_User
        }
        permit {
            id
            roles
        }
    }
    ${UserItemName_UserFragmentDoc}
    ${UserProfilePicture_UserFragmentDoc}
`
export const SeasonParticipantRemoveButton_SeasonFragmentDoc = gql`
    fragment SeasonParticipantRemoveButton_Season on Season {
        id
    }
`
export const SeasonParticipantRemoveButton_UserFragmentDoc = gql`
    fragment SeasonParticipantRemoveButton_User on User {
        id
    }
`
export const SeasonParticipantRoleCard_UserParticipatingSeasonEdgeFragmentDoc = gql`
    fragment SeasonParticipantRoleCard_UserParticipatingSeasonEdge on UserParticipatingSeasonEdge {
        node {
            id
        }
        permit {
            roles
        }
    }
`
export const UseSeasonParticipantOrgRole_QueryFragmentDoc = gql`
    fragment UseSeasonParticipantOrgRole_Query on Query {
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
export const DivisionHeader_DivisionFragmentDoc = gql`
    fragment DivisionHeader_Division on Division {
        id
        name
    }
`
export const DivisionEditActionsheet_DivisionFragmentDoc = gql`
    fragment DivisionEditActionsheet_Division on Division {
        id
        name
    }
`
export const PositionEditItem_PositionFragmentDoc = gql`
    fragment PositionEditItem_Position on Position {
        id
        name
    }
`
export const PositionEditActionsheet_PositionFragmentDoc = gql`
    fragment PositionEditActionsheet_Position on Position {
        id
        name
    }
`
export const SeasonStructureEditor_PositionFragmentDoc = gql`
    fragment SeasonStructureEditor_Position on Position {
        ...PositionEditItem_Position
        ...PositionEditActionsheet_Position
    }
    ${PositionEditItem_PositionFragmentDoc}
    ${PositionEditActionsheet_PositionFragmentDoc}
`
export const SeasonStructureEditor_DivisionFragmentDoc = gql`
    fragment SeasonStructureEditor_Division on Division {
        ...DivisionHeader_Division
        ...DivisionEditActionsheet_Division
        positions {
            ...SeasonStructureEditor_Position
        }
    }
    ${DivisionHeader_DivisionFragmentDoc}
    ${DivisionEditActionsheet_DivisionFragmentDoc}
    ${SeasonStructureEditor_PositionFragmentDoc}
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
export const SendSignInLinkDocument = gql`
    mutation SendSignInLink($input: SendSignInLinkInput!) {
        sendSignInLink(input: $input) {
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
export const CreateDivisionDocument = gql`
    mutation CreateDivision($input: CreateDivisionInput!) {
        createDivision(input: $input) {
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
export const DeleteDivisionDocument = gql`
    mutation DeleteDivision($input: DeleteDivisionInput!) {
        deleteDivision(input: $input) {
            division {
                id
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
export const OrgEditScreenDocument = gql`
    query OrgEditScreen($id: ID!) {
        organization(id: $id) {
            ...OrgEditScreen_Organization
        }
    }
    ${OrgEditScreen_OrganizationFragmentDoc}
`

export function useOrgEditScreenQuery(
    options: Omit<Urql.UseQueryArgs<OrgEditScreenQueryVariables>, 'query'> = {}
) {
    return Urql.useQuery<OrgEditScreenQuery>({
        query: OrgEditScreenDocument,
        ...options
    })
}
export const OrgMemberScreenDocument = gql`
    query OrgMemberScreen($id: ID!) {
        organization(id: $id) {
            id
            ...OrgMemberScreen_Organization
        }
    }
    ${OrgMemberScreen_OrganizationFragmentDoc}
`

export function useOrgMemberScreenQuery(
    options: Omit<
        Urql.UseQueryArgs<OrgMemberScreenQueryVariables>,
        'query'
    > = {}
) {
    return Urql.useQuery<OrgMemberScreenQuery>({
        query: OrgMemberScreenDocument,
        ...options
    })
}
export const OrgInviteButtonDocument = gql`
    query OrgInviteButton($id: ID!) {
        organization(id: $id) {
            ...OrgInviteButton_Organization
        }
    }
    ${OrgInviteButton_OrganizationFragmentDoc}
`

export function useOrgInviteButtonQuery(
    options: Omit<
        Urql.UseQueryArgs<OrgInviteButtonQueryVariables>,
        'query'
    > = {}
) {
    return Urql.useQuery<OrgInviteButtonQuery>({
        query: OrgInviteButtonDocument,
        ...options
    })
}
export const OrgSeasonScreenDocument = gql`
    query OrgSeasonScreen($id: ID!) {
        organization(id: $id) {
            id
            seasons {
                id
                ...OrgSeasonScreen_Season
            }
        }
    }
    ${OrgSeasonScreen_SeasonFragmentDoc}
`

export function useOrgSeasonScreenQuery(
    options: Omit<
        Urql.UseQueryArgs<OrgSeasonScreenQueryVariables>,
        'query'
    > = {}
) {
    return Urql.useQuery<OrgSeasonScreenQuery>({
        query: OrgSeasonScreenDocument,
        ...options
    })
}
export const OrgSettingsScreenDocument = gql`
    query OrgSettingsScreen($id: ID!) {
        organization(id: $id) {
            id
            ...OrgSettingsScreen_Organization
        }
    }
    ${OrgSettingsScreen_OrganizationFragmentDoc}
`

export function useOrgSettingsScreenQuery(
    options: Omit<
        Urql.UseQueryArgs<OrgSettingsScreenQueryVariables>,
        'query'
    > = {}
) {
    return Urql.useQuery<OrgSettingsScreenQuery>({
        query: OrgSettingsScreenDocument,
        ...options
    })
}
export const CreateOrganizationDocument = gql`
    mutation CreateOrganization($input: CreateOrganizationInput!) {
        createOrganization(input: $input) {
            errors {
                key
                message
            }
        }
    }
`

export function useCreateOrganizationMutation() {
    return Urql.useMutation<
        CreateOrganizationMutation,
        CreateOrganizationMutationVariables
    >(CreateOrganizationDocument)
}
export const EditOrganizationDocument = gql`
    mutation EditOrganization($input: UpdateOrganizationInput!) {
        updateOrganization(input: $input) {
            errors {
                key
                message
            }
        }
    }
`

export function useEditOrganizationMutation() {
    return Urql.useMutation<
        EditOrganizationMutation,
        EditOrganizationMutationVariables
    >(EditOrganizationDocument)
}
export const DeleteOrganizationDocument = gql`
    mutation DeleteOrganization($input: DeleteOrganizationInput!) {
        deleteOrganization(input: $input) {
            success
        }
    }
`

export function useDeleteOrganizationMutation() {
    return Urql.useMutation<
        DeleteOrganizationMutation,
        DeleteOrganizationMutationVariables
    >(DeleteOrganizationDocument)
}
export const JoinOrganizationDocument = gql`
    mutation JoinOrganization($input: JoinOrganizationInput!) {
        joinOrganization(input: $input) {
            success
        }
    }
`

export function useJoinOrganizationMutation() {
    return Urql.useMutation<
        JoinOrganizationMutation,
        JoinOrganizationMutationVariables
    >(JoinOrganizationDocument)
}
export const LeaveOrganizationDocument = gql`
    mutation LeaveOrganization($input: LeaveOrganizationInput!) {
        leaveOrganization(input: $input) {
            success
        }
    }
`

export function useLeaveOrganizationMutation() {
    return Urql.useMutation<
        LeaveOrganizationMutation,
        LeaveOrganizationMutationVariables
    >(LeaveOrganizationDocument)
}
export const CreatePositionDocument = gql`
    mutation CreatePosition($input: CreatePositionInput!) {
        createPosition(input: $input) {
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
export const DeletePositionDocument = gql`
    mutation DeletePosition($input: DeletePositionInput!) {
        deletePosition(input: $input) {
            position {
                id
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
export const SeasonEditScreenDocument = gql`
    query SeasonEditScreen($seasonId: ID!) {
        season(id: $seasonId) {
            ...SeasonEditScreen_Season
        }
    }
    ${SeasonEditScreen_SeasonFragmentDoc}
`

export function useSeasonEditScreenQuery(
    options: Omit<
        Urql.UseQueryArgs<SeasonEditScreenQueryVariables>,
        'query'
    > = {}
) {
    return Urql.useQuery<SeasonEditScreenQuery>({
        query: SeasonEditScreenDocument,
        ...options
    })
}
export const SeasonAboutScreenDocument = gql`
    query SeasonAboutScreen($seasonId: ID!) {
        season(id: $seasonId) {
            id
            ...SeasonInfoCard_Season
        }
        viewer {
            season(id: $seasonId) {
                ...SeasonParticipantRoleCard_UserParticipatingSeasonEdge
            }
        }
    }
    ${SeasonInfoCard_SeasonFragmentDoc}
    ${SeasonParticipantRoleCard_UserParticipatingSeasonEdgeFragmentDoc}
`

export function useSeasonAboutScreenQuery(
    options: Omit<
        Urql.UseQueryArgs<SeasonAboutScreenQueryVariables>,
        'query'
    > = {}
) {
    return Urql.useQuery<SeasonAboutScreenQuery>({
        query: SeasonAboutScreenDocument,
        ...options
    })
}
export const SeasonParticipantAddScreenDocument = gql`
    query SeasonParticipantAddScreen($seasonId: ID!) {
        season(id: $seasonId) {
            id
            organization {
                id
                members {
                    ...SeasonParticipantAddScreen_OrganizationMemberEdge
                }
            }
        }
    }
    ${SeasonParticipantAddScreen_OrganizationMemberEdgeFragmentDoc}
`

export function useSeasonParticipantAddScreenQuery(
    options: Omit<
        Urql.UseQueryArgs<SeasonParticipantAddScreenQueryVariables>,
        'query'
    > = {}
) {
    return Urql.useQuery<SeasonParticipantAddScreenQuery>({
        query: SeasonParticipantAddScreenDocument,
        ...options
    })
}
export const SeasonParticipantListHeaderRightDocument = gql`
    query SeasonParticipantListHeaderRight($seasonId: ID!) {
        ...UseSeasonParticipantOrgRole_Query
    }
    ${UseSeasonParticipantOrgRole_QueryFragmentDoc}
`

export function useSeasonParticipantListHeaderRightQuery(
    options: Omit<
        Urql.UseQueryArgs<SeasonParticipantListHeaderRightQueryVariables>,
        'query'
    > = {}
) {
    return Urql.useQuery<SeasonParticipantListHeaderRightQuery>({
        query: SeasonParticipantListHeaderRightDocument,
        ...options
    })
}
export const SeasonParticipantListScreenDocument = gql`
    query SeasonParticipantListScreen($seasonId: ID!) {
        season(id: $seasonId) {
            id
            participants {
                node {
                    id
                    ...SeasonParticipantRemoveButton_User
                }
                ...SeasonParticipantListItem_SeasonParticipantEdge
            }
            ...SeasonParticipantRemoveButton_Season
        }
        ...UseSeasonParticipantOrgRole_Query
    }
    ${SeasonParticipantRemoveButton_UserFragmentDoc}
    ${SeasonParticipantListItem_SeasonParticipantEdgeFragmentDoc}
    ${SeasonParticipantRemoveButton_SeasonFragmentDoc}
    ${UseSeasonParticipantOrgRole_QueryFragmentDoc}
`

export function useSeasonParticipantListScreenQuery(
    options: Omit<
        Urql.UseQueryArgs<SeasonParticipantListScreenQueryVariables>,
        'query'
    > = {}
) {
    return Urql.useQuery<SeasonParticipantListScreenQuery>({
        query: SeasonParticipantListScreenDocument,
        ...options
    })
}
export const AddSeasonParticipantsDocument = gql`
    mutation AddSeasonParticipants($input: AddSeasonParticipantsInput!) {
        addSeasonParticipants(input: $input) {
            success
        }
    }
`

export function useAddSeasonParticipantsMutation() {
    return Urql.useMutation<
        AddSeasonParticipantsMutation,
        AddSeasonParticipantsMutationVariables
    >(AddSeasonParticipantsDocument)
}
export const RemoveSeasonParticipantDocument = gql`
    mutation RemoveSeasonParticipant($input: RemoveSeasonParticipantInput!) {
        removeSeasonParticipant(input: $input) {
            success
        }
    }
`

export function useRemoveSeasonParticipantMutation() {
    return Urql.useMutation<
        RemoveSeasonParticipantMutation,
        RemoveSeasonParticipantMutationVariables
    >(RemoveSeasonParticipantDocument)
}
export const SeasonStructureEditorDocument = gql`
    query SeasonStructureEditor($id: ID!) {
        season(id: $id) {
            id
            divisions {
                ...SeasonStructureEditor_Division
            }
        }
    }
    ${SeasonStructureEditor_DivisionFragmentDoc}
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
export const CreateSeasonDocument = gql`
    mutation CreateSeason($input: CreateSeasonInput!) {
        createSeason(input: $input) {
            errors {
                key
                message
            }
        }
    }
`

export function useCreateSeasonMutation() {
    return Urql.useMutation<
        CreateSeasonMutation,
        CreateSeasonMutationVariables
    >(CreateSeasonDocument)
}
export const UpdateSeasonDocument = gql`
    mutation UpdateSeason($input: UpdateSeasonInput!) {
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

export function useUpdateSeasonMutation() {
    return Urql.useMutation<
        UpdateSeasonMutation,
        UpdateSeasonMutationVariables
    >(UpdateSeasonDocument)
}
export const UserOrgScreenDocument = gql`
    query UserOrgScreen {
        viewer {
            id
            organizations {
                ...OrgInfoList_UserJoinedOrganizationEdge
                ...OrgInfoSheet_UserJoinedOrganizationEdge
            }
        }
    }
    ${OrgInfoList_UserJoinedOrganizationEdgeFragmentDoc}
    ${OrgInfoSheet_UserJoinedOrganizationEdgeFragmentDoc}
`

export function useUserOrgScreenQuery(
    options: Omit<Urql.UseQueryArgs<UserOrgScreenQueryVariables>, 'query'> = {}
) {
    return Urql.useQuery<UserOrgScreenQuery>({
        query: UserOrgScreenDocument,
        ...options
    })
}
export const CreateUserDocument = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            errors {
                key
                message
            }
        }
    }
`

export function useCreateUserMutation() {
    return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(
        CreateUserDocument
    )
}
