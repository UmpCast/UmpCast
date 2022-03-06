import { BaseSetup } from '@/mock/render'
import SeasonMemberAddScreen from './Screen'

class Setup extends BaseSetup {
    season = {
        id: 'season-1'
    }

    constructor() {
        super(<SeasonMemberAddScreen />)
    }
}

it('adds users to a season', () => {
    const setup = new Setup()
    const {
        Query: { season }
    } = setup.resolvers
})
