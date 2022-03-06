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

export type AddMemberToSeasonInput = {
    permissionList: Array<SeasonPermission>
    seasonId: Scalars['ID']
    userId: Scalars['ID']
}

export type BatchAddMemberToSeasonInput = {
    batch: Array<AddMemberToSeasonInput>
}

export type BatchAddMemberToSeasonPayload = {
    __typename?: 'BatchAddMemberToSeasonPayload'
    recruited: Maybe<Array<Scalars['ID']>>
}

export type CreateSeasonInput = {
    endDate: Scalars['String']
    name: Scalars['String']
    organizationId: Scalars['ID']
    startDate: Scalars['String']
}

export type Division = {
    __typename?: 'Division'
    dateCreated: Maybe<Scalars['DateTime']>
    id: Scalars['ID']
    name: Maybe<Scalars['String']>
    positionList: Array<Position>
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
    batchAddMemberToSeason: Maybe<BatchAddMemberToSeasonPayload>
    createDivision: Maybe<DivisionPayload>
    createOrganization: OrganizationPayload
    createPosition: Maybe<PositionPayload>
    createSeason: SeasonPayload
    deleteDivision: Maybe<DivisionPayload>
    deleteOrganization: OrganizationPayload
    deletePosition: Maybe<PositionPayload>
    joinOrganization: OrganizationPayload
    leaveOrganization: OrganizationPayload
    register: UserPayload
    removeMemberFromSeason: Maybe<RemoveMemberFromSeasonPayload>
    sendOrganizationInvite: Maybe<SendOrganizationInvitePayload>
    sendSignInLink: SendSignInLinkPayload
    updateOrganization: OrganizationPayload
    updateUser: UserPayload
}

