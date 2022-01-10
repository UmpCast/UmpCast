import { renderOnRegister } from './onRegister.setup'

it('registers the user when valid inputs provided', async () => {
    const { findByText } = renderOnRegister()

    await findByText(/register/i)
})
