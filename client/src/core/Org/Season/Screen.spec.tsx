import { fireEvent } from '@testing-library/react-native'

import { RootStackRoutes } from '@/core/App/Root/Stack'
import ErrorBoundary from '@/mock/ErrorBoundary'
import { _useNavigation, _useRoute } from '@/mock/modules/reactNavigation'
import { BaseSetup } from '@/mock/render'

import OrgSeasonScreen from './Screen'

class Setup extends BaseSetup {
    org = {
        id: 'organization-1'
    }

    constructor() {
        super(
            <ErrorBoundary>
                <OrgSeasonScreen />
            </ErrorBoundary>
        )
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
        seasonList: [
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
        seasonList: [
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
        RootStackRoutes.SeasonSettings,
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
        seasonList: []
    }))
    const api = setup.render()
    const createButton = await api.findByTestId('season-create-button')

    fireEvent.press(createButton)
    expect(_useNavigation.navigate).toHaveBeenCalledWith(
        RootStackRoutes.SeasonCreate,
        {
            orgId: setup.org.id
        }
    )
})
