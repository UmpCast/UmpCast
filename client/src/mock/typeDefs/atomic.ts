import { gql } from '@apollo/client'

const atomicSchema = gql`
    enum Role {
        MANAGER
        REFEREE
    }

    type InputError {
        key: String!
        message: String!
        from: String
    }
`

export default atomicSchema
