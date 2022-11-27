/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import { UserItemFragmentDoc } from '../../../features/UserItem/index.generated'
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
        participants: Array<{
            __typename?: 'SeasonParticipant'
            user: {
                __typename?: 'User'
                id: string
                firstName: string
                lastName: string
                profilePictureUrl?: string | null
            }
            permit: {
                __typename?: 'SeasonParticipantPermit'
                role: Types.SeasonParticipantRoleType
            }
        }>
    }
}

export const ScreenDocument = gql`
    query Screen($seasonId: ID!) {
        season(id: $seasonId) {
            id
            participants {
                user {
                    id
                    ...UserItem
                }
                permit {
                    role
                }
            }
            viewerCanManage
        }
    }
    ${UserItemFragmentDoc}
`

export function useScreenQuery(
    options: Omit<Urql.UseQueryArgs<ScreenQueryVariables>, 'query'>
) {
    return Urql.useQuery<ScreenQuery, ScreenQueryVariables>({
        query: ScreenDocument,
        ...options
    })
}
