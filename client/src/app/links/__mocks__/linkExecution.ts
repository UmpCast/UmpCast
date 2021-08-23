import { ApolloLink, gql, execute, DocumentNode, from } from '@apollo/client'

export default function mockLinkExecution(
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
