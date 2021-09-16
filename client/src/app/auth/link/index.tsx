import { from } from '@apollo/client'

import authErrorLink from 'app/links/authLink/authErrorLink'
import authHeaderLink from 'app/links/authLink/authHeaderLink'

const authLink = from([authErrorLink, authHeaderLink])
export default authLink
