import { initialLoader } from 'app/provider/models/Loader'
import { loaderVar } from 'global/client'

describe('useLoader Hook', () => {
    describe('returned loader', () => {
        beforeEach(() => loaderVar(initialLoader))

        it('sets loaderVar when subscription starts', () => {
            loaderVar({
                ...loaderVar(),
                subscribed: true
            })
        })

        it('returns the promised response after unsubscribed', () => {})

        it('provides a callback to setMessage', () => {})
    })

    describe('setMessage callback', () => {
        it('sets the message field of the loaderVar when called', () => {})
    })
})
