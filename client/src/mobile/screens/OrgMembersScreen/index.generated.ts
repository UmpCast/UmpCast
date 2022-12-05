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
            viewerCanRemove: boolean
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

export type OrgMembersScreen_OrganizationMemberFragment = {
    __typename?: 'OrganizationMember'
    viewerCanRemove: boolean
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
}

export const OrgMembersScreen_OrganizationMemberFragmentDoc = gql`
    fragment OrgMembersScreen_OrganizationMember on OrganizationMember {
        user {
            id
            ...UserItem
        }
        membership {
            role
        }
        viewerCanRemove
    }
    ${UserItemFragmentDoc}
`
export const ScreenDocument = gql`
    query Screen($orgId: ID!) {
        organization(id: $orgId) {
            id
            members {
                ...OrgMembersScreen_OrganizationMember
            }
        }
    }
    ${OrgMembersScreen_OrganizationMemberFragmentDoc}
`

export function useScreenQuery(
    options: Omit<Urql.UseQueryArgs<ScreenQueryVariables>, 'query'>
) {
    return Urql.useQuery<ScreenQuery, ScreenQueryVariables>({
        query: ScreenDocument,
        ...options
    })
}
