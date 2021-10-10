import { gql } from '@apollo/client'

import BaseClient from 'apollo/baseClient'

import { GetAuthentication } from './__generated__/GetAuthentication'

export const GET_AUTHENTICATION = gql`
    query GetAuthentication {
        authentication @client {
            refreshToken
            accessToken
        }
    }
`

export default async function getAuthentication() {
    return BaseClient().readQuery<GetAuthentication>({
        query: GET_AUTHENTICATION
    })
}
