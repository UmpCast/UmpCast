import { GraphQLError } from 'graphql'
import mockTerminatingLink from 'utils/__mocks__/terminatingLink'
import { ACCESS_TOKEN_EXPIRED } from '../../constants'
import authErrorLink from '../authErrorLink'
import mockLinkExecution from '../__mocks__/linkExecution'

const MockGraphQLErrorLink = (errors: Partial<GraphQLError>[]) =>
    mockTerminatingLink((sub) => {
        sub.next({ errors })
        sub.complete()
    })

describe('authErrorLink ApolloLink', () => {
    it('logs the user out, when refresh token is expired', async () => {
        const terminatingLink = MockGraphQLErrorLink([
            {
                message: ACCESS_TOKEN_EXPIRED
            }
        ])

        await mockLinkExecution(authErrorLink, terminatingLink)
    })

    it('retries the request with a new token, when refresh token is valid', async () => {
        const terminatingLink = MockGraphQLErrorLink([
            {
                message: ACCESS_TOKEN_EXPIRED
            }
        ])

        await mockLinkExecution(authErrorLink, terminatingLink)
    })
})
