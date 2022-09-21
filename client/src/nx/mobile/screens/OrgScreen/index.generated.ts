/* eslint-disable */
import * as Types from '../../../graphql/schema'

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
        logoUrl: string | null
    } | null
}

export const ScreenDocument = gql`
    query Screen($orgId: ID!) {
        organization(id: $orgId) {
            id
            ...OrgLogo
        }
    }
    ${OrgLogoFragmentDoc}
`

export function useScreenQuery(options: Omit<Urql.UseQueryArgs<ScreenQueryVariables>, 'query'>) {
    return Urql.useQuery<ScreenQuery>({ query: ScreenDocument, ...options })
}
