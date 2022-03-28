import { fireEvent } from '@testing-library/react-native'

import {
    RootStackParamList,
    RootStackRoute
} from '@/navigation/navigators/Root/Stack'
import { _useRoute, _useNavigation } from '@/testing/modules/reactNavigation'
import { ScreenSetup } from '@/testing/setupV2'
import { TestID, IconID } from '@/testing/testID'

import OrganizationSeasonsScreen from '.'

class Setup extends ScreenSetup<
    RootStackParamList,
    RootStackRoute.OrganizationSeasons
> {
    constructor() {
        super(OrganizationSeasonsScreen)
    }
}

it('shows active seasons', async () => {
    const setup = new Setup()
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
    const api = setup.render({
        orgId: 'organization-1'
    })
    await api.findByText(/season 1/i)
    await api.findByText(/jan 1 - mar 1/i)
})

it('navigates to a seasons settings screen', async () => {
    const setup = new Setup()
    const {
        resolvers: {
            Query: { organization }
        },
        navigation: { navigate }
    } = setup

    organization.mockImplementationOnce(() => ({
        seasons: [
            {
                id: 'season-1',
                name: 'season 1'
            }
        ]
    }))
    const api = setup.render({
        orgId: 'organization-1'
    })
    const seasonItem = await api.findByText(/season 1/i)

    fireEvent.press(seasonItem)
    expect(navigate).toHaveBeenCalledWith(RootStackRoute.SeasonSettings, {
        seasonId: 'season-1'
    })
})

it('navigates to season create screen', async () => {
    const setup = new Setup()
    const {
        resolvers: {
            Query: { organization }
        },
        navigation: { navigate }
    } = setup

    organization.mockImplementationOnce(() => ({
        seasons: []
    }))
    const api = setup.render({
        orgId: 'organization-1'
    })
    const createButton = await api.findById(TestID.ICON, IconID.SEASON_CREATE)

    fireEvent.press(createButton)
    expect(navigate).toHaveBeenCalledWith(
        RootStackRoute.OrganizationSeasonNew,
        {
            orgId: 'organization-1'
        }
    )
})
