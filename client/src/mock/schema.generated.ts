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

export type AssignGameListingInput = {
    gameListingId: Scalars['ID']
    userId: Scalars['ID']
}

export type AssignGameListingPayload = {
    __typename?: 'AssignGameListingPayload'
    gameListing?: Maybe<GameListing>
    success: Scalars['Boolean']
}

export type CreateDivisionInput = {
    name: Scalars['String']
    seasonId: Scalars['ID']
}

export type CreateDivisionPayload = {
    __typename?: 'CreateDivisionPayload'
    division: Division
    errors: Array<InputError>
    success: Scalars['Boolean']
}

export type CreateGameInput = {
    divisionId: Scalars['ID']
    endTime?: InputMaybe<Scalars['DateTime']>
    location?: InputMaybe<Scalars['String']>
    name: Scalars['String']
    startTime: Scalars['DateTime']
}

export type CreateGamePayload = {
    __typename?: 'CreateGamePayload'
    errors: Array<InputError>
    game?: Maybe<Game>
    success: Scalars['Boolean']
}

export type CreateOrganizationInput = {
    description?: InputMaybe<Scalars['String']>
    email?: InputMaybe<Scalars['String']>
    logoB64?: InputMaybe<Scalars['String']>
    name: Scalars['String']
    websiteUrl?: InputMaybe<Scalars['String']>
}

export type CreateOrganizationPayload = {
    __typename?: 'CreateOrganizationPayload'
    errors: Array<InputError>
    organization: Organization
    success: Scalars['Boolean']
}

export type CreatePositionInput = {
    divisionId: Scalars['ID']
    name: Scalars['String']
}

export type CreatePositionPayload = {
    __typename?: 'CreatePositionPayload'
    errors: Array<InputError>
    position?: Maybe<Position>
}

export type CreateSeasonInput = {
    endDate: Scalars['DateTime']
    name: Scalars['String']
    organizationId: Scalars['ID']
}

export type CreateSeasonPayload = {
    __typename?: 'CreateSeasonPayload'
    errors: Array<InputError>
    season: Season
    success: Scalars['Boolean']
}

export type CreateUserInput = {
    firstName: Scalars['String']
    lastName: Scalars['String']
    phoneNumber?: InputMaybe<Scalars['String']>
}

export type CreateUserPayload = {
    __typename?: 'CreateUserPayload'
    errors: Array<InputError>
    user?: Maybe<User>
}

export type DeleteDivisionInput = {
    divisionId: Scalars['ID']
}

export type DeleteDivisionPayload = {
    __typename?: 'DeleteDivisionPayload'
    division: Division
    success: Scalars['Boolean']
}

export type DeleteOrganizationInput = {
    organizationId: Scalars['ID']
}

export type DeleteOrganizationPayload = {
    __typename?: 'DeleteOrganizationPayload'
    organization?: Maybe<Organization>
    success: Scalars['Boolean']
}

export type DeletePositionInput = {
    positionId: Scalars['ID']
}

export type DeletePositionPayload = {
    __typename?: 'DeletePositionPayload'
    position?: Maybe<Position>
    success?: Maybe<Scalars['Boolean']>
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
    endTime?: Maybe<Scalars['DateTime']>
    id: Scalars['ID']
    listings: Array<GameListing>
    location?: Maybe<Scalars['String']>
    name: Scalars['String']
    startTime: Scalars['DateTime']
}

export type GameListing = {
    __typename?: 'GameListing'
    assignee?: Maybe<SeasonParticipant>
    availableAssignees: Array<User>
    canAssignSelf?: Maybe<Scalars['Boolean']>
    canChangeAssignee?: Maybe<Scalars['Boolean']>
    game: Game
    id: Scalars['ID']
    name: Scalars['String']
    position?: Maybe<Position>
}

export type GameListingAvailableAssigneesArgs = {
    name?: InputMaybe<Scalars['String']>
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
    organization?: Maybe<Organization>
    success: Scalars['Boolean']
}

export type LeaveOrganizationInput = {
    organizationId: Scalars['ID']
}

export type LeaveOrganizationPayload = {
    __typename?: 'LeaveOrganizationPayload'
    organization?: Maybe<Organization>
    success: Scalars['Boolean']
}

