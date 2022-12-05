/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import { UserAvatarFragmentDoc } from '../../../features/UserAvatar/index.generated'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type PermissionQueryVariables = Types.Exact<{
    seasonId: Types.Scalars['ID']
    userId: Types.Scalars['ID']
}>

export type PermissionQuery = {
    __typename?: 'Query'
    season: {
        __typename?: 'Season'
        id: string
        participant: {
            __typename?: 'SeasonParticipant'
            viewerCanSeeRefereeDetails: boolean
        }
    }
}

export type ScreenQueryVariables = Types.Exact<{
    seasonId: Types.Scalars['ID']
    userId: Types.Scalars['ID']
    includeSensitive: Types.Scalars['Boolean']
}>

export type ScreenQuery = {
    __typename?: 'Query'
    season: {
        __typename?: 'Season'
        id: string
        name: string
        participant: {
            __typename?: 'SeasonParticipant'
            user: {
                __typename?: 'User'
                id: string
                firstName: string
                lastName: string
                phoneNumber?: string | null
                fullAddress?: string | null
                isViewer: boolean
                profilePictureUrl?: string | null
            }
            permit: {
                __typename?: 'SeasonParticipantPermit'
                role: Types.SeasonParticipantRoleType
            }
        }
    }
}

export const PermissionDocument = gql`
    query Permission($seasonId: ID!, $userId: ID!) {
        season(id: $seasonId) {
            id
            participant(userId: $userId) {
                viewerCanSeeRefereeDetails
            }
        }
    }
`

export function usePermissionQuery(
    options: Omit<Urql.UseQueryArgs<PermissionQueryVariables>, 'query'>
) {
    return Urql.useQuery<PermissionQuery, PermissionQueryVariables>({
        query: PermissionDocument,
        ...options
    })
}
export const ScreenDocument = gql`
    query Screen($seasonId: ID!, $userId: ID!, $includeSensitive: Boolean!) {
        season(id: $seasonId) {
            id
            name
            participant(userId: $userId) {
                user {
                    id
                    firstName
                    lastName
                    phoneNumber
                    fullAddress @include(if: $includeSensitive)
                    isViewer
                    ...UserAvatar
                }
                permit {
                    role
                }
            }
        }
    }
    ${UserAvatarFragmentDoc}
`

export function useScreenQuery(
    options: Omit<Urql.UseQueryArgs<ScreenQueryVariables>, 'query'>
) {
    return Urql.useQuery<ScreenQuery, ScreenQueryVariables>({
        query: ScreenDocument,
        ...options
    })
}
