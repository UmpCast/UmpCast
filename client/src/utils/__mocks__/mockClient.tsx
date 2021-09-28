import { DocumentNode } from 'graphql'
import { MockApolloClient } from 'mock-apollo-client'

export function setMockedRequestHandler(
    mockClient: MockApolloClient,
    request: DocumentNode
): jest.Mock {
    const mockFn = jest.fn()
    mockClient.setRequestHandler(request, mockFn)
    return mockFn
}

export interface HandlerSpec {
    [key: string]: DocumentNode
}

export interface MockedHandlers {
    [key: string]: jest.Mock
}

export default function setClientMockHandlers(
    client: MockApolloClient,
    spec: HandlerSpec
): MockedHandlers {
    const handlers: MockedHandlers = {}

    Object.entries(spec).forEach(([key, request]) => {
        handlers[key] = setMockedRequestHandler(client, request)
    })

    return handlers
}
