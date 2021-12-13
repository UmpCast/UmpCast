import { gql } from '@apollo/client'

export const GET_OWNED_ORGANIZATIONS = gql`
    query GetOwnedOrganizations {
        me {
            id
            ownedOrganizationList {
                id
                name
            }
        }
    }
`
