import { from } from 'zen-observable'

import networkErrorLink from './networkErrorLink'
import retryLink from './retryLink'

const networkLink = from([networkErrorLink, retryLink])

export default networkLink
