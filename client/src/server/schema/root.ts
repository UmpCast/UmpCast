import { gql } from 'urql'

const rootSchema = gql`
    scalar DateTime

    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }

    type InputError {
        key: String!

        message: String!
    }

    """
    Information about pagination in a connection.
    """
    type PageInfo {
        """
        When paginating forwards, the cursor to continue.
        """
        endCursor: String

        """
        When paginating forwards, are there more items?
        """
        hasNextPage: Boolean!

        """
        When paginating backwards, are there more items?
        """
        hasPreviousPage: Boolean!

        """
        When paginating backwards, the cursor to continue.
        """
        startCursor: String
    }

    interface Node {
        id: ID!

        dateCreated: DateTime!

        dateUpdated: DateTime!
    }

    interface Connection {
        pageInfo: PageInfo!

        totalCount: Int!
    }
`
export default rootSchema
