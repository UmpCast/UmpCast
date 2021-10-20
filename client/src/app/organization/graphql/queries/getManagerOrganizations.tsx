import { gql } from '@apollo/client'

export const GET_MANAGER_ORGANIZATIONS = gql`
    query GetManagerOrganizations {
        me {
            portals {
                manager {
                    organization {
                        id
                        name
                    }
                }
            }
        }
    }
`
