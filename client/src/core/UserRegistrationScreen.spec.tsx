import { BaseSetup } from '@/testing/setup'
import UserRegistrationScreen from './UserRegistrationScreen'

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
