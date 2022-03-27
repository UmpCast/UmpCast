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
    dateUpdated: Scalars['DateTime']
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
    dateUpdated: Scalars['DateTime']
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
    dateCreated: Scalars['DateTime']
    dateUpdated: Scalars['DateTime']
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
    dateUpdated: Scalars['DateTime']
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
    dateUpdated: Scalars['DateTime']
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
    dateCreated: Scalars['DateTime']
    dateUpdated: Scalars['DateTime']
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

export type User = {
    __typename?: 'User'
    city: Maybe<Scalars['String']>
    dateCreated: Scalars['DateTime']
    dateUpdated: Scalars['DateTime']
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

export type OrgDeleteButton_OrganizationFragment = {
    __typename?: 'Organization'
    id: string
    name: string
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

export type OrgDeleteModal_OrganizationFragment = {
    __typename?: 'Organization'
    id: string
    name: string
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

export type OrgProfileLogo_OrganizationFragment = {
    __typename?: 'Organization'
    id: string
    name: string
    logoUrl: string | null
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

export type OrgMemberInviteModal_OrganizationFragment = {
    __typename?: 'Organization'
    id: string
}

export type OrgMemberItem_UserFragment = {
    __typename?: 'User'
    id: string
    firstName: string
    lastName: string
    profilePictureUrl: string | null
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

export type OrgSeasonListItem_SeasonFragment = {
    __typename?: 'Season'
    id: string
    name: string
    startDate: Date
    endDate: Date
}

export type OrganizationSeasonsScreen_SeasonFragment = {
    __typename?: 'Season'
    id: string
    name: string
    startDate: Date
    endDate: Date
}

export type OrganizationSeasonsScreenQueryVariables = Exact<{
    id: Scalars['ID']
}>

export type OrganizationSeasonsScreenQuery = {
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

export type SeasonEditAboutMutationVariables = Exact<{
    input: UpdateSeasonInput
}>

export type SeasonEditAboutMutation = {
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

export type SeasonEditStructDivisionActionSheet_DivisionFragment = {
    __typename?: 'Division'
    id: string
    name: string
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

export type SeasonEditStructDivisionHeader_DivisionFragment = {
    __typename?: 'Division'
    id: string
    name: string
}

export type PositionEditActionsheet_PositionFragment = {
    __typename?: 'Position'
    id: string
    name: string
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

export type SeasonEditStructPositionItem_PositionFragment = {
    __typename?: 'Position'
    id: string
    name: string
}

export type SeasonSettingsAboutCard_SeasonFragment = {
    __typename?: 'Season'
    id: string
    name: string
    startDate: Date
    endDate: Date
}

export type SeasonSettingsViewerRolesItemGroup_UserParticipatingSeasonEdgeFragment =
    {
        __typename?: 'UserParticipatingSeasonEdge'
        node: { __typename?: 'Season'; id: string }
        permit: {
            __typename?: 'SeasonParticipationPermit'
            id: string
            roles: Array<SeasonRoleType>
        }
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

export type SeasonParticipantItemName_UserFragment = {
    __typename?: 'User'
    id: string
    firstName: string
    lastName: string
}

export type SeasonParticipantItemPressable_UserFragment = {
    __typename?: 'User'
    id: string
    firstName: string
    profilePictureUrl: string | null
}

export type SeasonParticipantAddItem_OrganizationMemberEdgeFragment = {
    __typename?: 'OrganizationMemberEdge'
    isParticipating: boolean | null
    node: {
        __typename?: 'User'
        id: string
        firstName: string
        lastName: string
        profilePictureUrl: string | null
    }
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

export type SeasonParticipantAddRequests_OrganizationMemberEdgeFragment = {
    __typename?: 'OrganizationMemberEdge'
    node: { __typename?: 'User'; id: string }
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

export type SeasonParticipantRemoveButton_SeasonFragment = {
    __typename?: 'Season'
    id: string
}

export type SeasonParticipantRemoveButton_UserFragment = {
    __typename?: 'User'
    id: string
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

export type UserProfilePicture_UserFragment = {
    __typename?: 'User'
    id: string
    firstName: string
    profilePictureUrl: string | null
}

export type RegisterUserMutationVariables = Exact<{
    input: CreateUserInput
}>

export type RegisterUserMutation = {
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

export type UserJoinedOrgItem_OrganizationFragment = {
    __typename?: 'Organization'
    id: string
    name: string
    logoUrl: string | null
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

export type GroupsOrganizationsScreenQueryVariables = Exact<{
    [key: string]: never
}>

export type GroupsOrganizationsScreenQuery = {
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

export type OrganizationMembersScreenRightHeader_OrganizationFragment = {
    __typename?: 'Organization'
    id: string
}

export type OrganizationMembersScreenRightHeaderQueryVariables = Exact<{
    id: Scalars['ID']
}>

export type OrganizationMembersScreenRightHeaderQuery = {
    __typename?: 'Query'
    organization: { __typename?: 'Organization'; id: string } | null
}

export type OrganizationMembersScreen_OrganizationMemberEdgeFragment = {
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

export type OrganizationMembersScreen_OrganizationFragment = {
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

export type OrganizationMembersScreenQueryVariables = Exact<{
    id: Scalars['ID']
}>

export type OrganizationMembersScreenQuery = {
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

export type OrganizationSettingsProfileScreen_OrganizationFragment = {
    __typename?: 'Organization'
    id: string
    name: string
    description: string | null
    email: string | null
    logoUrl: string | null
    websiteUrl: string | null
}

export type OrganizationSettingsProfileScreenQueryVariables = Exact<{
    id: Scalars['ID']
}>

export type OrganizationSettingsProfileScreenQuery = {
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

export type SeasonParticipantsScreenQueryVariables = Exact<{
    seasonId: Scalars['ID']
}>

export type SeasonParticipantsScreenQuery = {
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
}

export type SeasonParticipantsAddScreen_OrganizationMemberEdgeFragment = {
    __typename?: 'OrganizationMemberEdge'
    isParticipating: boolean | null
    node: {
        __typename?: 'User'
        id: string
        firstName: string
        lastName: string
        profilePictureUrl: string | null
    }
}

export type SeasonParticipantsAddScreenQueryVariables = Exact<{
    seasonId: Scalars['ID']
}>

export type SeasonParticipantsAddScreenQuery = {
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
                    lastName: string
                    profilePictureUrl: string | null
                }
            }>
        }
    } | null
}

export type SeasonSettingsScreenQueryVariables = Exact<{
    seasonId: Scalars['ID']
}>

export type SeasonSettingsScreenQuery = {
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
        id: string
        season: {
            __typename?: 'UserParticipatingSeasonEdge'
            node: { __typename?: 'Season'; id: string }
            permit: {
                __typename?: 'SeasonParticipationPermit'
                id: string
                roles: Array<SeasonRoleType>
            }
        } | null
    } | null
}

export type SeasonAboutEditScreen_SeasonFragment = {
    __typename?: 'Season'
    id: string
    name: string
    startDate: Date
    endDate: Date
}

export type SeasonAboutEditScreenQueryVariables = Exact<{
    seasonId: Scalars['ID']
}>

export type SeasonAboutEditScreenQuery = {
    __typename?: 'Query'
    season: {
        __typename?: 'Season'
        id: string
        name: string
        startDate: Date
        endDate: Date
    } | null
}

export type SeasonStructureScreen_PositionFragment = {
    __typename?: 'Position'
    id: string
    name: string
}

export type SeasonStructureScreen_DivisionFragment = {
    __typename?: 'Division'
    id: string
    name: string
    positions: Array<{ __typename?: 'Position'; id: string; name: string }>
}

export type SeasonStructureScreenQueryVariables = Exact<{
    seasonId: Scalars['ID']
}>

export type SeasonStructureScreenQuery = {
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
export const OrgSeasonListItem_SeasonFragmentDoc = gql`
    fragment OrgSeasonListItem_Season on Season {
        id
        name
        startDate
        endDate
    }
`
export const OrganizationSeasonsScreen_SeasonFragmentDoc = gql`
    fragment OrganizationSeasonsScreen_Season on Season {
        id
        ...OrgSeasonListItem_Season
    }
    ${OrgSeasonListItem_SeasonFragmentDoc}
`
export const SeasonSettingsAboutCard_SeasonFragmentDoc = gql`
    fragment SeasonSettingsAboutCard_Season on Season {
        id
        name
        startDate
        endDate
    }
`
export const SeasonSettingsViewerRolesItemGroup_UserParticipatingSeasonEdgeFragmentDoc = gql`
    fragment SeasonSettingsViewerRolesItemGroup_UserParticipatingSeasonEdge on UserParticipatingSeasonEdge {
        node {
            id
        }
        permit {
            id
            roles
        }
    }
`
export const SeasonParticipantItemName_UserFragmentDoc = gql`
    fragment SeasonParticipantItemName_User on User {
        id
        firstName
        lastName
    }
`
export const UserProfilePicture_UserFragmentDoc = gql`
    fragment UserProfilePicture_User on User {
        id
        firstName
        profilePictureUrl
    }
`
export const SeasonParticipantItemPressable_UserFragmentDoc = gql`
    fragment SeasonParticipantItemPressable_User on User {
        id
        ...UserProfilePicture_User
    }
    ${UserProfilePicture_UserFragmentDoc}
`
export const SeasonParticipantListItem_SeasonParticipantEdgeFragmentDoc = gql`
    fragment SeasonParticipantListItem_SeasonParticipantEdge on SeasonParticipantEdge {
        node {
            id
            ...SeasonParticipantItemName_User
            ...SeasonParticipantItemPressable_User
        }
        permit {
            id
            roles
        }
    }
    ${SeasonParticipantItemName_UserFragmentDoc}
    ${SeasonParticipantItemPressable_UserFragmentDoc}
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
export const UserJoinedOrgItem_OrganizationFragmentDoc = gql`
    fragment UserJoinedOrgItem_Organization on Organization {
        id
        name
        logoUrl
    }
`
export const OrgProfileLogo_OrganizationFragmentDoc = gql`
    fragment OrgProfileLogo_Organization on Organization {
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
            ...OrgProfileLogo_Organization
        }
        membership {
            id
            role
        }
    }
    ${OrgProfileLogo_OrganizationFragmentDoc}
`
export const OrgMemberInviteModal_OrganizationFragmentDoc = gql`
    fragment OrgMemberInviteModal_Organization on Organization {
        id
    }
`
export const OrganizationMembersScreenRightHeader_OrganizationFragmentDoc = gql`
    fragment OrganizationMembersScreenRightHeader_Organization on Organization {
        id
        ...OrgMemberInviteModal_Organization
    }
    ${OrgMemberInviteModal_OrganizationFragmentDoc}
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
export const OrganizationMembersScreen_OrganizationMemberEdgeFragmentDoc = gql`
    fragment OrganizationMembersScreen_OrganizationMemberEdge on OrganizationMemberEdge {
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
export const OrganizationMembersScreen_OrganizationFragmentDoc = gql`
    fragment OrganizationMembersScreen_Organization on Organization {
        id
        members {
            ...OrganizationMembersScreen_OrganizationMemberEdge
        }
    }
    ${OrganizationMembersScreen_OrganizationMemberEdgeFragmentDoc}
`
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
export const OrganizationSettingsProfileScreen_OrganizationFragmentDoc = gql`
    fragment OrganizationSettingsProfileScreen_Organization on Organization {
        id
        ...OrgEditUseForm_Organization
        ...OrgProfileLogo_Organization
    }
    ${OrgEditUseForm_OrganizationFragmentDoc}
    ${OrgProfileLogo_OrganizationFragmentDoc}
`
export const SeasonParticipantAddItem_OrganizationMemberEdgeFragmentDoc = gql`
    fragment SeasonParticipantAddItem_OrganizationMemberEdge on OrganizationMemberEdge {
        node {
            id
            ...SeasonParticipantItemPressable_User
            ...SeasonParticipantItemName_User
        }
        isParticipating(id: $seasonId)
    }
    ${SeasonParticipantItemPressable_UserFragmentDoc}
    ${SeasonParticipantItemName_UserFragmentDoc}
`
export const SeasonParticipantAddRequests_OrganizationMemberEdgeFragmentDoc = gql`
    fragment SeasonParticipantAddRequests_OrganizationMemberEdge on OrganizationMemberEdge {
        node {
            id
        }
    }
`
export const SeasonParticipantsAddScreen_OrganizationMemberEdgeFragmentDoc = gql`
    fragment SeasonParticipantsAddScreen_OrganizationMemberEdge on OrganizationMemberEdge {
        ...SeasonParticipantAddItem_OrganizationMemberEdge
        ...SeasonParticipantAddRequests_OrganizationMemberEdge
    }
    ${SeasonParticipantAddItem_OrganizationMemberEdgeFragmentDoc}
    ${SeasonParticipantAddRequests_OrganizationMemberEdgeFragmentDoc}
`
export const SeasonAboutEditScreen_SeasonFragmentDoc = gql`
    fragment SeasonAboutEditScreen_Season on Season {
        id
        name
        startDate
        endDate
    }
`
export const SeasonEditStructDivisionHeader_DivisionFragmentDoc = gql`
    fragment SeasonEditStructDivisionHeader_Division on Division {
        id
        name
    }
`
export const SeasonEditStructDivisionActionSheet_DivisionFragmentDoc = gql`
    fragment SeasonEditStructDivisionActionSheet_Division on Division {
        id
        name
    }
`
export const SeasonEditStructPositionItem_PositionFragmentDoc = gql`
    fragment SeasonEditStructPositionItem_Position on Position {
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
export const SeasonStructureScreen_PositionFragmentDoc = gql`
    fragment SeasonStructureScreen_Position on Position {
        ...SeasonEditStructPositionItem_Position
        ...PositionEditActionsheet_Position
    }
    ${SeasonEditStructPositionItem_PositionFragmentDoc}
    ${PositionEditActionsheet_PositionFragmentDoc}
`
export const SeasonStructureScreen_DivisionFragmentDoc = gql`
    fragment SeasonStructureScreen_Division on Division {
        ...SeasonEditStructDivisionHeader_Division
        ...SeasonEditStructDivisionActionSheet_Division
        positions {
            ...SeasonStructureScreen_Position
        }
    }
    ${SeasonEditStructDivisionHeader_DivisionFragmentDoc}
    ${SeasonEditStructDivisionActionSheet_DivisionFragmentDoc}
    ${SeasonStructureScreen_PositionFragmentDoc}
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
export const OrganizationSeasonsScreenDocument = gql`
    query OrganizationSeasonsScreen($id: ID!) {
        organization(id: $id) {
            id
            seasons {
                id
                ...OrganizationSeasonsScreen_Season
            }
        }
    }
    ${OrganizationSeasonsScreen_SeasonFragmentDoc}
`

export function useOrganizationSeasonsScreenQuery(
    options: Omit<
        Urql.UseQueryArgs<OrganizationSeasonsScreenQueryVariables>,
        'query'
    > = {}
) {
    return Urql.useQuery<OrganizationSeasonsScreenQuery>({
        query: OrganizationSeasonsScreenDocument,
        ...options
    })
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
export const SeasonEditAboutDocument = gql`
    mutation SeasonEditAbout($input: UpdateSeasonInput!) {
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

export function useSeasonEditAboutMutation() {
    return Urql.useMutation<
        SeasonEditAboutMutation,
        SeasonEditAboutMutationVariables
    >(SeasonEditAboutDocument)
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
export const RegisterUserDocument = gql`
    mutation RegisterUser($input: CreateUserInput!) {
        createUser(input: $input) {
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
export const GroupsOrganizationsScreenDocument = gql`
    query GroupsOrganizationsScreen {
        viewer {
            id
            organizations {
                node {
                    id
                    ...UserJoinedOrgItem_Organization
                }
                membership {
                    id
                    role
                }
                ...OrgInfoSheet_UserJoinedOrganizationEdge
            }
        }
    }
    ${UserJoinedOrgItem_OrganizationFragmentDoc}
    ${OrgInfoSheet_UserJoinedOrganizationEdgeFragmentDoc}
`

export function useGroupsOrganizationsScreenQuery(
    options: Omit<
        Urql.UseQueryArgs<GroupsOrganizationsScreenQueryVariables>,
        'query'
    > = {}
) {
    return Urql.useQuery<GroupsOrganizationsScreenQuery>({
        query: GroupsOrganizationsScreenDocument,
        ...options
    })
}
export const OrganizationMembersScreenRightHeaderDocument = gql`
    query OrganizationMembersScreenRightHeader($id: ID!) {
        organization(id: $id) {
            ...OrganizationMembersScreenRightHeader_Organization
        }
    }
    ${OrganizationMembersScreenRightHeader_OrganizationFragmentDoc}
`

export function useOrganizationMembersScreenRightHeaderQuery(
    options: Omit<
        Urql.UseQueryArgs<OrganizationMembersScreenRightHeaderQueryVariables>,
        'query'
    > = {}
) {
    return Urql.useQuery<OrganizationMembersScreenRightHeaderQuery>({
        query: OrganizationMembersScreenRightHeaderDocument,
        ...options
    })
}
export const OrganizationMembersScreenDocument = gql`
    query OrganizationMembersScreen($id: ID!) {
        organization(id: $id) {
            id
            ...OrganizationMembersScreen_Organization
        }
    }
    ${OrganizationMembersScreen_OrganizationFragmentDoc}
`

export function useOrganizationMembersScreenQuery(
    options: Omit<
        Urql.UseQueryArgs<OrganizationMembersScreenQueryVariables>,
        'query'
    > = {}
) {
    return Urql.useQuery<OrganizationMembersScreenQuery>({
        query: OrganizationMembersScreenDocument,
        ...options
    })
}
export const OrganizationSettingsProfileScreenDocument = gql`
    query OrganizationSettingsProfileScreen($id: ID!) {
        organization(id: $id) {
            ...OrganizationSettingsProfileScreen_Organization
        }
    }
    ${OrganizationSettingsProfileScreen_OrganizationFragmentDoc}
`

export function useOrganizationSettingsProfileScreenQuery(
    options: Omit<
        Urql.UseQueryArgs<OrganizationSettingsProfileScreenQueryVariables>,
        'query'
    > = {}
) {
    return Urql.useQuery<OrganizationSettingsProfileScreenQuery>({
        query: OrganizationSettingsProfileScreenDocument,
        ...options
    })
}
export const SeasonParticipantsScreenDocument = gql`
    query SeasonParticipantsScreen($seasonId: ID!) {
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
    }
    ${SeasonParticipantRemoveButton_UserFragmentDoc}
    ${SeasonParticipantListItem_SeasonParticipantEdgeFragmentDoc}
    ${SeasonParticipantRemoveButton_SeasonFragmentDoc}
`

export function useSeasonParticipantsScreenQuery(
    options: Omit<
        Urql.UseQueryArgs<SeasonParticipantsScreenQueryVariables>,
        'query'
    > = {}
) {
    return Urql.useQuery<SeasonParticipantsScreenQuery>({
        query: SeasonParticipantsScreenDocument,
        ...options
    })
}
export const SeasonParticipantsAddScreenDocument = gql`
    query SeasonParticipantsAddScreen($seasonId: ID!) {
        season(id: $seasonId) {
            id
            organization {
                id
                members {
                    ...SeasonParticipantsAddScreen_OrganizationMemberEdge
                }
            }
        }
    }
    ${SeasonParticipantsAddScreen_OrganizationMemberEdgeFragmentDoc}
`

export function useSeasonParticipantsAddScreenQuery(
    options: Omit<
        Urql.UseQueryArgs<SeasonParticipantsAddScreenQueryVariables>,
        'query'
    > = {}
) {
    return Urql.useQuery<SeasonParticipantsAddScreenQuery>({
        query: SeasonParticipantsAddScreenDocument,
        ...options
    })
}
export const SeasonSettingsScreenDocument = gql`
    query SeasonSettingsScreen($seasonId: ID!) {
        season(id: $seasonId) {
            id
            ...SeasonSettingsAboutCard_Season
        }
        viewer {
            id
            season(id: $seasonId) {
                ...SeasonSettingsViewerRolesItemGroup_UserParticipatingSeasonEdge
            }
        }
    }
    ${SeasonSettingsAboutCard_SeasonFragmentDoc}
    ${SeasonSettingsViewerRolesItemGroup_UserParticipatingSeasonEdgeFragmentDoc}
`

export function useSeasonSettingsScreenQuery(
    options: Omit<
        Urql.UseQueryArgs<SeasonSettingsScreenQueryVariables>,
        'query'
    > = {}
) {
    return Urql.useQuery<SeasonSettingsScreenQuery>({
        query: SeasonSettingsScreenDocument,
        ...options
    })
}
export const SeasonAboutEditScreenDocument = gql`
    query SeasonAboutEditScreen($seasonId: ID!) {
        season(id: $seasonId) {
            ...SeasonAboutEditScreen_Season
        }
    }
    ${SeasonAboutEditScreen_SeasonFragmentDoc}
`

export function useSeasonAboutEditScreenQuery(
    options: Omit<
        Urql.UseQueryArgs<SeasonAboutEditScreenQueryVariables>,
        'query'
    > = {}
) {
    return Urql.useQuery<SeasonAboutEditScreenQuery>({
        query: SeasonAboutEditScreenDocument,
        ...options
    })
}
export const SeasonStructureScreenDocument = gql`
    query SeasonStructureScreen($seasonId: ID!) {
        season(id: $seasonId) {
            id
            divisions {
                ...SeasonStructureScreen_Division
            }
        }
    }
    ${SeasonStructureScreen_DivisionFragmentDoc}
`

export function useSeasonStructureScreenQuery(
    options: Omit<
        Urql.UseQueryArgs<SeasonStructureScreenQueryVariables>,
        'query'
    > = {}
) {
    return Urql.useQuery<SeasonStructureScreenQuery>({
        query: SeasonStructureScreenDocument,
        ...options
    })
}
