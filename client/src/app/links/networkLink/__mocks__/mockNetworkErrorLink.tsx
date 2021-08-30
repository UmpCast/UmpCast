import mockTerminatingLink from 'app/links/__mocks__/terminatingLink'
import NetworkError from 'app/links/models/networkError'

export default function MockNetworkErrorLink(networkError: NetworkError) {
    return mockTerminatingLink((sub) => sub.error(networkError))
}
