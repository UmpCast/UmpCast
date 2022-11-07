/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import { UserAvatarFragmentDoc } from '../../../features/UserAvatar/index.generated'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type ScreenQueryVariables = Types.Exact<{
    gameListingId: Types.Scalars['ID']
}>

export type ScreenQuery = {
    __typename?: 'Query'
    gameListing: {
        __typename?: 'GameListing'
        id: string
        assignee?: {
            __typename?: 'SeasonParticipant'
            user: { __typename?: 'User'; id: string }
        } | null
        availableAssignees: Array<{
            __typename?: 'User'
            id: string
            firstName: string
            lastName: string
            profilePictureUrl?: string | null
        }>
    }
}

export const ScreenDocument = gql`
    query Screen($gameListingId: ID!) {
        gameListing(id: $gameListingId) {
            id
            assignee {
                user {
                    id
                }
            }
            availableAssignees {
                id
                firstName
                lastName
                ...UserAvatar
            }
        }
    }
    ${UserAvatarFragmentDoc}
`

export function useScreenQuery(
    options: Omit<Urql.UseQueryArgs<ScreenQueryVariables>, 'query'>
) {
    return Urql.useQuery<ScreenQuery, ScreenQueryVariables>({
        query: ScreenDocument,
        ...options
    })
}
