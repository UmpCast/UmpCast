/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type JoinOrgMutationVariables = Types.Exact<{
    input: Types.JoinOrganizationInput
}>

export type JoinOrgMutation = {
    __typename?: 'Mutation'
    joinOrganization: { __typename?: 'JoinOrganizationPayload'; success: boolean }
}

export const JoinOrgDocument = gql`
    mutation JoinOrg($input: JoinOrganizationInput!) {
        joinOrganization(input: $input) {
            success
        }
    }
`

export function useJoinOrgMutation() {
    return Urql.useMutation<JoinOrgMutation, JoinOrgMutationVariables>(JoinOrgDocument)
}