export type MutationBatchAddMemberToSeasonArgs = {
    input: BatchAddMemberToSeasonInput
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

export type MutationCreateSeasonArgs = {
    input: CreateSeasonInput
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

export type MutationRemoveMemberFromSeasonArgs = {
    input: RemoveMemberFromSeasonInput
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
    dateCreated: Scalars['DateTime']
    description: Maybe<Scalars['String']>
    email: Maybe<Scalars['String']>
    id: Scalars['ID']
    logoUrl: Maybe<Scalars['String']>
    memberList: Array<UserOrganizationPermit>
    seasonList: Array<Season>
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

export type RemoveMemberFromSeasonInput = {
    seasonId: Scalars['ID']
    userId: Scalars['ID']
}

export type RemoveMemberFromSeasonPayload = {
    __typename?: 'RemoveMemberFromSeasonPayload'
    success: Maybe<Scalars['Boolean']>
}

export type Season = {
    __typename?: 'Season'
    dateCreated: Maybe<Scalars['DateTime']>
    divisionList: Array<Maybe<Division>>
    endDate: Scalars['DateTime']
    id: Scalars['ID']
    memberList: Array<Maybe<UserSeasonPermit>>
    memberStatusList: Maybe<Array<SeasonMemberStatus>>
    name: Scalars['String']
    organization: Organization
    startDate: Scalars['DateTime']
    viewerCanRemoveMember: Maybe<Scalars['Boolean']>
}

export type SeasonMemberStatus = {
    __typename?: 'SeasonMemberStatus'
    added: Scalars['Boolean']
    permit: UserOrganizationPermit
}

export type SeasonPayload = {
    __typename?: 'SeasonPayload'
    errors: Array<Maybe<InputError>>
    season: Maybe<Season>
}

export enum SeasonPermission {
    Manager = 'MANAGER',
    Referee = 'REFEREE'
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
    profilePictureUrl: Maybe<Scalars['String']>
    seasonPermitList: Array<Maybe<UserSeasonPermit>>
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

export type UserSeasonPermit = {
    __typename?: 'UserSeasonPermit'
    id: Scalars['ID']
    permissionList: Array<SeasonPermission>
    season: Season
    user: User
}

export type DivisionEditActionsheet_DivisionFragment = {
    __typename?: 'Division'
    id: string
    name: string | null
}

export type DivisionHeader_DivisionFragment = {
    __typename?: 'Division'
    id: string
    name: string | null
}

export type OrgDeleteButton_OrganizationFragment = {
    __typename?: 'Organization'
    id: string
    title: string
}

export type OrgDeleteModal_OrganizationFragment = {
    __typename?: 'Organization'
    id: string
    title: string
}

export type OrgEditScreen_OrganizationFragment = {
    __typename?: 'Organization'
    id: string
    title: string
    email: string | null
    logoUrl: string | null
    description: string | null
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

export type OrgLogo_OrganizationFragment = {
    __typename?: 'Organization'
    title: string
    logoUrl: string | null
}

export type OrgMemberItem_UserFragment = {
    __typename?: 'User'
    id: string
    firstName: string
    lastName: string
    profilePictureUrl: string | null
}

export type OrgMemberScreen_UserOrganizationPermitFragment = {
    __typename?: 'UserOrganizationPermit'
    id: string
    permissionLevel: OrganizationPermissionLevel
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
    memberList: Array<{
        __typename?: 'UserOrganizationPermit'
        id: string
        permissionLevel: OrganizationPermissionLevel
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
        memberList: Array<{
            __typename?: 'UserOrganizationPermit'
            id: string
            permissionLevel: OrganizationPermissionLevel
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
        seasonList: Array<{
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
    title: string
}

export type OrgSettingsScreenQueryVariables = Exact<{
    id: Scalars['ID']
}>

export type OrgSettingsScreenQuery = {
    __typename?: 'Query'
    organization: {
        __typename?: 'Organization'
        id: string
        title: string
    } | null
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

export type OrgDeleteMutationVariables = Exact<{
    id: Scalars['ID']
}>

export type OrgDeleteMutation = {
    __typename?: 'Mutation'
    deleteOrganization: {
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
        organization: {
            __typename?: 'Organization'
            id: string
            title: string
            email: string | null
            logoUrl: string | null
            description: string | null
            websiteUrl: string | null
        } | null
        errors: Array<{
            __typename?: 'InputError'
            key: string
            message: string
        } | null> | null
    }
}

export type PositionEditActionsheet_PositionFragment = {
    __typename?: 'Position'
    id: string
    name: string | null
}

export type PositionEditItem_PositionFragment = {
    __typename?: 'Position'
    id: string
    name: string | null
}

export type SeasonInfoItem_SeasonFragment = {
    __typename?: 'Season'
    id: string
    name: string
    startDate: Date
    endDate: Date
}

export type SeasonMemberAddItem_SeasonFragment = {
    __typename?: 'Season'
    id: string
}

export type SeasonMemberAddItem_SeasonMemberStatusFragment = {
    __typename?: 'SeasonMemberStatus'
    added: boolean
    permit: {
        __typename?: 'UserOrganizationPermit'
        id: string
        user: {
            __typename?: 'User'
            id: string
            firstName: string
            profilePictureUrl: string | null
            lastName: string
        }
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
        memberStatusList: Array<{
            __typename?: 'SeasonMemberStatus'
            added: boolean
            permit: {
                __typename?: 'UserOrganizationPermit'
                id: string
                user: {
                    __typename?: 'User'
                    id: string
                    firstName: string
                    profilePictureUrl: string | null
                    lastName: string
                }
            }
        }> | null
    } | null
}

export type SeasonMemberListItem_UserSeasonPermitFragment = {
    __typename?: 'UserSeasonPermit'
    id: string
    permissionList: Array<SeasonPermission>
    user: {
        __typename?: 'User'
        id: string
        firstName: string
        lastName: string
        profilePictureUrl: string | null
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
        viewerCanRemoveMember: boolean | null
        memberList: Array<{
            __typename?: 'UserSeasonPermit'
            id: string
            permissionList: Array<SeasonPermission>
            user: {
                __typename?: 'User'
                id: string
                firstName: string
                lastName: string
                profilePictureUrl: string | null
            }
        } | null>
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

export type SeasonMemberUserItem_UserFragment = {
    __typename?: 'User'
    id: string
    firstName: string
    profilePictureUrl: string | null
    lastName: string
}

export type SeasonStructureEditor_PositionFragment = {
    __typename?: 'Position'
    id: string
    name: string | null
}

export type SeasonStructureEditor_DivisionFragment = {
    __typename?: 'Division'
    id: string
    name: string | null
    positionList: Array<{
        __typename?: 'Position'
        id: string
        name: string | null
    }>
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
            }>
        } | null>
    } | null
}

export type SeasonCreateMutationVariables = Exact<{
    input: CreateSeasonInput
}>

export type SeasonCreateMutation = {
    __typename?: 'Mutation'
    createSeason: {
        __typename?: 'SeasonPayload'
        errors: Array<{
            __typename?: 'InputError'
            key: string
            message: string
        } | null>
    }
}

export type RemoveMemberFromSeasonMutationVariables = Exact<{
    input: RemoveMemberFromSeasonInput
}>

export type RemoveMemberFromSeasonMutation = {
    __typename?: 'Mutation'
    removeMemberFromSeason: {
        __typename?: 'RemoveMemberFromSeasonPayload'
        success: boolean | null
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

export type UserProfilePicture_UserFragment = {
    __typename?: 'User'
    id: string
    firstName: string
    profilePictureUrl: string | null
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

export type ServerErrorFragment = {
    __typename?: 'InputError'
    key: string
    message: string
}

export const OrgLogo_OrganizationFragmentDoc = gql`
    fragment OrgLogo_Organization on Organization {
        title
        logoUrl
    }
`
export const OrgEditScreen_OrganizationFragmentDoc = gql`
    fragment OrgEditScreen_Organization on Organization {
        id
        id
        title
        email
        logoUrl
        description
        websiteUrl
        ...OrgLogo_Organization
    }
    ${OrgLogo_OrganizationFragmentDoc}
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
export const OrgMemberScreen_UserOrganizationPermitFragmentDoc = gql`
    fragment OrgMemberScreen_UserOrganizationPermit on UserOrganizationPermit {
        id
        user {
            ...OrgMemberItem_User
        }
        permissionLevel
    }
    ${OrgMemberItem_UserFragmentDoc}
`
export const OrgMemberScreen_OrganizationFragmentDoc = gql`
    fragment OrgMemberScreen_Organization on Organization {
        id
        memberList {
            ...OrgMemberScreen_UserOrganizationPermit
        }
    }
    ${OrgMemberScreen_UserOrganizationPermitFragmentDoc}
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
        title
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
export const SeasonMemberAddItem_SeasonFragmentDoc = gql`
    fragment SeasonMemberAddItem_Season on Season {
        id
    }
`
export const UserItemName_UserFragmentDoc = gql`
    fragment UserItemName_User on User {
        id
        firstName
        lastName
    }
`
export const SeasonMemberUserItem_UserFragmentDoc = gql`
    fragment SeasonMemberUserItem_User on User {
        id
        ...UserProfilePicture_User
        ...UserItemName_User
    }
    ${UserProfilePicture_UserFragmentDoc}
    ${UserItemName_UserFragmentDoc}
`
export const SeasonMemberAddItem_SeasonMemberStatusFragmentDoc = gql`
    fragment SeasonMemberAddItem_SeasonMemberStatus on SeasonMemberStatus {
        added
        permit {
            id
            user {
                ...SeasonMemberUserItem_User
            }
        }
    }
    ${SeasonMemberUserItem_UserFragmentDoc}
`
export const SeasonMemberListItem_UserSeasonPermitFragmentDoc = gql`
    fragment SeasonMemberListItem_UserSeasonPermit on UserSeasonPermit {
        id
        user {
            id
            ...UserItemName_User
            ...UserProfilePicture_User
        }
        permissionList
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
        positionList {
            ...SeasonStructureEditor_Position
        }
    }
    ${DivisionHeader_DivisionFragmentDoc}
    ${DivisionEditActionsheet_DivisionFragmentDoc}
    ${SeasonStructureEditor_PositionFragmentDoc}
`
export const ServerErrorFragmentDoc = gql`
    fragment ServerError on InputError {
        key
        message
    }
`
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
export const OrgSeasonScreenDocument = gql`
    query OrgSeasonScreen($id: ID!) {
        organization(id: $id) {
            id
            seasonList {
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
export const OrgDeleteDocument = gql`
    mutation OrgDelete($id: ID!) {
        deleteOrganization(id: $id) {
            errors {
                ...ServerError
            }
        }
    }
    ${ServerErrorFragmentDoc}
`

export function useOrgDeleteMutation() {
    return Urql.useMutation<OrgDeleteMutation, OrgDeleteMutationVariables>(
        OrgDeleteDocument
    )
}
export const OrgEditDocument = gql`
    mutation OrgEdit($id: ID!, $input: UpdateOrganizationInput!) {
        updateOrganization(id: $id, input: $input) {
            organization {
                id
                title
                email
                logoUrl
                description
                websiteUrl
            }
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
export const SeasonMemberAddScreenDocument = gql`
    query SeasonMemberAddScreen($seasonId: ID!) {
        season(id: $seasonId) {
            id
            memberStatusList {
                ...SeasonMemberAddItem_SeasonMemberStatus
            }
            ...SeasonMemberAddItem_Season
        }
    }
    ${SeasonMemberAddItem_SeasonMemberStatusFragmentDoc}
    ${SeasonMemberAddItem_SeasonFragmentDoc}
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
export const SeasonMemberListScreenDocument = gql`
    query SeasonMemberListScreen($seasonId: ID!) {
        season(id: $seasonId) {
            id
            memberList {
                id
                user {
                    id
                    ...SeasonMemberRemoveButton_User
                }
                ...SeasonMemberListItem_UserSeasonPermit
            }
            viewerCanRemoveMember
            ...SeasonMemberRemoveButton_Season
        }
    }
    ${SeasonMemberRemoveButton_UserFragmentDoc}
    ${SeasonMemberListItem_UserSeasonPermitFragmentDoc}
    ${SeasonMemberRemoveButton_SeasonFragmentDoc}
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
export const SeasonStructureEditorDocument = gql`
    query SeasonStructureEditor($id: ID!) {
        season(id: $id) {
            id
            divisionList {
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
export const RemoveMemberFromSeasonDocument = gql`
    mutation RemoveMemberFromSeason($input: RemoveMemberFromSeasonInput!) {
        removeMemberFromSeason(input: $input) {
            success
        }
    }
`

export function useRemoveMemberFromSeasonMutation() {
    return Urql.useMutation<
        RemoveMemberFromSeasonMutation,
        RemoveMemberFromSeasonMutationVariables
    >(RemoveMemberFromSeasonDocument)
}
export const UserOrgScreenDocument = gql`
    query UserOrgScreen {
        me {
            id
            organizationPermitList {
                ...OrgInfoListFragment
            }
        }
    }
    ${OrgInfoListFragmentDoc}
`

export function useUserOrgScreenQuery(
    options: Omit<Urql.UseQueryArgs<UserOrgScreenQueryVariables>, 'query'> = {}
) {
    return Urql.useQuery<UserOrgScreenQuery>({
        query: UserOrgScreenDocument,
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
