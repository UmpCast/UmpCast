/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type UploadOrgLogoMutationVariables = Types.Exact<{
    input: Types.UploadOrganizationLogoInput
}>

export type UploadOrgLogoMutation = {
    __typename?: 'Mutation'
    uploadOrganizationLogo: {
        __typename?: 'UploadOrganizationLogoPayload'
        success: boolean
    }
}

export const UploadOrgLogoDocument = gql`
    mutation UploadOrgLogo($input: UploadOrganizationLogoInput!) {
        uploadOrganizationLogo(input: $input) {
            success
        }
    }
`

export function useUploadOrgLogoMutation() {
    return Urql.useMutation<
        UploadOrgLogoMutation,
        UploadOrgLogoMutationVariables
    >(UploadOrgLogoDocument)
}
