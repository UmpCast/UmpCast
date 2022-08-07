/* eslint-disable */
import * as Types from '../../../graphql/schema'

import gql from 'graphql-tag'
import { UserAvatarFragmentDoc } from '../../../features/UserAvatar/index.generated'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
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
        participant: {
            __typename?: 'SeasonParticipantEdge'
            viewerCanUpdateVisibility: boolean | null
            node: {
                __typename?: 'User'
                id: string
                firstName: string
                lastName: string
                phoneNumber: string | null
                profilePictureUrl: string | null
                streetAddress: string | null
                zipCode: string | null
                state: string | null
                city: string | null
            }
            permit: {
                __typename?: 'SeasonParticipationPermit'
                id: string
                roles: Array<Types.SeasonRoleType>
                visibility?: Array<{
                    __typename?: 'PositionVisibility'
                    visible: boolean
                    position: {
                        __typename?: 'Position'
                        id: string
                        name: string
                        division: {
                            __typename?: 'Division'
                            id: string
                            name: string
                        }
                    }
                }>
            }
        }
    } | null
}

export type SensitiveDetailsQueryVariables = Types.Exact<{
    seasonId: Types.Scalars['ID']
    userId: Types.Scalars['ID']
}>

export type SensitiveDetailsQuery = {
    __typename?: 'Query'
    season: {
        __typename?: 'Season'
        id: string
        participant: {
            __typename?: 'SeasonParticipantEdge'
            viewerCanReadSensitiveDetails: boolean | null
        }
    } | null
}

export type UserLocationFragment = {
    __typename?: 'User'
    streetAddress: string | null
    zipCode: string | null
    state: string | null
    city: string | null
}

export const UserLocationFragmentDoc = gql`
    fragment UserLocation on User {
        streetAddress
        zipCode
        state
        city
    }
`
export const ScreenDocument = gql`
    query Screen($seasonId: ID!, $userId: ID!, $includeSensitive: Boolean!) {
        season(id: $seasonId) {
            id
            participant(userId: $userId) {
                node {
                    id
                    firstName
                    lastName
                    phoneNumber
                    ...UserAvatar
                    ...UserLocation @include(if: $includeSensitive)
                }
                permit {
                    id
                    roles
                    visibility @include(if: $includeSensitive) {
                        position {
                            id
                            name
                            division {
                                id
                                name
                            }
                        }
                        visible
                    }
                }
                viewerCanUpdateVisibility
            }
        }
    }
    ${UserAvatarFragmentDoc}
    ${UserLocationFragmentDoc}
`

export function useScreenQuery(
    options: Omit<Urql.UseQueryArgs<ScreenQueryVariables>, 'query'>
) {
    return Urql.useQuery<ScreenQuery>({ query: ScreenDocument, ...options })
}
export const SensitiveDetailsDocument = gql`
    query SensitiveDetails($seasonId: ID!, $userId: ID!) {
        season(id: $seasonId) {
            id
            participant(userId: $userId) {
                viewerCanReadSensitiveDetails
            }
        }
    }
`

export function useSensitiveDetailsQuery(
    options: Omit<Urql.UseQueryArgs<SensitiveDetailsQueryVariables>, 'query'>
) {
    return Urql.useQuery<SensitiveDetailsQuery>({
        query: SensitiveDetailsDocument,
        ...options
    })
}
