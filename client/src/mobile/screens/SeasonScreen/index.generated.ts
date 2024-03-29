/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import { OrgLogoFragmentDoc } from '../../../features/OrgLogo/index.generated'
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
        name: string
        participantCount: number
        organization: {
            __typename?: 'Organization'
            id: string
            name: string
            logoUrl?: string | null
        }
    }
}

export const ScreenDocument = gql`
    query Screen($seasonId: ID!) {
        season(id: $seasonId) {
            id
            name
            participantCount
            organization {
                id
                name
                ...OrgLogo
            }
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
