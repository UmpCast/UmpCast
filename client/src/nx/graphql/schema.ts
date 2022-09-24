export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
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
    viewerAssignedListing: Maybe<GameListing>
    viewerOpenListingsCount: Scalars['Int']
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
    createGame: Maybe<CreateGamePayload>
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
    updateOrganization: Maybe<UpdateOrganizationPayload>
    updatePosition: Maybe<UpdatePositionPayload>
    updatePositionVisibility: Maybe<UpdatePositionVisibilityPayload>
    updateSeason: Maybe<UpdateSeasonPayload>
    updateUser: Maybe<UpdateUserPayload>
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
    season: Maybe<Season>
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
    name: Scalars['String']
    seasonId: Scalars['ID']
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
    logoB64: InputMaybe<Scalars['String']>
    name: InputMaybe<Scalars['String']>
    organizationId: Scalars['ID']
    websiteUrl: InputMaybe<Scalars['String']>
}

export type UpdateOrganizationPayload = {
    __typename?: 'UpdateOrganizationPayload'
    errors: Array<InputError>
    organization: Maybe<Organization>
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

export type User = {
    __typename?: 'User'
    assignedListings: Array<GameListing>
    city: Maybe<Scalars['String']>
    dateCreated: Scalars['DateTime']
    dateUpdated: Scalars['DateTime']
    email: Scalars['String']
    firstName: Scalars['String']
    fullAddress: Maybe<Scalars['String']>
    /**
     * Lists games from seasons the viewer is participating in
     * assignable: filter games with at least one listing assignable to the viewer
     */
    games: Maybe<Array<Game>>
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
    zipCode: Maybe<Scalars['String']>
}

export type UserGamesArgs = {
    assignable: InputMaybe<Scalars['Boolean']>
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
