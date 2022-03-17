import { BaseSetup } from '@/testing/setup'

import UserRegisterScreen from './Screen'

class Setup extends BaseSetup {
    constructor() {
        super(<UserRegisterScreen />)
    }
}

it('should render correctly', async () => {
    const setup = new Setup()

    const api = setup.render()
    await api.findByText(/register/i)
    await api.findByText(/cancel registration/i)
})
