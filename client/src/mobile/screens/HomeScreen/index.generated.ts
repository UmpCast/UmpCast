/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import { UserAvatarFragmentDoc } from '../../../features/UserAvatar/index.generated'
import { GameCalendarItemFragmentDoc } from '../../../features/GameCalendar/Item.generated'
import { OrgLogoFragmentDoc } from '../../../features/OrgLogo/index.generated'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type ScreenQueryVariables = Types.Exact<{ [key: string]: never }>

export type ScreenQuery = {
    __typename?: 'Query'
    viewer: {
        __typename?: 'User'
        id: string
        profilePictureUrl?: string | null
        assignedListings: Array<{
            __typename?: 'GameListing'
            id: string
            name: string
            game: {
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
            }
        }>
        participatingSeasons: Array<{
            __typename?: 'ParticipatingSeason'
            season: {
                __typename?: 'Season'
                id: string
                name: string
                participants: Array<{
                    __typename?: 'SeasonParticipant'
                    user: {
                        __typename?: 'User'
                        id: string
                        profilePictureUrl?: string | null
                    }
                }>
                organization: {
                    __typename?: 'Organization'
                    id: string
                    name: string
                    logoUrl?: string | null
                }
            }
        }>
    }
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
                    ...GameCalendarItem
                }
            }
            participatingSeasons {
                season {
                    id
                    name
                    participants {
                        user {
                            ...UserAvatar
                        }
                    }
                    organization {
                        id
                        name
                        ...OrgLogo
                    }
                }
            }
        }
    }
    ${UserAvatarFragmentDoc}
    ${GameCalendarItemFragmentDoc}
    ${OrgLogoFragmentDoc}
`

export function useScreenQuery(
    options?: Omit<Urql.UseQueryArgs<ScreenQueryVariables>, 'query'>
) {
    return Urql.useQuery<ScreenQuery, ScreenQueryVariables>({
        query: ScreenDocument,
        ...options
    })
}
