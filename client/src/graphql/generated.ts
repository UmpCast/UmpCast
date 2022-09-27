import gql from 'graphql-tag'
import * as Urql from 'urql'

export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
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

export type AssignGameListingInput = {
    gameListingId: Scalars['ID']
    userId: Scalars['ID']
}

export type AssignGameListingPayload = {
    __typename?: 'AssignGameListingPayload'
    gameListing: Maybe<GameListing>
    success: Scalars['Boolean']
}

export type Connection = {
    pageInfo: PageInfo
    totalCount: Scalars['Int']
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

export type CreateGameInput = {
    divisionId: Scalars['ID']
    endTime: InputMaybe<Scalars['DateTime']>
    location: InputMaybe<Scalars['String']>
    name: Scalars['String']
    startTime: Scalars['DateTime']
}

export type CreateGamePayload = {
    __typename?: 'CreateGamePayload'
    errors: Array<InputError>
    game: Maybe<Game>
    success: Scalars['Boolean']
}

export type CreateOrganizationInput = {
    description: InputMaybe<Scalars['String']>
    email: InputMaybe<Scalars['String']>
    logoB64: InputMaybe<Scalars['String']>
    name: Scalars['String']
    websiteUrl: InputMaybe<Scalars['String']>
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
    success: Scalars['Boolean']
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
    success: Maybe<Scalars['Boolean']>
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

export type Game = {
    __typename?: 'Game'
    canDelete: Scalars['Boolean']
    dateCreated: Scalars['DateTime']
    dateUpdated: Scalars['DateTime']
    /** The division of the game */
    division: Division
    endTime: Maybe<Scalars['DateTime']>
    id: Scalars['ID']
    listings: Array<GameListing>
    location: Maybe<Scalars['String']>
    name: Scalars['String']
    startTime: Scalars['DateTime']
}

/** A listing for a game */
export type GameListing = Node & {
    __typename?: 'GameListing'
    /** The user, if exists, that has been assigned to the listing */
    assignee: Maybe<GameListingAssigneeEdge>
    availableAssignees: Maybe<Array<User>>
    canAssignSelf: Maybe<Scalars['Boolean']>
    canChangeAssignee: Maybe<Scalars['Boolean']>
    dateCreated: Scalars['DateTime']
    dateUpdated: Scalars['DateTime']
    game: Game
    id: Scalars['ID']
    /** The name of the listing */
    name: Scalars['String']
    /** A listing may have been generated from a position */
    position: Maybe<Position>
}

/** A listing for a game */
export type GameListingAvailableAssigneesArgs = {
    name: InputMaybe<Scalars['String']>
}

/** Represents a user assigned to a game listing */
export type GameListingAssigneeEdge = {
    __typename?: 'GameListingAssigneeEdge'
    node: User
    permit: SeasonParticipationPermit
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
    assignGameListing: AssignGameListingPayload
    createDivision: Maybe<CreateDivisionPayload>
    createGame: CreateGamePayload
    createOrganization: Maybe<CreateOrganizationPayload>
    createPosition: Maybe<CreatePositionPayload>
    createSeason: Maybe<CreateSeasonPayload>
    createUser: Maybe<CreateUserPayload>
    deleteDivision: Maybe<DeleteDivisionPayload>
    deleteOrganization: Maybe<DeleteOrganizationPayload>
    deletePosition: Maybe<DeletePositionPayload>
    joinOrganization: Maybe<JoinOrganizationPayload>
    leaveOrganization: Maybe<LeaveOrganizationPayload>
    removeSeasonParticipant: Maybe<RemoveSeasonParticipantPayload>
    sendSignInLink: Maybe<SendSignInLinkPayload>
    unassignGameListing: UnassignGameListingPayload
    updateDivision: Maybe<UpdateDivisionPayload>
    updateOrganization: UpdateOrganizationPayload
    updatePosition: Maybe<UpdatePositionPayload>
    updatePositionVisibility: Maybe<UpdatePositionVisibilityPayload>
    updateSeason: Maybe<UpdateSeasonPayload>
    updateUser: Maybe<UpdateUserPayload>
    uploadOrganizationLogo: UploadOrganizationLogoPayload
}

export type MutationAddSeasonParticipantsArgs = {
    input: AddSeasonParticipantsInput
}

export type MutationAssignGameListingArgs = {
    input: AssignGameListingInput
}

export type MutationCreateDivisionArgs = {
    input: CreateDivisionInput
}

export type MutationCreateGameArgs = {
    input: CreateGameInput
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

export type MutationUnassignGameListingArgs = {
    input: UnassignGameListingInput
}

export type MutationUpdateDivisionArgs = {
    input: UpdateDivisionInput
}

export type MutationUpdateOrganizationArgs = {
    input: UpdateOrganizationInput
}

export type MutationUpdatePositionArgs = {
    input: UpdatePositionInput
}

export type MutationUpdatePositionVisibilityArgs = {
    input: UpdatePositionVisibilityInput
}

export type MutationUpdateSeasonArgs = {
    input: UpdateSeasonInput
}

export type MutationUpdateUserArgs = {
    input: UpdateUserInput
}

export type MutationUploadOrganizationLogoArgs = {
    input: UploadOrganizationLogoInput
}

export type Node = {
    dateCreated: Scalars['DateTime']
    dateUpdated: Scalars['DateTime']
    id: Scalars['ID']
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

/** Information about pagination in a connection. */
export type PageInfo = {
    __typename?: 'PageInfo'
    /** When paginating forwards, the cursor to continue. */
    endCursor: Maybe<Scalars['String']>
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']
    /** When paginating backwards, the cursor to continue. */
    startCursor: Maybe<Scalars['String']>
}

export type Position = {
    __typename?: 'Position'
    dateCreated: Scalars['DateTime']
    dateUpdated: Scalars['DateTime']
    division: Division
    id: Scalars['ID']
    name: Scalars['String']
}

export type PositionVisibility = {
    __typename?: 'PositionVisibility'
    position: Position
    visible: Scalars['Boolean']
}

export type Query = {
    __typename?: 'Query'
    _empty: Maybe<Scalars['String']>
    division: Maybe<Division>
    game: Maybe<Game>
    gameListing: Maybe<GameListing>
    organization: Maybe<Organization>
    position: Maybe<Position>
    season: Season
    viewer: Maybe<User>
}

export type QueryDivisionArgs = {
    id: Scalars['ID']
}

export type QueryGameArgs = {
    id: Scalars['ID']
}

export type QueryGameListingArgs = {
    id: Scalars['ID']
}

export type QueryOrganizationArgs = {
    id: Scalars['ID']
}

export type QueryPositionArgs = {
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
    /** A list of divisions owned by the season */
    divisions: Array<Division>
    endDate: Scalars['DateTime']
    /** A list of games managed by the season */
    games: Array<Game>
    id: Scalars['ID']
    name: Scalars['String']
    /** The organization that owns the season */
    organization: Organization
    participant: SeasonParticipantEdge
    /** A list of users participating in the season */
    participants: Array<SeasonParticipantEdge>
    viewerCanCreateGame: Maybe<Scalars['Boolean']>
}

export type SeasonParticipantArgs = {
    userId: Scalars['ID']
}

export type SeasonGameConnection = Connection & {
    __typename?: 'SeasonGameConnection'
    edges: Maybe<Array<SeasonGameEdge>>
    nodes: Maybe<Array<Game>>
    pageInfo: PageInfo
    totalCount: Scalars['Int']
}

export type SeasonGameEdge = {
    __typename?: 'SeasonGameEdge'
    cursor: Scalars['String']
    node: Maybe<Game>
}

export type SeasonParticipantEdge = {
    __typename?: 'SeasonParticipantEdge'
    /** The user participating in the season */
    node: User
    /** The permit of the user participating in the season */
    permit: SeasonParticipationPermit
    /**
     * false:
     *     - read all permit fields except visibility
     *     - read user name, email, phone number
     *
     * true: can read all user and permit details
     */
    viewerCanReadSensitiveDetails: Maybe<Scalars['Boolean']>
    viewerCanUpdateVisibility: Maybe<Scalars['Boolean']>
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
    /** Lists the participants position visibility for each position in the season */
    visibility: Array<PositionVisibility>
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

export type UnassignGameListingInput = {
    gameListingId: Scalars['ID']
}

export type UnassignGameListingPayload = {
    __typename?: 'UnassignGameListingPayload'
    success: Scalars['Boolean']
}

export type UpdateDivisionInput = {
    divisionId: Scalars['ID']
    name: Scalars['String']
}

export type UpdateDivisionPayload = {
    __typename?: 'UpdateDivisionPayload'
    division: Maybe<Division>
    errors: Array<InputError>
    success: Scalars['Boolean']
}

export type UpdateOrganizationInput = {
    description: InputMaybe<Scalars['String']>
    email: InputMaybe<Scalars['String']>
    id: Scalars['ID']
    name: Scalars['String']
    websiteUrl: InputMaybe<Scalars['String']>
}

export type UpdateOrganizationPayload = {
    __typename?: 'UpdateOrganizationPayload'
    errors: Array<InputError>
    organization: Organization
    success: Scalars['Boolean']
}

export type UpdatePositionInput = {
    name: Scalars['String']
    positionId: Scalars['ID']
}

export type UpdatePositionPayload = {
    __typename?: 'UpdatePositionPayload'
    errors: Array<InputError>
    position: Maybe<Position>
}

export type UpdatePositionVisibilityInput = {
    positionId: Scalars['ID']
    userId: Scalars['ID']
    visibile: Scalars['Boolean']
}

export type UpdatePositionVisibilityPayload = {
    __typename?: 'UpdatePositionVisibilityPayload'
    success: Scalars['Boolean']
}

export type UpdateSeasonInput = {
    endDate: InputMaybe<Scalars['String']>
    name: InputMaybe<Scalars['String']>
    seasonId: Scalars['ID']
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
    phoneNumber: InputMaybe<Scalars['String']>
    profilePictureB64: InputMaybe<Scalars['String']>
    state: InputMaybe<Scalars['String']>
    streetAddress: InputMaybe<Scalars['String']>
    userId: Scalars['ID']
    zipCode: InputMaybe<Scalars['String']>
}

export type UpdateUserPayload = {
    __typename?: 'UpdateUserPayload'
    errors: Array<InputError>
    user: Maybe<User>
}

export type UploadOrganizationLogoInput = {
    id: Scalars['ID']
    logoB64: Scalars['String']
}

export type UploadOrganizationLogoPayload = {
    __typename?: 'UploadOrganizationLogoPayload'
    success: Scalars['Boolean']
}

export type User = {
    __typename?: 'User'
    assignedListings: Array<GameListing>
    city: Maybe<Scalars['String']>
    dateCreated: Scalars['DateTime']
    dateUpdated: Scalars['DateTime']
    email: Scalars['String']
    firstName: Scalars['String']
    fullAddress: Maybe<Scalars['String']>
    id: Scalars['ID']
    lastName: Scalars['String']
    /** Games with openings for the viewer */
    openGames: Array<Game>
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
    zipCode: Maybe<Scalars['String']>
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

export type AuthSignInSendEmailLinkMutationVariables = Exact<{
    input: SendSignInLinkInput
}>

export type AuthSignInSendEmailLinkMutation = {
    __typename?: 'Mutation'
    sendSignInLink: {
        __typename?: 'SendSignInLinkPayload'
        errors: Array<{ __typename?: 'InputError'; key: string; message: string }>
    } | null
}

export type DivisionCreateMutationVariables = Exact<{
    input: CreateDivisionInput
}>

export type DivisionCreateMutation = {
    __typename?: 'Mutation'
    createDivision: {
        __typename?: 'CreateDivisionPayload'
        errors: Array<{ __typename?: 'InputError'; key: string; message: string }>
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
        errors: Array<{ __typename?: 'InputError'; key: string; message: string }>
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
    deleteOrganization: { __typename?: 'DeleteOrganizationPayload'; success: boolean } | null
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
        errors: Array<{ __typename?: 'InputError'; key: string; message: string }>
    }
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
    organization: { __typename?: 'Organization'; id: string; name: string } | null
}

export type OrgMemberInviteModal_OrganizationFragment = { __typename?: 'Organization'; id: string }

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
        errors: Array<{ __typename?: 'InputError'; key: string; message: string }>
    } | null
}

export type OrgSeasonListItem_SeasonFragment = {
    __typename?: 'Season'
    id: string
    name: string
    endDate: Date
}

export type PositionCreateMutationVariables = Exact<{
    input: CreatePositionInput
}>

export type PositionCreateMutation = {
    __typename?: 'Mutation'
    createPosition: {
        __typename?: 'CreatePositionPayload'
        errors: Array<{ __typename?: 'InputError'; key: string; message: string }>
    } | null
}

export type SeasonEditAboutMutationVariables = Exact<{
    input: UpdateSeasonInput
}>

export type SeasonEditAboutMutation = {
    __typename?: 'Mutation'
    updateSeason: {
        __typename?: 'UpdateSeasonPayload'
        season: { __typename?: 'Season'; id: string; endDate: Date } | null
        errors: Array<{ __typename?: 'InputError'; key: string; message: string }>
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

export type SesaonNavigateHeaderQueryVariables = Exact<{
    seasonId: Scalars['ID']
}>

export type SesaonNavigateHeaderQuery = {
    __typename?: 'Query'
    season: { __typename?: 'Season'; id: string; name: string }
}

export type SeasonSettingsAboutCard_SeasonFragment = {
    __typename?: 'Season'
    id: string
    name: string
    endDate: Date
}

export type SeasonSettingsViewerRolesItemGroup_UserParticipatingSeasonEdgeFragment = {
    __typename?: 'UserParticipatingSeasonEdge'
    node: { __typename?: 'Season'; id: string }
    permit: { __typename?: 'SeasonParticipationPermit'; id: string; roles: Array<SeasonRoleType> }
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

export type SeasonGameCreateDivisionSelect_SeasonFragment = {
    __typename?: 'Season'
    divisions: Array<{ __typename?: 'Division'; id: string; name: string }>
}

export type UseSeasonGameCreateForm_SeasonFragment = {
    __typename?: 'Season'
    id: string
    divisions: Array<{ __typename?: 'Division'; id: string; name: string }>
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
    permit: { __typename?: 'SeasonParticipationPermit'; id: string; roles: Array<SeasonRoleType> }
}

export type SeasonParticipantRemoveButton_SeasonFragment = { __typename?: 'Season'; id: string }

export type SeasonParticipantRemoveButton_UserFragment = { __typename?: 'User'; id: string }

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

export type UserAvatar_UserFragment = {
    __typename?: 'User'
    id: string
    profilePictureUrl: string | null
}

export type UserAvatarInitials_UserFragment = {
    __typename?: 'User'
    id: string
    firstName: string
    lastName: string
}

export type UserAvatarNew_UserFragment = { __typename?: 'User'; profilePictureUrl: string | null }

export type UserTag_UserFragment = {
    __typename?: 'User'
    id: string
    firstName: string
    lastName: string
    profilePictureUrl: string | null
}

export type UserAccountBanner_UserFragment = {
    __typename?: 'User'
    id: string
    profilePictureUrl: string | null
    firstName: string
    lastName: string
}

export type RegisterUserMutationVariables = Exact<{
    input: CreateUserInput
}>

export type RegisterUserMutation = {
    __typename?: 'Mutation'
    createUser: {
        __typename?: 'CreateUserPayload'
        errors: Array<{ __typename?: 'InputError'; key: string; message: string }>
    } | null
}

export type UserAccountEditAvatar_UserFragment = {
    __typename?: 'User'
    id: string
    profilePictureUrl: string | null
}

export type UseUserAccountEditForm_UserFragment = {
    __typename?: 'User'
    id: string
    firstName: string
    lastName: string
    profilePictureUrl: string | null
    phoneNumber: string | null
    state: string | null
    city: string | null
    streetAddress: string | null
    zipCode: string | null
}

export type OrgJoinMutationVariables = Exact<{
    input: JoinOrganizationInput
}>

export type OrgJoinMutation = {
    __typename?: 'Mutation'
    joinOrganization: { __typename?: 'JoinOrganizationPayload'; success: boolean } | null
}

export type OrgLeaveMutationVariables = Exact<{
    input: LeaveOrganizationInput
}>

export type OrgLeaveMutation = {
    __typename?: 'Mutation'
    leaveOrganization: { __typename?: 'LeaveOrganizationPayload'; success: boolean } | null
}

export type UserJoinedOrgItem_OrganizationFragment = {
    __typename?: 'Organization'
    id: string
    name: string
    logoUrl: string | null
}

export type LeaveOrgButton_OrganizationFragment = { __typename?: 'Organization'; id: string }

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
    membership: { __typename?: 'OrganizationMembership'; id: string; role: OrganizationRoleType }
}

export type AssignGameListingMutationVariables = Exact<{
    input: AssignGameListingInput
}>

export type AssignGameListingMutation = {
    __typename?: 'Mutation'
    assignGameListing: { __typename?: 'AssignGameListingPayload'; success: boolean }
}

export type CreateGameMutationVariables = Exact<{
    input: CreateGameInput
}>

export type CreateGameMutation = {
    __typename?: 'Mutation'
    createGame: {
        __typename?: 'CreateGamePayload'
        game: { __typename?: 'Game'; id: string } | null
    }
}

export type LeaveOrganizationMutationVariables = Exact<{
    input: LeaveOrganizationInput
}>

export type LeaveOrganizationMutation = {
    __typename?: 'Mutation'
    leaveOrganization: {
        __typename?: 'LeaveOrganizationPayload'
        success: boolean
        organization: { __typename?: 'Organization'; id: string } | null
    } | null
}

export type UnassignGameListingMutationVariables = Exact<{
    input: UnassignGameListingInput
}>

export type UnassignGameListingMutation = {
    __typename?: 'Mutation'
    unassignGameListing: { __typename?: 'UnassignGameListingPayload'; success: boolean }
}

export type SeasonRoleQueryVariables = Exact<{
    seasonId: Scalars['ID']
}>

export type SeasonRoleQuery = {
    __typename?: 'Query'
    viewer: {
        __typename?: 'User'
        season: {
            __typename?: 'UserParticipatingSeasonEdge'
            permit: {
                __typename?: 'SeasonParticipationPermit'
                id: string
                roles: Array<SeasonRoleType>
            }
        } | null
    } | null
}

export type ViewerQueryVariables = Exact<{ [key: string]: never }>

export type ViewerQuery = {
    __typename?: 'Query'
    viewer: { __typename?: 'User'; id: string } | null
}

export type ViewerFragment = { __typename?: 'User'; id: string }

export type SeasonOrgRoleQueryVariables = Exact<{
    seasonId: Scalars['ID']
}>

export type SeasonOrgRoleQuery = {
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

export type AccountScreenQueryVariables = Exact<{ [key: string]: never }>

export type AccountScreenQuery = {
    __typename?: 'Query'
    viewer: {
        __typename?: 'User'
        id: string
        firstName: string
        lastName: string
        profilePictureUrl: string | null
        phoneNumber: string | null
        state: string | null
        city: string | null
        streetAddress: string | null
        zipCode: string | null
    } | null
}

export type UserAccountEditMutationVariables = Exact<{
    input: UpdateUserInput
}>

export type UserAccountEditMutation = {
    __typename?: 'Mutation'
    updateUser: {
        __typename?: 'UpdateUserPayload'
        errors: Array<{ __typename?: 'InputError'; key: string; message: string }>
    } | null
}

export type GameScreen_GameListingFragment = {
    __typename?: 'GameListing'
    id: string
    name: string
    canAssignSelf: boolean | null
    canChangeAssignee: boolean | null
    assignee: {
        __typename?: 'GameListingAssigneeEdge'
        node: {
            __typename?: 'User'
            id: string
            profilePictureUrl: string | null
            firstName: string
            lastName: string
        }
    } | null
}

export type GameScreen_GameFragment = {
    __typename?: 'Game'
    id: string
    name: string
    startTime: Date
    endTime: Date | null
    location: string | null
    listings: Array<{
        __typename?: 'GameListing'
        id: string
        name: string
        canAssignSelf: boolean | null
        canChangeAssignee: boolean | null
        assignee: {
            __typename?: 'GameListingAssigneeEdge'
            node: {
                __typename?: 'User'
                id: string
                profilePictureUrl: string | null
                firstName: string
                lastName: string
            }
        } | null
    }>
    division: {
        __typename?: 'Division'
        id: string
        name: string
        season: {
            __typename?: 'Season'
            id: string
            name: string
            organization: {
                __typename?: 'Organization'
                id: string
                name: string
                logoUrl: string | null
            }
        }
    }
}

export type GameScreenQueryVariables = Exact<{
    gameId: Scalars['ID']
}>

export type GameScreenQuery = {
    __typename?: 'Query'
    viewer: { __typename?: 'User'; id: string } | null
    game: {
        __typename?: 'Game'
        id: string
        name: string
        startTime: Date
        endTime: Date | null
        location: string | null
        listings: Array<{
            __typename?: 'GameListing'
            id: string
            name: string
            canAssignSelf: boolean | null
            canChangeAssignee: boolean | null
            assignee: {
                __typename?: 'GameListingAssigneeEdge'
                node: {
                    __typename?: 'User'
                    id: string
                    profilePictureUrl: string | null
                    firstName: string
                    lastName: string
                }
            } | null
        }>
        division: {
            __typename?: 'Division'
            id: string
            name: string
            season: {
                __typename?: 'Season'
                id: string
                name: string
                organization: {
                    __typename?: 'Organization'
                    id: string
                    name: string
                    logoUrl: string | null
                }
            }
        }
    } | null
}

export type GameListingAssigneeScreenQueryVariables = Exact<{
    gameListingId: Scalars['ID']
    name: Scalars['String']
}>

export type GameListingAssigneeScreenQuery = {
    __typename?: 'Query'
    gameListing: {
        __typename?: 'GameListing'
        id: string
        availableAssignees: Array<{
            __typename?: 'User'
            id: string
            firstName: string
            lastName: string
            profilePictureUrl: string | null
        }> | null
    } | null
}

export type GameListingAssignee_UserFragment = {
    __typename?: 'User'
    id: string
    firstName: string
    lastName: string
    profilePictureUrl: string | null
}

export type GameListingAssignee_GameListingFragment = {
    __typename?: 'GameListing'
    id: string
    availableAssignees: Array<{
        __typename?: 'User'
        id: string
        firstName: string
        lastName: string
        profilePictureUrl: string | null
    }> | null
}

export type GroupsOrganizationsScreenQueryVariables = Exact<{ [key: string]: never }>

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

export type MeScreenQueryVariables = Exact<{ [key: string]: never }>

export type MeScreenQuery = {
    __typename?: 'Query'
    viewer: {
        __typename?: 'User'
        id: string
        profilePictureUrl: string | null
        firstName: string
        lastName: string
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
    membership: { __typename?: 'OrganizationMembership'; id: string; role: OrganizationRoleType }
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

export type OrganizationSeasonsScreen_SeasonFragment = {
    __typename?: 'Season'
    id: string
    name: string
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
        seasons: Array<{ __typename?: 'Season'; id: string; name: string; endDate: Date }>
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

export type SeasonGameNewScreenQueryVariables = Exact<{
    seasonId: Scalars['ID']
}>

export type SeasonGameNewScreenQuery = {
    __typename?: 'Query'
    season: {
        __typename?: 'Season'
        id: string
        divisions: Array<{ __typename?: 'Division'; id: string; name: string }>
    }
}

export type GameCreateMutationVariables = Exact<{
    input: CreateGameInput
}>

export type GameCreateMutation = {
    __typename?: 'Mutation'
    createGame: {
        __typename?: 'CreateGamePayload'
        errors: Array<{ __typename?: 'InputError'; key: string; message: string }>
        game: { __typename?: 'Game'; id: string } | null
    }
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
    }
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
    }
}

export type SeasonAboutEditScreen_SeasonFragment = {
    __typename?: 'Season'
    id: string
    name: string
    endDate: Date
}

export type SeasonAboutEditScreenQueryVariables = Exact<{
    seasonId: Scalars['ID']
}>

export type SeasonAboutEditScreenQuery = {
    __typename?: 'Query'
    season: { __typename?: 'Season'; id: string; name: string; endDate: Date }
}

export type SettingsScreenQueryVariables = Exact<{
    seasonId: Scalars['ID']
}>

export type SettingsScreenQuery = {
    __typename?: 'Query'
    season: { __typename?: 'Season'; id: string; name: string; endDate: Date }
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
            positions: Array<{ __typename?: 'Position'; id: string; name: string }>
        }>
    }
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
export const SeasonSettingsAboutCard_SeasonFragmentDoc = gql`
    fragment SeasonSettingsAboutCard_Season on Season {
        id
        name
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
export const SeasonGameCreateDivisionSelect_SeasonFragmentDoc = gql`
    fragment SeasonGameCreateDivisionSelect_Season on Season {
        divisions {
            id
            name
        }
    }
`
export const UseSeasonGameCreateForm_SeasonFragmentDoc = gql`
    fragment UseSeasonGameCreateForm_Season on Season {
        id
        ...SeasonGameCreateDivisionSelect_Season
    }
    ${SeasonGameCreateDivisionSelect_SeasonFragmentDoc}
`
export const SeasonParticipantItemName_UserFragmentDoc = gql`
    fragment SeasonParticipantItemName_User on User {
        id
        firstName
        lastName
    }
`
export const UserAvatar_UserFragmentDoc = gql`
    fragment UserAvatar_User on User {
        id
        profilePictureUrl
    }
`
export const SeasonParticipantItemPressable_UserFragmentDoc = gql`
    fragment SeasonParticipantItemPressable_User on User {
        id
        ...UserAvatar_User
    }
    ${UserAvatar_UserFragmentDoc}
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
export const UserAvatarNew_UserFragmentDoc = gql`
    fragment UserAvatarNew_User on User {
        profilePictureUrl
    }
`
export const UserTag_UserFragmentDoc = gql`
    fragment UserTag_User on User {
        id
        firstName
        lastName
        ...UserAvatarNew_User
    }
    ${UserAvatarNew_UserFragmentDoc}
`
export const UserAvatarInitials_UserFragmentDoc = gql`
    fragment UserAvatarInitials_User on User {
        id
        firstName
        lastName
    }
`
export const UserAccountBanner_UserFragmentDoc = gql`
    fragment UserAccountBanner_User on User {
        id
        ...UserAvatar_User
        ...UserAvatarInitials_User
    }
    ${UserAvatar_UserFragmentDoc}
    ${UserAvatarInitials_UserFragmentDoc}
`
export const UserAccountEditAvatar_UserFragmentDoc = gql`
    fragment UserAccountEditAvatar_User on User {
        id
        profilePictureUrl
    }
`
export const UseUserAccountEditForm_UserFragmentDoc = gql`
    fragment UseUserAccountEditForm_User on User {
        id
        firstName
        lastName
        profilePictureUrl
        phoneNumber
        state
        city
        streetAddress
        zipCode
    }
`
export const UserJoinedOrgItem_OrganizationFragmentDoc = gql`
    fragment UserJoinedOrgItem_Organization on Organization {
        id
        name
        logoUrl
    }
`
export const LeaveOrgButton_OrganizationFragmentDoc = gql`
    fragment LeaveOrgButton_Organization on Organization {
        id
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
export const ViewerFragmentDoc = gql`
    fragment Viewer on User {
        id
    }
`
export const GameScreen_GameListingFragmentDoc = gql`
    fragment GameScreen_GameListing on GameListing {
        id
        name
        assignee {
            node {
                id
                profilePictureUrl
                firstName
                lastName
            }
        }
        canAssignSelf
        canChangeAssignee
    }
`
export const GameScreen_GameFragmentDoc = gql`
    fragment GameScreen_Game on Game {
        id
        name
        startTime
        endTime
        location
        listings {
            id
            ...GameScreen_GameListing
        }
        division {
            id
            name
            season {
                id
                name
                organization {
                    id
                    name
                    logoUrl
                }
            }
        }
    }
    ${GameScreen_GameListingFragmentDoc}
`
export const GameListingAssignee_UserFragmentDoc = gql`
    fragment GameListingAssignee_User on User {
        id
        firstName
        lastName
        ...UserAvatar_User
    }
    ${UserAvatar_UserFragmentDoc}
`
export const GameListingAssignee_GameListingFragmentDoc = gql`
    fragment GameListingAssignee_GameListing on GameListing {
        id
        availableAssignees(name: $name) {
            id
            ...GameListingAssignee_User
        }
    }
    ${GameListingAssignee_UserFragmentDoc}
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
        ...UserAvatar_User
    }
    ${UserAvatar_UserFragmentDoc}
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
export const OrgSeasonListItem_SeasonFragmentDoc = gql`
    fragment OrgSeasonListItem_Season on Season {
        id
        name
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
    return Urql.useMutation<DivisionCreateMutation, DivisionCreateMutationVariables>(
        DivisionCreateDocument
    )
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
    return Urql.useMutation<DivisionDeleteMutation, DivisionDeleteMutationVariables>(
        DivisionDeleteDocument
    )
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
    return Urql.useMutation<OrgCreateMutation, OrgCreateMutationVariables>(OrgCreateDocument)
}
export const OrgDeleteDocument = gql`
    mutation OrgDelete($input: DeleteOrganizationInput!) {
        deleteOrganization(input: $input) {
            success
        }
    }
`

export function useOrgDeleteMutation() {
    return Urql.useMutation<OrgDeleteMutation, OrgDeleteMutationVariables>(OrgDeleteDocument)
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
    return Urql.useMutation<OrgEditMutation, OrgEditMutationVariables>(OrgEditDocument)
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
    options: Omit<Urql.UseQueryArgs<OrgSettingsScreenQueryVariables>, 'query'>
) {
    return Urql.useQuery<OrgSettingsScreenQuery>({ query: OrgSettingsScreenDocument, ...options })
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
    return Urql.useMutation<SeasonCreateMutation, SeasonCreateMutationVariables>(
        SeasonCreateDocument
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
    return Urql.useMutation<PositionCreateMutation, PositionCreateMutationVariables>(
        PositionCreateDocument
    )
}
export const SeasonEditAboutDocument = gql`
    mutation SeasonEditAbout($input: UpdateSeasonInput!) {
        updateSeason(input: $input) {
            season {
                id
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
    return Urql.useMutation<SeasonEditAboutMutation, SeasonEditAboutMutationVariables>(
        SeasonEditAboutDocument
    )
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
    return Urql.useMutation<DeleteDivisionMutation, DeleteDivisionMutationVariables>(
        DeleteDivisionDocument
    )
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
    return Urql.useMutation<DeletePositionMutation, DeletePositionMutationVariables>(
        DeletePositionDocument
    )
}
export const SesaonNavigateHeaderDocument = gql`
    query SesaonNavigateHeader($seasonId: ID!) {
        season(id: $seasonId) {
            id
            name
        }
    }
`

export function useSesaonNavigateHeaderQuery(
    options: Omit<Urql.UseQueryArgs<SesaonNavigateHeaderQueryVariables>, 'query'>
) {
    return Urql.useQuery<SesaonNavigateHeaderQuery>({
        query: SesaonNavigateHeaderDocument,
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
    options: Omit<Urql.UseQueryArgs<SeasonViewerOrgRoleQueryVariables>, 'query'>
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
    return Urql.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(
        RegisterUserDocument
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
    return Urql.useMutation<OrgJoinMutation, OrgJoinMutationVariables>(OrgJoinDocument)
}
export const OrgLeaveDocument = gql`
    mutation OrgLeave($input: LeaveOrganizationInput!) {
        leaveOrganization(input: $input) {
            success
        }
    }
`

export function useOrgLeaveMutation() {
    return Urql.useMutation<OrgLeaveMutation, OrgLeaveMutationVariables>(OrgLeaveDocument)
}
export const AssignGameListingDocument = gql`
    mutation AssignGameListing($input: AssignGameListingInput!) {
        assignGameListing(input: $input) {
            success
        }
    }
`

export function useAssignGameListingMutation() {
    return Urql.useMutation<AssignGameListingMutation, AssignGameListingMutationVariables>(
        AssignGameListingDocument
    )
}
export const CreateGameDocument = gql`
    mutation CreateGame($input: CreateGameInput!) {
        createGame(input: $input) {
            game {
                id
            }
        }
    }
`

export function useCreateGameMutation() {
    return Urql.useMutation<CreateGameMutation, CreateGameMutationVariables>(CreateGameDocument)
}
export const LeaveOrganizationDocument = gql`
    mutation LeaveOrganization($input: LeaveOrganizationInput!) {
        leaveOrganization(input: $input) {
            success
            organization {
                id
            }
        }
    }
`

export function useLeaveOrganizationMutation() {
    return Urql.useMutation<LeaveOrganizationMutation, LeaveOrganizationMutationVariables>(
        LeaveOrganizationDocument
    )
}
export const UnassignGameListingDocument = gql`
    mutation UnassignGameListing($input: UnassignGameListingInput!) {
        unassignGameListing(input: $input) {
            success
        }
    }
`

export function useUnassignGameListingMutation() {
    return Urql.useMutation<UnassignGameListingMutation, UnassignGameListingMutationVariables>(
        UnassignGameListingDocument
    )
}
export const SeasonRoleDocument = gql`
    query SeasonRole($seasonId: ID!) {
        viewer {
            season(id: $seasonId) {
                permit {
                    id
                    roles
                }
            }
        }
    }
`

export function useSeasonRoleQuery(
    options: Omit<Urql.UseQueryArgs<SeasonRoleQueryVariables>, 'query'>
) {
    return Urql.useQuery<SeasonRoleQuery>({ query: SeasonRoleDocument, ...options })
}
export const ViewerDocument = gql`
    query Viewer {
        viewer {
            id
            ...Viewer
        }
    }
    ${ViewerFragmentDoc}
`

export function useViewerQuery(options?: Omit<Urql.UseQueryArgs<ViewerQueryVariables>, 'query'>) {
    return Urql.useQuery<ViewerQuery>({ query: ViewerDocument, ...options })
}
export const SeasonOrgRoleDocument = gql`
    query SeasonOrgRole($seasonId: ID!) {
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

export function useSeasonOrgRoleQuery(
    options: Omit<Urql.UseQueryArgs<SeasonOrgRoleQueryVariables>, 'query'>
) {
    return Urql.useQuery<SeasonOrgRoleQuery>({ query: SeasonOrgRoleDocument, ...options })
}
export const AccountScreenDocument = gql`
    query AccountScreen {
        viewer {
            id
            ...UseUserAccountEditForm_User
        }
    }
    ${UseUserAccountEditForm_UserFragmentDoc}
`

export function useAccountScreenQuery(
    options?: Omit<Urql.UseQueryArgs<AccountScreenQueryVariables>, 'query'>
) {
    return Urql.useQuery<AccountScreenQuery>({ query: AccountScreenDocument, ...options })
}
export const UserAccountEditDocument = gql`
    mutation UserAccountEdit($input: UpdateUserInput!) {
        updateUser(input: $input) {
            errors {
                key
                message
            }
        }
    }
`

export function useUserAccountEditMutation() {
    return Urql.useMutation<UserAccountEditMutation, UserAccountEditMutationVariables>(
        UserAccountEditDocument
    )
}
export const GameScreenDocument = gql`
    query GameScreen($gameId: ID!) {
        viewer {
            id
        }
        game(id: $gameId) {
            id
            ...GameScreen_Game
        }
    }
    ${GameScreen_GameFragmentDoc}
`

export function useGameScreenQuery(
    options: Omit<Urql.UseQueryArgs<GameScreenQueryVariables>, 'query'>
) {
    return Urql.useQuery<GameScreenQuery>({ query: GameScreenDocument, ...options })
}
export const GameListingAssigneeScreenDocument = gql`
    query GameListingAssigneeScreen($gameListingId: ID!, $name: String!) {
        gameListing(id: $gameListingId) {
            id
            ...GameListingAssignee_GameListing
        }
    }
    ${GameListingAssignee_GameListingFragmentDoc}
`

export function useGameListingAssigneeScreenQuery(
    options: Omit<Urql.UseQueryArgs<GameListingAssigneeScreenQueryVariables>, 'query'>
) {
    return Urql.useQuery<GameListingAssigneeScreenQuery>({
        query: GameListingAssigneeScreenDocument,
        ...options
    })
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
    options?: Omit<Urql.UseQueryArgs<GroupsOrganizationsScreenQueryVariables>, 'query'>
) {
    return Urql.useQuery<GroupsOrganizationsScreenQuery>({
        query: GroupsOrganizationsScreenDocument,
        ...options
    })
}
export const MeScreenDocument = gql`
    query MeScreen {
        viewer {
            id
            ...UserAccountBanner_User
        }
    }
    ${UserAccountBanner_UserFragmentDoc}
`

export function useMeScreenQuery(
    options?: Omit<Urql.UseQueryArgs<MeScreenQueryVariables>, 'query'>
) {
    return Urql.useQuery<MeScreenQuery>({ query: MeScreenDocument, ...options })
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
    options: Omit<Urql.UseQueryArgs<OrganizationMembersScreenRightHeaderQueryVariables>, 'query'>
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
    options: Omit<Urql.UseQueryArgs<OrganizationMembersScreenQueryVariables>, 'query'>
) {
    return Urql.useQuery<OrganizationMembersScreenQuery>({
        query: OrganizationMembersScreenDocument,
        ...options
    })
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
    options: Omit<Urql.UseQueryArgs<OrganizationSeasonsScreenQueryVariables>, 'query'>
) {
    return Urql.useQuery<OrganizationSeasonsScreenQuery>({
        query: OrganizationSeasonsScreenDocument,
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
    options: Omit<Urql.UseQueryArgs<OrganizationSettingsProfileScreenQueryVariables>, 'query'>
) {
    return Urql.useQuery<OrganizationSettingsProfileScreenQuery>({
        query: OrganizationSettingsProfileScreenDocument,
        ...options
    })
}
export const SeasonGameNewScreenDocument = gql`
    query SeasonGameNewScreen($seasonId: ID!) {
        season(id: $seasonId) {
            id
            ...SeasonGameCreateDivisionSelect_Season
        }
    }
    ${SeasonGameCreateDivisionSelect_SeasonFragmentDoc}
`

export function useSeasonGameNewScreenQuery(
    options: Omit<Urql.UseQueryArgs<SeasonGameNewScreenQueryVariables>, 'query'>
) {
    return Urql.useQuery<SeasonGameNewScreenQuery>({
        query: SeasonGameNewScreenDocument,
        ...options
    })
}
export const GameCreateDocument = gql`
    mutation GameCreate($input: CreateGameInput!) {
        createGame(input: $input) {
            errors {
                key
                message
            }
            game {
                id
            }
        }
    }
`

export function useGameCreateMutation() {
    return Urql.useMutation<GameCreateMutation, GameCreateMutationVariables>(GameCreateDocument)
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
    options: Omit<Urql.UseQueryArgs<SeasonParticipantsScreenQueryVariables>, 'query'>
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
    options: Omit<Urql.UseQueryArgs<SeasonParticipantsAddScreenQueryVariables>, 'query'>
) {
    return Urql.useQuery<SeasonParticipantsAddScreenQuery>({
        query: SeasonParticipantsAddScreenDocument,
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
    options: Omit<Urql.UseQueryArgs<SeasonAboutEditScreenQueryVariables>, 'query'>
) {
    return Urql.useQuery<SeasonAboutEditScreenQuery>({
        query: SeasonAboutEditScreenDocument,
        ...options
    })
}
export const SettingsScreenDocument = gql`
    query SettingsScreen($seasonId: ID!) {
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

export function useSettingsScreenQuery(
    options: Omit<Urql.UseQueryArgs<SettingsScreenQueryVariables>, 'query'>
) {
    return Urql.useQuery<SettingsScreenQuery>({ query: SettingsScreenDocument, ...options })
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
    options: Omit<Urql.UseQueryArgs<SeasonStructureScreenQueryVariables>, 'query'>
) {
    return Urql.useQuery<SeasonStructureScreenQuery>({
        query: SeasonStructureScreenDocument,
        ...options
    })
}
