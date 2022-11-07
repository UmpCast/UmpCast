/* eslint-disable */
import * as Types from '../../mock/schema.generated'

import gql from 'graphql-tag'
import { UserAvatarFragmentDoc } from '../UserAvatar/index.generated'
export type GameCalendarItemFragment = {
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

export const GameCalendarItemFragmentDoc = gql`
    fragment GameCalendarItem on Game {
        id
        name
        startTime
        location
        listings {
            id
            assignee {
                user {
                    ...UserAvatar
                }
            }
        }
    }
    ${UserAvatarFragmentDoc}
`
