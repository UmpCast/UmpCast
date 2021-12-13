import { gql } from '@apollo/client'

import serverSchema from 'schema.graphql'
import mockSchema from './mockSchema'

const fullSchema = gql`
    ${serverSchema}
    ${mockSchema}

    type foo {
        bar: String
    }
`

export default fullSchema
