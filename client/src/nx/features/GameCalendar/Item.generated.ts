/* eslint-disable */
import * as Types from '../../graphql/schema'

import gql from 'graphql-tag'
import { UserAvatarFragmentDoc } from '../UserAvatar/index.generated'
export type GameCalendarItemFragment = {
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

export const GameCalendarItemFragmentDoc = gql`
    fragment GameCalendarItem on Game {
        id
        name
        startTime
        location
        listings {
            id
            assignee {
                node {
                    ...UserAvatar
                }
            }
        }
    }
    ${UserAvatarFragmentDoc}
`
