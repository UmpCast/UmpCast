/* eslint-disable */
import * as Types from '../../mock/schema.generated'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type ViewerParticipantRoleQueryVariables = Types.Exact<{
    seasonId: Types.Scalars['ID']
}>

export type ViewerParticipantRoleQuery = {
    __typename?: 'Query'
    season: {
        __typename?: 'Season'
        id: string
        viewerParticipantRole?: Types.SeasonParticipantRoleType | null
    }
}

export const ViewerParticipantRoleDocument = gql`
    query ViewerParticipantRole($seasonId: ID!) {
        season(id: $seasonId) {
            id
            viewerParticipantRole
        }
    }
`

export function useViewerParticipantRoleQuery(
    options: Omit<
        Urql.UseQueryArgs<ViewerParticipantRoleQueryVariables>,
        'query'
    >
) {
    return Urql.useQuery<
        ViewerParticipantRoleQuery,
        ViewerParticipantRoleQueryVariables
    >({ query: ViewerParticipantRoleDocument, ...options })
}
