/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import { GameCalendarItemFragmentDoc } from '../../../features/GameCalendar/Item.generated'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type ScreenQueryVariables = Types.Exact<{ [key: string]: never }>

export type ScreenQuery = {
    __typename?: 'Query'
    viewer: {
        __typename?: 'User'
        id: string
        openGames: Array<{
            __typename?: 'Game'
            id: string
            name: string
            startTime: Date
            location?: string | null
            listings: Array<{
                __typename?: 'GameListing'
                id: string
                assignee?: {
                    __typename?: 'SeasonParticipant'
                    user: {
                        __typename?: 'User'
                        id: string
                        profilePictureUrl?: string | null
                    }
                } | null
            }>
        }>
    }
}

export const ScreenDocument = gql`
    query Screen {
        viewer {
            id
            openGames {
                id
                ...GameCalendarItem
            }
        }
    }
    ${GameCalendarItemFragmentDoc}
`

export function useScreenQuery(
    options?: Omit<Urql.UseQueryArgs<ScreenQueryVariables>, 'query'>
) {
    return Urql.useQuery<ScreenQuery, ScreenQueryVariables>({
        query: ScreenDocument,
        ...options
    })
}
