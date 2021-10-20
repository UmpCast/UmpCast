import { gql, useMutation } from '@apollo/client'

import { GET_MANAGER_ORGANIZATIONS } from '../queries/getManagerOrganizations'
import { AddOrg, AddOrgVariables } from './__generated__/AddOrg'

export const CREATE_ORGANIZATION = gql`
    mutation CreateOrganization($input: OrganizationCreateMutationTypeInput!) {
        createOrganization(input: $input) {
            name
            id
        }
    }
`

export default function useAddOrg() {
    return useMutation<AddOrg, AddOrgVariables>(CREATE_ORGANIZATION, {
        refetchQueries: [GET_MANAGER_ORGANIZATIONS]
    })
}
