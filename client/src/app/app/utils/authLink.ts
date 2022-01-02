import { getAuth } from 'firebase/auth'

import { setContext } from '@apollo/client/link/context'

const AuthLink = setContext(async () => ({
    headers: { authorization: await getAuth().currentUser?.getIdToken() }
}))

export default AuthLink
