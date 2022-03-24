import { fireEvent } from '@testing-library/react-native'

import { AppRootStackRoute } from '@/core/App/Root/Stack'
import { _useRoute, _useNavigation } from '@/testing/modules/reactNavigation'
import { BaseSetup } from '@/testing/setup'
import { TestID, IconID } from '@/testing/testID'

import OrgSeasonListScreen from './Screen'

class Setup extends BaseSetup {
    org = {
        id: 'organization-1'
    }

    constructor() {
        super(<OrgSeasonListScreen />)
    }

    withRoute() {
        _useRoute.mockReturnValue({
            params: {
                id: this.org.id
            }
        })
    }
}

it('shows active seasons', async () => {
    const setup = new Setup()

    setup.withRoute()
    const {
        resolvers: {
            Query: { organization }
        }
    } = setup
    organization.mockImplementationOnce(() => ({
        seasons: [
            {
                name: 'season 1',
                startDate: new Date('Jan 1 2022').toISOString(),
                endDate: new Date('Mar 1 2022').toISOString()
            }
        ]
    }))
    const api = setup.render()
    await api.findByText(/season 1/i)
    await api.findByText(/jan 1 - mar 1/i)
})

it('navigates to a seasons settings screen', async () => {
    const setup = new Setup()

    setup.withRoute()
    const {
        resolvers: {
            Query: { organization }
        }
    } = setup
    organization.mockImplementationOnce(() => ({
        seasons: [
            {
                id: 'season-1',
                name: 'season 1'
            }
        ]
    }))
    const api = setup.render()
    const seasonItem = await api.findByText(/season 1/i)

    fireEvent.press(seasonItem)
    expect(_useNavigation.navigate).toHaveBeenCalledWith(
        AppRootStackRoute.SeasonSettings,
        {
            id: 'season-1'
        }
    )
})

it('navigates to season create screen', async () => {
    const setup = new Setup()
    const {
        Query: { organization }
    } = setup.resolvers

    setup.withRoute()
    organization.mockImplementationOnce(() => ({
        seasons: []
    }))
    const api = setup.render()
    const createButton = await api.findById(TestID.ICON, IconID.SEASON_CREATE)

    fireEvent.press(createButton)
    expect(_useNavigation.navigate).toHaveBeenCalledWith(
        AppRootStackRoute.SeasonCreate,
        {
            orgId: setup.org.id
        }
    )
})