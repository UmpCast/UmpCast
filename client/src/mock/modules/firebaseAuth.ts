import * as auth from 'firebase/auth'
import { mocked } from 'jest-mock'

const _ = mocked(auth, true)

function triggerAuthStateChanged({ withUser }: { withUser: boolean }) {
    const callback = _.onAuthStateChanged.mock.calls[0][1] as any
    callback(withUser ? {} : null)
}

export default {
    mock: {
        triggerAuthStateChanged
    },
    ..._
}
