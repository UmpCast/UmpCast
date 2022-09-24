/* eslint-disable */
import * as Types from '../../../graphql/schema'

import gql from 'graphql-tag'
import { UserAvatarFragmentDoc } from '../../../features/UserAvatar/index.generated'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type ScreenQueryVariables = Types.Exact<{ [key: string]: never }>

export type ScreenQuery = {
    __typename?: 'Query'
    viewer: {
        __typename?: 'User'
        id: string
        profilePictureUrl: string | null
        assignedListings: Array<{
            __typename?: 'GameListing'
            id: string
            name: string
            game: {
                __typename?: 'Game'
                id: string
                name: string
                startTime: any
                location: string | null
                listings: Array<{
                    __typename?: 'GameListing'
                    id: string
                    assignee: {
                        __typename?: 'GameListingAssigneeEdge'
                        node: { __typename?: 'User'; id: string; profilePictureUrl: string | null }
                    } | null
                }>
            }
        }>
    } | null
}

export const ScreenDocument = gql`
    query Screen {
        viewer {
            id
            ...UserAvatar
            assignedListings {
                id
                name
                game {
                    id
                    name
                    startTime
                    location
                    listings {
                        id
                        assignee {
                            node {
                                id
                                ...UserAvatar
                            }
                        }
                    }
                }
            }
        }
    }
    ${UserAvatarFragmentDoc}
`

export function useScreenQuery(options?: Omit<Urql.UseQueryArgs<ScreenQueryVariables>, 'query'>) {
    return Urql.useQuery<ScreenQuery>({ query: ScreenDocument, ...options })
}
