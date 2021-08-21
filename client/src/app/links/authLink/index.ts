import { from } from '@apollo/client';

import authErrorLink from './authErrorLink'
import authHeaderLink from './authHeaderLink'

const authLink = from([authErrorLink, authHeaderLink])
export default authLink
