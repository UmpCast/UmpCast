/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import { OrgLogoFragmentDoc } from '../../../features/OrgLogo/index.generated'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type ScreenQueryVariables = Types.Exact<{ [key: string]: never }>

export type ScreenQuery = {
    __typename?: 'Query'
    viewer: {
        __typename?: 'User'
        id: string
        joinedOrganizations: Array<{
            __typename?: 'JoinedOrganization'
            organization: {
                __typename?: 'Organization'
                id: string
                name: string
                logoUrl?: string | null
            }
        }>
    }
}

export const ScreenDocument = gql`
    query Screen {
        viewer {
            id
            joinedOrganizations {
                organization {
                    id
                    name
                    ...OrgLogo
                }
            }
        }
    }
    ${OrgLogoFragmentDoc}
`

export function useScreenQuery(options?: Omit<Urql.UseQueryArgs<ScreenQueryVariables>, 'query'>) {
    return Urql.useQuery<ScreenQuery>({ query: ScreenDocument, ...options })
}
