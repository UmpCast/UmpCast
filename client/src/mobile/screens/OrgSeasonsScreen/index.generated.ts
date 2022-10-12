/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import { OrgLogoFragmentDoc } from '../../../features/OrgLogo/index.generated'
import { UserAvatarFragmentDoc } from '../../../features/UserAvatar/index.generated'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type ScreenQueryVariables = Types.Exact<{
    orgId: Types.Scalars['ID']
}>

export type ScreenQuery = {
    __typename?: 'Query'
    organization: {
        __typename?: 'Organization'
        id: string
        viewerCanManage: boolean
        name: string
        logoUrl?: string | null
        seasons: Array<{
            __typename?: 'Season'
            id: string
            name: string
            participants: Array<{
                __typename?: 'SeasonParticipant'
                user: { __typename?: 'User'; id: string; profilePictureUrl?: string | null }
            }>
        }>
    }
}

export const ScreenDocument = gql`
    query Screen($orgId: ID!) {
        organization(id: $orgId) {
            id
            ...OrgLogo
            seasons {
                id
                name
                participants {
                    user {
                        ...UserAvatar
                    }
                }
            }
            viewerCanManage
        }
    }
    ${OrgLogoFragmentDoc}
    ${UserAvatarFragmentDoc}
`

export function useScreenQuery(options: Omit<Urql.UseQueryArgs<ScreenQueryVariables>, 'query'>) {
    return Urql.useQuery<ScreenQuery>({ query: ScreenDocument, ...options })
}
