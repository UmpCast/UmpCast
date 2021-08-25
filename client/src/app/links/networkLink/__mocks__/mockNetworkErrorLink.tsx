import createTerminatingLink from 'app/links/__mocks__/createTerminatingLink'
import NetworkError from 'app/links/models/networkError'

export default function MockNetworkErrorLink(networkError: NetworkError) {
    return createTerminatingLink((sub) => sub.error(networkError))
}
