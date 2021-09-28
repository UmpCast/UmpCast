import { ApolloLink, gql, execute } from '@apollo/client'

export default function mockLinkExecution(link: ApolloLink) {
    const mockQuery = gql`
        query {
            foo
        }
    `

    return execute(link, { query: mockQuery })
}

export const mockSingleExecutionRequest = (link: ApolloLink) =>
    new Promise((resolve) => {
        let returned: any = null
        mockLinkExecution(link).subscribe({
            next: (value: any) => {
                returned = value
            },
            complete: () => resolve(returned)
        })
    })
