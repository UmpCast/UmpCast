/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import { OrgLogoFragmentDoc } from '../../../features/OrgLogo/index.generated'
import { UserAvatarFragmentDoc } from '../../../features/UserAvatar/index.generated'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type GameScreenQueryVariables = Types.Exact<{
    gameId: Types.Scalars['ID']
}>

export type GameScreenQuery = {
    __typename?: 'Query'
    game?: {
        __typename?: 'Game'
        id: string
        name: string
        startTime: Date
        endTime?: Date | null
        location?: string | null
        listings: Array<{
            __typename?: 'GameListing'
            id: string
            name: string
            canAssignSelf?: boolean | null
            canChangeAssignee?: boolean | null
            assignee?: {
                __typename?: 'SeasonParticipant'
                user: {
                    __typename?: 'User'
                    id: string
                    firstName: string
                    lastName: string
                    profilePictureUrl?: string | null
                }
            } | null
        }>
        division: {
            __typename?: 'Division'
            id: string
            name: string
            season: {
                __typename?: 'Season'
                id: string
                name: string
                organization: {
                    __typename?: 'Organization'
                    id: string
                    name: string
                    logoUrl?: string | null
                }
            }
        }
    } | null
}

export type GameScreen_GameListingFragment = {
    __typename?: 'GameListing'
    id: string
    name: string
    canAssignSelf?: boolean | null
    canChangeAssignee?: boolean | null
    assignee?: {
        __typename?: 'SeasonParticipant'
        user: {
            __typename?: 'User'
            id: string
            firstName: string
            lastName: string
            profilePictureUrl?: string | null
        }
    } | null
}

export const GameScreen_GameListingFragmentDoc = gql`
    fragment GameScreen_GameListing on GameListing {
        id
        name
        assignee {
            user {
                id
                firstName
                lastName
                ...UserAvatar
            }
        }
        canAssignSelf
        canChangeAssignee
    }
    ${UserAvatarFragmentDoc}
`
export const GameScreenDocument = gql`
    query GameScreen($gameId: ID!) {
        game(id: $gameId) {
            id
            name
            startTime
            endTime
            location
            listings {
                id
                ...GameScreen_GameListing
            }
            division {
                id
                name
                season {
                    id
                    name
                    organization {
                        id
                        ...OrgLogo
                    }
                }
            }
        }
    }
    ${GameScreen_GameListingFragmentDoc}
    ${OrgLogoFragmentDoc}
`

export function useGameScreenQuery(
    options: Omit<Urql.UseQueryArgs<GameScreenQueryVariables>, 'query'>
) {
    return Urql.useQuery<GameScreenQuery, GameScreenQueryVariables>({
        query: GameScreenDocument,
        ...options
    })
}
