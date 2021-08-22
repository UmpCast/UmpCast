import { ApolloLink, gql, execute, DocumentNode, from } from '@apollo/client'

export class MockOperation {
    context: {}

    constructor() {
        this.context = {}
    }

    setContext(update: {}) {
        this.context = {
            ...this.context,
            update
        }
    }

    getContext() {
        return this.context
    }
}

export function mockLinkExecution(
    testLink: ApolloLink,
    assertLink: ApolloLink,
    query: DocumentNode | null = null
): Promise<void> {
    return new Promise((resolve) => {
        const mockQuery =
            query ||
            gql`
                query mockLinkExecution {
                    me {
                        firstName
                    }
                }
            `

        const mockLink = from([testLink, assertLink])

        execute(mockLink, { query: mockQuery }).subscribe({
            next: () => {},
            error: resolve,
            complete: resolve
        })
    })
}
