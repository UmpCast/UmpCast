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

export type AddSeasonParticipantRequestInput = {
    roles: Array<SeasonRoleType>
    userId: Scalars['ID']
}

export type AddSeasonParticipantsInput = {
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
    members: Array<OrganizationMember>
    name: Scalars['String']
    seasons: Array<Season>
    websiteUrl: Maybe<Scalars['String']>
}

export type OrganizationMember = {
    __typename?: 'OrganizationMember'
    /** Indicates whether member is participating in a particular organization season */
    isParticipating: Maybe<Scalars['Boolean']>
    organization: Organization
    role: OrganizationRoleType
    user: User
}

export type OrganizationMemberIsParticipatingArgs = {
    id: Scalars['ID']
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
    divisions: Array<Maybe<Division>>
    endDate: Scalars['DateTime']
    id: Scalars['ID']
    name: Scalars['String']
    organization: Organization
    /** Organization members participating in the season */
    participants: Array<SeasonParticipant>
    startDate: Scalars['DateTime']
}

export type SeasonParticipant = {
    __typename?: 'SeasonParticipant'
    member: OrganizationMember
    roles: Array<SeasonRoleType>
    season: Season
    /** Positions available for signup if they are a referee. */
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
    email: Scalars['String']
    firstName: Scalars['String']
    fullAddress: Maybe<Scalars['String']>
    id: Scalars['ID']
    lastName: Scalars['String']
    /** Permits for organizations the user is a member of */
    organizations: Array<Maybe<OrganizationMember>>
    phoneNumber: Maybe<Scalars['String']>
    profilePictureUrl: Maybe<Scalars['String']>
    /**
     * Find a permit for a season the user is participating in by id.
     * Null if not participating
     */
    season: Maybe<SeasonParticipant>
    /** Permits for seasons the user is participating in */
    seasons: Array<Maybe<SeasonParticipant>>
    state: Maybe<Scalars['String']>
    streetAddress: Maybe<Scalars['String']>
    zipCode: Maybe<Scalars['Int']>
}

