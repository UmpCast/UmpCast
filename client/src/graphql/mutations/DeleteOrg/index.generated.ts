/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type DeleteOrgMutationVariables = Types.Exact<{
    input: Types.DeleteOrganizationInput
}>

export type DeleteOrgMutation = {
    __typename?: 'Mutation'
    deleteOrganization: { __typename?: 'DeleteOrganizationPayload'; success: boolean }
}

export const DeleteOrgDocument = gql`
    mutation DeleteOrg($input: DeleteOrganizationInput!) {
        deleteOrganization(input: $input) {
            success
        }
    }
`

export function useDeleteOrgMutation() {
    return Urql.useMutation<DeleteOrgMutation, DeleteOrgMutationVariables>(DeleteOrgDocument)
}
