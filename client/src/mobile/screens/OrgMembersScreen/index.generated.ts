/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import { UserItemFragmentDoc } from '../../../features/UserItem/index.generated'
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
        members: Array<{
            __typename?: 'OrganizationMember'
            user: {
                __typename?: 'User'
                id: string
                firstName: string
                lastName: string
                profilePictureUrl?: string | null
            }
            membership: {
                __typename?: 'OrganizationMembership'
                role: Types.OrganizationMemberRoleType
            }
        }>
    }
}

export const ScreenDocument = gql`
    query Screen($orgId: ID!) {
        organization(id: $orgId) {
            id
            members {
                user {
                    id
                    ...UserItem
                }
                membership {
                    role
                }
            }
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