export type UserSeasonArgs = {
    id: Scalars['ID']
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

export type OrgInfoList_OrganizationMemberFragment = {
    __typename?: 'OrganizationMember'
    role: OrganizationRoleType
    organization: {
        __typename?: 'Organization'
        id: string
        email: string | null
        websiteUrl: string | null
        description: string | null
        name: string
        logoUrl: string | null
    }
}

export type OrgInfoSheet_OrganizationMemberFragment = {
    __typename?: 'OrganizationMember'
    role: OrganizationRoleType
    organization: {
        __typename?: 'Organization'
        id: string
        email: string | null
        websiteUrl: string | null
        description: string | null
        name: string
        logoUrl: string | null
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

export type OrgMemberScreen_OrganizationMemberFragment = {
    __typename?: 'OrganizationMember'
    role: OrganizationRoleType
    user: {
        __typename?: 'User'
        id: string
        firstName: string
        lastName: string
        profilePictureUrl: string | null
    }
}

export type OrgMemberScreen_OrganizationFragment = {
    __typename?: 'Organization'
    id: string
    members: Array<{
        __typename?: 'OrganizationMember'
        role: OrganizationRoleType
        user: {
            __typename?: 'User'
            id: string
            firstName: string
            lastName: string
            profilePictureUrl: string | null
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
            __typename?: 'OrganizationMember'
            role: OrganizationRoleType
            user: {
                __typename?: 'User'
                id: string
                firstName: string
                lastName: string
                profilePictureUrl: string | null
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
            __typename?: 'SeasonParticipant'
            roles: Array<SeasonRoleType>
            season: { __typename?: 'Season'; id: string }
        } | null
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

export type SeasonMemberAddItem_OrganizationMemberFragment = {
    __typename?: 'OrganizationMember'
    isParticipating: boolean | null
    user: {
        __typename?: 'User'
        id: string
        firstName: string
        profilePictureUrl: string | null
        lastName: string
    }
}

export type SeasonMemberAddScreen_OrganizationMemberFragment = {
    __typename?: 'OrganizationMember'
    isParticipating: boolean | null
    user: {
        __typename?: 'User'
        id: string
        firstName: string
        profilePictureUrl: string | null
        lastName: string
    }
}

export type SeasonMemberAddScreenQueryVariables = Exact<{
    seasonId: Scalars['ID']
}>

export type SeasonMemberAddScreenQuery = {
    __typename?: 'Query'
    season: {
        __typename?: 'Season'
        id: string
        organization: {
            __typename?: 'Organization'
            id: string
            members: Array<{
                __typename?: 'OrganizationMember'
                isParticipating: boolean | null
                user: {
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

export type UseSeasonMemberAddRequest_OrganizationMemberFragment = {
    __typename?: 'OrganizationMember'
    user: { __typename?: 'User'; id: string }
}

export type SeasonMemberListHeaderRightQueryVariables = Exact<{
    seasonId: Scalars['ID']
}>

export type SeasonMemberListHeaderRightQuery = {
    __typename?: 'Query'
    viewer: {
        __typename?: 'User'
        id: string
        season: {
            __typename?: 'SeasonParticipant'
            member: {
                __typename?: 'OrganizationMember'
                role: OrganizationRoleType
            }
        } | null
    } | null
}

export type SeasonMemberListItem_SeasonParticipantFragment = {
    __typename?: 'SeasonParticipant'
    roles: Array<SeasonRoleType>
    member: {
        __typename?: 'OrganizationMember'
        user: {
            __typename?: 'User'
            id: string
            firstName: string
            lastName: string
            profilePictureUrl: string | null
        }
    }
}

export type SeasonMemberListScreenQueryVariables = Exact<{
    seasonId: Scalars['ID']
}>

export type SeasonMemberListScreenQuery = {
    __typename?: 'Query'
    season: {
        __typename?: 'Season'
        id: string
        participants: Array<{
            __typename?: 'SeasonParticipant'
            roles: Array<SeasonRoleType>
            member: {
                __typename?: 'OrganizationMember'
                user: {
                    __typename?: 'User'
                    id: string
                    firstName: string
                    lastName: string
                    profilePictureUrl: string | null
                }
            }
        }>
    } | null
    viewer: {
        __typename?: 'User'
        id: string
        season: {
            __typename?: 'SeasonParticipant'
            member: {
                __typename?: 'OrganizationMember'
                role: OrganizationRoleType
            }
        } | null
    } | null
}

export type SeasonMemberRemoveButton_SeasonFragment = {
    __typename?: 'Season'
    id: string
}

export type SeasonMemberRemoveButton_UserFragment = {
    __typename?: 'User'
    id: string
}

export type SeasonMemberRoleCard_SeasonParticipantFragment = {
    __typename?: 'SeasonParticipant'
    roles: Array<SeasonRoleType>
    season: { __typename?: 'Season'; id: string }
}

export type AddSeasonMembersMutationVariables = Exact<{
    input: AddSeasonParticipantsInput
}>

export type AddSeasonMembersMutation = {
    __typename?: 'Mutation'
    addSeasonParticipants: {
        __typename?: 'AddSeasonParticipantsPayload'
        success: boolean | null
    } | null
}

export type RemoveSeasonMemberMutationVariables = Exact<{
    input: RemoveSeasonParticipantInput
}>

export type RemoveSeasonMemberMutation = {
    __typename?: 'Mutation'
    removeSeasonParticipant: {
        __typename?: 'RemoveSeasonParticipantPayload'
        success: boolean | null
    } | null
}

export type UseSeasonMemberOrgRole_QueryFragment = {
    __typename?: 'Query'
    viewer: {
        __typename?: 'User'
        id: string
        season: {
            __typename?: 'SeasonParticipant'
            member: {
                __typename?: 'OrganizationMember'
                role: OrganizationRoleType
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
            __typename?: 'OrganizationMember'
            role: OrganizationRoleType
            organization: {
                __typename?: 'Organization'
                id: string
                email: string | null
                websiteUrl: string | null
                description: string | null
                name: string
                logoUrl: string | null
            }
        } | null>
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
export const OrgInfoSheet_OrganizationMemberFragmentDoc = gql`
    fragment OrgInfoSheet_OrganizationMember on OrganizationMember {
        organization {
            id
            email
            websiteUrl
            description
            ...OrgLogo_Organization
        }
        role
    }
    ${OrgLogo_OrganizationFragmentDoc}
`
export const OrgInfoList_OrganizationMemberFragmentDoc = gql`
    fragment OrgInfoList_OrganizationMember on OrganizationMember {
        organization {
            ...OrgInfoItem_Organization
        }
        role
        ...OrgInfoSheet_OrganizationMember
    }
    ${OrgInfoItem_OrganizationFragmentDoc}
    ${OrgInfoSheet_OrganizationMemberFragmentDoc}
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
export const OrgMemberScreen_OrganizationMemberFragmentDoc = gql`
    fragment OrgMemberScreen_OrganizationMember on OrganizationMember {
        user {
            ...OrgMemberItem_User
        }
        role
    }
    ${OrgMemberItem_UserFragmentDoc}
`
export const OrgMemberScreen_OrganizationFragmentDoc = gql`
    fragment OrgMemberScreen_Organization on Organization {
        id
        members {
            ...OrgMemberScreen_OrganizationMember
        }
    }
    ${OrgMemberScreen_OrganizationMemberFragmentDoc}
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
export const SeasonMemberAddItem_OrganizationMemberFragmentDoc = gql`
    fragment SeasonMemberAddItem_OrganizationMember on OrganizationMember {
        user {
            id
            ...UserProfilePicture_User
            ...UserItemName_User
        }
        isParticipating(id: $seasonId)
    }
    ${UserProfilePicture_UserFragmentDoc}
    ${UserItemName_UserFragmentDoc}
`
export const UseSeasonMemberAddRequest_OrganizationMemberFragmentDoc = gql`
    fragment UseSeasonMemberAddRequest_OrganizationMember on OrganizationMember {
        user {
            id
        }
    }
`
export const SeasonMemberAddScreen_OrganizationMemberFragmentDoc = gql`
    fragment SeasonMemberAddScreen_OrganizationMember on OrganizationMember {
        ...SeasonMemberAddItem_OrganizationMember
        ...UseSeasonMemberAddRequest_OrganizationMember
    }
    ${SeasonMemberAddItem_OrganizationMemberFragmentDoc}
    ${UseSeasonMemberAddRequest_OrganizationMemberFragmentDoc}
`
export const SeasonMemberListItem_SeasonParticipantFragmentDoc = gql`
    fragment SeasonMemberListItem_SeasonParticipant on SeasonParticipant {
        member {
            user {
                id
                ...UserItemName_User
                ...UserProfilePicture_User
            }
        }
        roles
    }
    ${UserItemName_UserFragmentDoc}
    ${UserProfilePicture_UserFragmentDoc}
`
export const SeasonMemberRemoveButton_SeasonFragmentDoc = gql`
    fragment SeasonMemberRemoveButton_Season on Season {
        id
    }
`
export const SeasonMemberRemoveButton_UserFragmentDoc = gql`
    fragment SeasonMemberRemoveButton_User on User {
        id
    }
`
export const SeasonMemberRoleCard_SeasonParticipantFragmentDoc = gql`
    fragment SeasonMemberRoleCard_SeasonParticipant on SeasonParticipant {
        season {
            id
        }
        roles
    }
`
export const UseSeasonMemberOrgRole_QueryFragmentDoc = gql`
    fragment UseSeasonMemberOrgRole_Query on Query {
        viewer {
            id
            season(id: $seasonId) {
                member {
                    role
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
export const SeasonAboutScreenDocument = gql`
    query SeasonAboutScreen($seasonId: ID!) {
        season(id: $seasonId) {
            id
            ...SeasonInfoCard_Season
        }
        viewer {
            season(id: $seasonId) {
                ...SeasonMemberRoleCard_SeasonParticipant
            }
        }
    }
    ${SeasonInfoCard_SeasonFragmentDoc}
    ${SeasonMemberRoleCard_SeasonParticipantFragmentDoc}
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
export const SeasonMemberAddScreenDocument = gql`
    query SeasonMemberAddScreen($seasonId: ID!) {
        season(id: $seasonId) {
            id
            organization {
                id
                members {
                    ...SeasonMemberAddScreen_OrganizationMember
                }
            }
        }
    }
    ${SeasonMemberAddScreen_OrganizationMemberFragmentDoc}
`

export function useSeasonMemberAddScreenQuery(
    options: Omit<
        Urql.UseQueryArgs<SeasonMemberAddScreenQueryVariables>,
        'query'
    > = {}
) {
    return Urql.useQuery<SeasonMemberAddScreenQuery>({
        query: SeasonMemberAddScreenDocument,
        ...options
    })
}
export const SeasonMemberListHeaderRightDocument = gql`
    query SeasonMemberListHeaderRight($seasonId: ID!) {
        ...UseSeasonMemberOrgRole_Query
    }
    ${UseSeasonMemberOrgRole_QueryFragmentDoc}
`

export function useSeasonMemberListHeaderRightQuery(
    options: Omit<
        Urql.UseQueryArgs<SeasonMemberListHeaderRightQueryVariables>,
        'query'
    > = {}
) {
    return Urql.useQuery<SeasonMemberListHeaderRightQuery>({
        query: SeasonMemberListHeaderRightDocument,
        ...options
    })
}
export const SeasonMemberListScreenDocument = gql`
    query SeasonMemberListScreen($seasonId: ID!) {
        season(id: $seasonId) {
            id
            participants {
                member {
                    user {
                        id
                        ...SeasonMemberRemoveButton_User
                    }
                }
                ...SeasonMemberListItem_SeasonParticipant
            }
            ...SeasonMemberRemoveButton_Season
        }
        ...UseSeasonMemberOrgRole_Query
    }
    ${SeasonMemberRemoveButton_UserFragmentDoc}
    ${SeasonMemberListItem_SeasonParticipantFragmentDoc}
    ${SeasonMemberRemoveButton_SeasonFragmentDoc}
    ${UseSeasonMemberOrgRole_QueryFragmentDoc}
`

export function useSeasonMemberListScreenQuery(
    options: Omit<
        Urql.UseQueryArgs<SeasonMemberListScreenQueryVariables>,
        'query'
    > = {}
) {
    return Urql.useQuery<SeasonMemberListScreenQuery>({
        query: SeasonMemberListScreenDocument,
        ...options
    })
}
export const AddSeasonMembersDocument = gql`
    mutation AddSeasonMembers($input: AddSeasonParticipantsInput!) {
        addSeasonParticipants(input: $input) {
            success
        }
    }
`

export function useAddSeasonMembersMutation() {
    return Urql.useMutation<
        AddSeasonMembersMutation,
        AddSeasonMembersMutationVariables
    >(AddSeasonMembersDocument)
}
export const RemoveSeasonMemberDocument = gql`
    mutation RemoveSeasonMember($input: RemoveSeasonParticipantInput!) {
        removeSeasonParticipant(input: $input) {
            success
        }
    }
`

export function useRemoveSeasonMemberMutation() {
    return Urql.useMutation<
        RemoveSeasonMemberMutation,
        RemoveSeasonMemberMutationVariables
    >(RemoveSeasonMemberDocument)
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
                ...OrgInfoList_OrganizationMember
            }
        }
    }
    ${OrgInfoList_OrganizationMemberFragmentDoc}
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
