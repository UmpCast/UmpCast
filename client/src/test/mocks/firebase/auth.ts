import * as auth from 'firebase/auth'
import { mocked } from 'jest-mock'

const mAuth = mocked(auth, true)

const triggerAuthStateChanged = ({ withUser }: { withUser: boolean }) => {
    const callback = mAuth.onAuthStateChanged.mock.calls[0][1] as any
    callback(withUser ? {} : null)
}

export default {
    mock: {
        triggerAuthStateChanged
    },
    ...mAuth
}
