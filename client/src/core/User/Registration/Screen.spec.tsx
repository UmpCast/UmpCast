import { BaseSetup } from '@/mock/render'

import UserRegistrationScreen from './Screen'

class Setup extends BaseSetup {
    constructor() {
        super(<UserRegistrationScreen />)
    }
}

it('should render correctly', async () => {
    const setup = new Setup()

    const api = setup.render()
    await api.findByText(/register/i)
    await api.findByText(/cancel registration/i)
})
