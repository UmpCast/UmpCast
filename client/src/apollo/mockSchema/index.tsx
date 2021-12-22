import { gql } from '@apollo/client'

import organizationSchema from './organization'
import permitSchema from './permit'
import seasonSchema from './season'
import seasonInviteSchema from './seasonInvite'
import socialAuthSchema from './socialAuth'
import userSchema from './user'

const mockSchema = gql`
    ${userSchema}
    ${socialAuthSchema}
    ${organizationSchema}
    ${permitSchema}
    ${seasonSchema}
    ${seasonInviteSchema}

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
export default mockSchema
