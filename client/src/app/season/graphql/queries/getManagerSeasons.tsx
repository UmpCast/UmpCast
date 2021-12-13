import { gql } from '@apollo/client'

export const GET_MANAGER_SEASONS = gql`
    query GetManagerSeasons {
        me {
            userPermit {
                managerPermitList(active: true) {
                    season {
                        id
                        name
                        organization {
                            id
                            name
                        }
                    }
                }
            }
        }
    }
`
