import { fireEvent, waitFor, within } from '@testing-library/react-native'

import {
    RootStack,
    RootStackParamList,
    RootStackRoute
} from '@/navigation/navigators/Root/Stack'
import { createIntegratedRenderer } from '@/testing/setup'
import { TestID } from '@/testing/testID'

import SeasonNavigateHeader, { SeasonNavigateRoute } from './Header'

beforeEach(() => {
    jest.useFakeTimers()
})

function setup<TRoute extends SeasonNavigateRoute>() {
    const { renderer, ...integrations } = createIntegratedRenderer()

    function PlaceholderScreen() {
        return null
    }

    return {
        ...integrations,
        render: (route: TRoute, params: RootStackParamList[TRoute]) =>
            renderer.render(
                /*  eslint-disable */
                <RootStack.Navigator>
                    <RootStack.Screen
                        component={PlaceholderScreen}
                        initialParams={params}
                        name={route}
                        options={(props: any) => ({
                            headerTitle: () => (
                                <SeasonNavigateHeader
                                    navigation={{
                                        ...props.navigation,
                                        ...integrations.navigation
                                    }}
                                    route={props.route}
                                />
                            )
                        })}
                    />
                </RootStack.Navigator>
                /*  eslint-disable */
            )
    }
}

it('renders correctly', async () => {
    const {
        render,
        resolvers: {
            Query: { season }
        }
    } = setup()

    season.mockImplementation(() => ({
        id: 'season-1',
        name: 'season 1'
    }))
    const app = render(RootStackRoute.Settings, {
        seasonId: 'season-1'
    })
    await app.findByText(/season 1/i)
    await app.findByText(/Settings/i)
})

it('navigates to a different season screen', async () => {
    const {
        render,
        resolvers: {
            Query: { season }
        },
        navigation: { navigate }
    } = setup()

    season.mockImplementation(() => ({
        id: 'season-1'
    }))
    const app = render(RootStackRoute.Settings, {
        seasonId: 'season-1'
    })
    const header = await app.findByText(/settings/i)

    fireEvent.press(header)
    const selectSheet = within(
        await app.findById(TestID.COMPONENT, 'SeasonNavigateSelectSheet')
    )
    const settingsItem = await selectSheet.findByText(/settings/i)

    fireEvent.press(settingsItem)
    await waitFor(() => {
        expect(
            app.queryById(TestID.COMPONENT, 'SeasonNavigateSelectSheet')
        ).toBeNull()
        expect(navigate).toHaveBeenCalledWith(RootStackRoute.Settings, {
            seasonId: 'season-1'
        })
    })
})
