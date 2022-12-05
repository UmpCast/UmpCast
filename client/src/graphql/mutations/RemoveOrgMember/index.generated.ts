/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RemoveOrgMemberMutationVariables = Types.Exact<{
    input: Types.LeaveOrganizationInput
}>

export type RemoveOrgMemberMutation = {
    __typename?: 'Mutation'
    leaveOrganization: {
        __typename?: 'LeaveOrganizationPayload'
        success: boolean
    }
}

export const RemoveOrgMemberDocument = gql`
    mutation RemoveOrgMember($input: LeaveOrganizationInput!) {
        leaveOrganization(input: $input) {
            success
        }
    }
`

export function useRemoveOrgMemberMutation() {
    return Urql.useMutation<
        RemoveOrgMemberMutation,
        RemoveOrgMemberMutationVariables
    >(RemoveOrgMemberDocument)
}
