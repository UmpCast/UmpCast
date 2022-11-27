/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import { OrgLogoFragmentDoc } from '../../../features/OrgLogo/index.generated'
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
        name: string
        description?: string | null
        email?: string | null
        websiteUrl?: string | null
        viewerMemberRole?: Types.OrganizationMemberRoleType | null
        logoUrl?: string | null
    }
}

export const ScreenDocument = gql`
    query Screen($orgId: ID!) {
        organization(id: $orgId) {
            id
            name
            description
            email
            websiteUrl
            viewerMemberRole
            ...OrgLogo
        }
    }
    ${OrgLogoFragmentDoc}
`

export function useScreenQuery(
    options: Omit<Urql.UseQueryArgs<ScreenQueryVariables>, 'query'>
) {
    return Urql.useQuery<ScreenQuery, ScreenQueryVariables>({
        query: ScreenDocument,
        ...options
    })
}
