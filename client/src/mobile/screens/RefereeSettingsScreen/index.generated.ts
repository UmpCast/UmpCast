/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import {
    PositionTitle_PositionFragmentDoc,
    PositionTitle_DivisionFragmentDoc
} from '../../../features/PositionTitle/index.generated'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type ScreenQueryVariables = Types.Exact<{
    seasonId: Types.Scalars['ID']
    userId: Types.Scalars['ID']
}>

export type ScreenQuery = {
    __typename?: 'Query'
    season: {
        __typename?: 'Season'
        id: string
        participant: {
            __typename?: 'SeasonParticipant'
            user: { __typename?: 'User'; id: string; isViewer: boolean }
            permit: {
                __typename?: 'SeasonParticipantPermit'
                maxConcurrentAssignment: number
                viewerCanUpdate: boolean
                visibility: Array<{
                    __typename?: 'PositionVisibility'
                    visible: boolean
                    position: {
                        __typename?: 'Position'
                        id: string
                        name: string
                        division: { __typename?: 'Division'; id: string; name: string }
                    }
                }>
            }
        }
    }
}

export type RefreeSettingsScreen_VisibilityFragment = {
    __typename?: 'PositionVisibility'
    visible: boolean
    position: {
        __typename?: 'Position'
        id: string
        name: string
        division: { __typename?: 'Division'; id: string; name: string }
    }
}

export const RefreeSettingsScreen_VisibilityFragmentDoc = gql`
    fragment RefreeSettingsScreen_Visibility on PositionVisibility {
        position {
            id
            ...PositionTitle_Position
            division {
                id
                ...PositionTitle_Division
            }
        }
        visible
    }
    ${PositionTitle_PositionFragmentDoc}
    ${PositionTitle_DivisionFragmentDoc}
`
export const ScreenDocument = gql`
    query Screen($seasonId: ID!, $userId: ID!) {
        season(id: $seasonId) {
            id
            participant(userId: $userId) {
                user {
                    id
                    isViewer
                }
                permit {
                    visibility {
                        position {
                            id
                            ...PositionTitle_Position
                            division {
                                id
                                ...PositionTitle_Division
                            }
                        }
                        visible
                    }
                    maxConcurrentAssignment
                    viewerCanUpdate
                }
            }
        }
    }
    ${PositionTitle_PositionFragmentDoc}
    ${PositionTitle_DivisionFragmentDoc}
`

export function useScreenQuery(options: Omit<Urql.UseQueryArgs<ScreenQueryVariables>, 'query'>) {
    return Urql.useQuery<ScreenQuery>({ query: ScreenDocument, ...options })
}