export type Mutation = {
    __typename?: 'Mutation'
    _empty?: Maybe<Scalars['String']>
    assignGameListing: AssignGameListingPayload
    createDivision: CreateDivisionPayload
    createGame: CreateGamePayload
    createOrganization: CreateOrganizationPayload
    createPosition: CreatePositionPayload
    createSeason: CreateSeasonPayload
    createUser?: Maybe<CreateUserPayload>
    deleteDivision: DeleteDivisionPayload
    deleteOrganization?: Maybe<DeleteOrganizationPayload>
    deletePosition: DeletePositionPayload
    joinOrganization?: Maybe<JoinOrganizationPayload>
    leaveOrganization?: Maybe<LeaveOrganizationPayload>
    removeSeasonParticipant: RemoveSeasonParticipantPayload
    sendSignInLink?: Maybe<SendSignInLinkPayload>
    unassignGameListing: UnassignGameListingPayload
    updateDivision: UpdateDivisionPayload
    updateOrganization: UpdateOrganizationPayload
    updatePosition: UpdatePositionPayload
    updateSeason: UpdateSeasonPayload
    updateSeasonParticipantPermit: UpdateSeasonParticipantPermitPayload
    updateUser?: Maybe<UpdateUserPayload>
    uploadOrganizationLogo: UploadOrganizationLogoPayload
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

export type MutationUpdateSeasonArgs = {
    input: UpdateSeasonInput
}

export type MutationUpdateSeasonParticipantPermitArgs = {
    input: UpdateSeasonParticipantPermitInput
}

export type MutationUpdateUserArgs = {
    input: UpdateUserInput
}

export type MutationUploadOrganizationLogoArgs = {
    input: UploadOrganizationLogoInput
}

export type Organization = {
    __typename?: 'Organization'
    dateCreated: Scalars['DateTime']
    dateUpdated: Scalars['DateTime']
    description?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    id: Scalars['ID']
    logoUrl?: Maybe<Scalars['String']>
    members: Array<OrganizationMember>
    name: Scalars['String']
    seasons: Array<Season>
    viewerMemberRole?: Maybe<OrganizationMemberRoleType>
    websiteUrl?: Maybe<Scalars['String']>
}

export type OrganizationMember = {
    __typename?: 'OrganizationMember'
    membership: OrganizationMembership
    user: User
}

export enum OrganizationMemberRoleType {
    Member = 'MEMBER',
    Owner = 'OWNER'
}

export type OrganizationMembership = {
    __typename?: 'OrganizationMembership'
    role: OrganizationMemberRoleType
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
    _empty?: Maybe<Scalars['String']>
    division: Division
    game?: Maybe<Game>
    gameListing: GameListing
    organization: Organization
    position?: Maybe<Position>
    season: Season
    viewer: User
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
    success?: Maybe<Scalars['Boolean']>
}

export type Season = {
    __typename?: 'Season'
    cancellationWindow: Scalars['Int']
    divisions: Array<Division>
    endDate: Scalars['DateTime']
    games: Array<Game>
    id: Scalars['ID']
    name: Scalars['String']
    organization: Organization
    participant: SeasonParticipant
    participantCount: Scalars['Int']
    participants: Array<SeasonParticipant>
    viewerCanUpdate: Scalars['Boolean']
    viewerParticipantRole?: Maybe<SeasonParticipantRoleType>
}

export type SeasonParticipantArgs = {
    userId: Scalars['ID']
}

export type SeasonParticipant = {
    __typename?: 'SeasonParticipant'
    membership: OrganizationMembership
    permit: SeasonParticipantPermit
    user: User
    viewerCanRemove: Scalars['Boolean']
    viewerCanSeeSensitive: Scalars['Boolean']
    viewerCanUpdatePermit: Scalars['Boolean']
}

export type SeasonParticipantPermit = {
    __typename?: 'SeasonParticipantPermit'
    maxConcurrentAssignment: Scalars['Int']
    role: SeasonParticipantRoleType
    visibility: Array<PositionVisibility>
}

export enum SeasonParticipantRoleType {
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
    division?: Maybe<Division>
    errors: Array<InputError>
    success: Scalars['Boolean']
}

export type UpdateOrganizationInput = {
    description?: InputMaybe<Scalars['String']>
    email?: InputMaybe<Scalars['String']>
    id: Scalars['ID']
    name: Scalars['String']
    websiteUrl?: InputMaybe<Scalars['String']>
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
    position?: Maybe<Position>
}

export type UpdatePositionVisibilityInput = {
    positionId: Scalars['ID']
    visible: Scalars['Boolean']
}

export type UpdateSeasonInput = {
    name?: InputMaybe<Scalars['String']>
    seasonId: Scalars['ID']
}

export type UpdateSeasonParticipantPermitInput = {
    maxConcurrentAssignment: Scalars['Int']
    visibility: Array<UpdatePositionVisibilityInput>
}

export type UpdateSeasonParticipantPermitPayload = {
    __typename?: 'UpdateSeasonParticipantPermitPayload'
    errors: Array<InputError>
    success: Scalars['Boolean']
}

export type UpdateSeasonPayload = {
    __typename?: 'UpdateSeasonPayload'
    errors: Array<InputError>
    season: Season
    success: Scalars['Boolean']
}

export type UpdateUserInput = {
    city?: InputMaybe<Scalars['String']>
    firstName?: InputMaybe<Scalars['String']>
    lastName?: InputMaybe<Scalars['String']>
    phoneNumber?: InputMaybe<Scalars['String']>
    profilePictureB64?: InputMaybe<Scalars['String']>
    state?: InputMaybe<Scalars['String']>
    streetAddress?: InputMaybe<Scalars['String']>
    userId: Scalars['ID']
    zipCode?: InputMaybe<Scalars['String']>
}

export type UpdateUserPayload = {
    __typename?: 'UpdateUserPayload'
    errors: Array<InputError>
    user?: Maybe<User>
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
    email: Scalars['String']
    firstName: Scalars['String']
    fullAddress?: Maybe<Scalars['String']>
    id: Scalars['ID']
    isViewer: Scalars['Boolean']
    lastName: Scalars['String']
    openGames: Array<Game>
    organizations: Array<UserOrganization>
    phoneNumber?: Maybe<Scalars['String']>
    profilePictureUrl?: Maybe<Scalars['String']>
    seasons: Array<UserSeason>
}

export type UserOrganization = {
    __typename?: 'UserOrganization'
    membership: OrganizationMembership
    organization: Organization
}

export type UserSeason = {
    __typename?: 'UserSeason'
    permit: SeasonParticipantPermit
    season: Season
}
