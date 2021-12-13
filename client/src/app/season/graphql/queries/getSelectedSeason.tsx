import { gql } from '@apollo/client'

export const GET_SELECTED_SEASON = gql`
    query GetSelectedSeason {
        selectedSeason @client
    }
`
