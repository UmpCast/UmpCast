import NetworkError from 'app/links/models/networkError'
import mockTerminatingLink from 'utils/__mocks__/terminatingLink'

export default function MockNetworkErrorLink(networkError: NetworkError) {
    return mockTerminatingLink((sub) => sub.error(networkError))
}
