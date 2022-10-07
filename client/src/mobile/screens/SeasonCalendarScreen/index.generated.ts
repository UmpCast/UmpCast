/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import { GameCalendarItemFragmentDoc } from '../../../features/GameCalendar/Item.generated'
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
        viewerCanManage: boolean
        games: Array<{
            __typename?: 'Game'
            id: string
            name: string
            startTime: Date
            location?: string | null
            listings: Array<{
                __typename?: 'GameListing'
                id: string
                name: string
                canAssignSelf?: boolean | null
                canChangeAssignee?: boolean | null
                assignee?: {
                    __typename?: 'SeasonParticipant'
                    user: { __typename?: 'User'; id: string; profilePictureUrl?: string | null }
                } | null
            }>
        }>
    }
}

export type GameListingFragment = {
    __typename?: 'GameListing'
    id: string
    name: string
    canAssignSelf?: boolean | null
    canChangeAssignee?: boolean | null
}

export const GameListingFragmentDoc = gql`
    fragment GameListing on GameListing {
        id
        name
        canAssignSelf
        canChangeAssignee
    }
`
export const ScreenDocument = gql`
    query Screen($seasonId: ID!) {
        season(id: $seasonId) {
            id
            games {
                id
                ...GameCalendarItem
                listings {
                    id
                    ...GameListing
                }
            }
            viewerCanManage
        }
    }
    ${GameCalendarItemFragmentDoc}
    ${GameListingFragmentDoc}
`

export function useScreenQuery(options: Omit<Urql.UseQueryArgs<ScreenQueryVariables>, 'query'>) {
    return Urql.useQuery<ScreenQuery>({ query: ScreenDocument, ...options })
}
