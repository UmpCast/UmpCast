/* eslint-disable */
import * as Types from '../../../graphql/schema'

import gql from 'graphql-tag'
import { GameItemFragmentDoc } from './GameItem.generated'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type ScreenQueryVariables = Types.Exact<{
    seasonId: Types.Scalars['ID']
}>

export type ScreenQuery = {
    __typename?: 'Query'
    season: {
        __typename?: 'Season'
        id: string
        viewerCanCreateGame: boolean | null
        games: Array<{
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
        }>
    } | null
}

export const ScreenDocument = gql`
    query Screen($seasonId: ID!) {
        season(id: $seasonId) {
            id
            games {
                id
                ...GameItem
            }
            viewerCanCreateGame
        }
    }
    ${GameItemFragmentDoc}
`

export function useScreenQuery(options: Omit<Urql.UseQueryArgs<ScreenQueryVariables>, 'query'>) {
    return Urql.useQuery<ScreenQuery>({ query: ScreenDocument, ...options })
}
