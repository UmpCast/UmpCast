import {
    RootStack,
    RootStackParamList,
    RootStackRoute
} from '@/navigation/navigators/Root/Stack'
import { createIntegratedRenderer } from '@/testing/setup'
import { TestID } from '@/testing/testID'
import { fireEvent, waitFor, within } from '@testing-library/react-native'
import SeasonNavigateHeader, { SeasonNavigateRoute } from './Header'

beforeEach(() => {
    jest.useFakeTimers()
})

function setup<TRoute extends SeasonNavigateRoute>() {
    const { renderer, ...integrations } = createIntegratedRenderer()

    const PlaceholderScreen = () => {
        return null
    }

    return {
        ...integrations,
        render: (route: TRoute, params: RootStackParamList[TRoute]) => {
            return renderer.render(
                <RootStack.Navigator>
                    <RootStack.Screen
                        name={route}
                        component={PlaceholderScreen}
                        options={(props: any) => {
                            return {
                                headerTitle: () => (
                                    <SeasonNavigateHeader
                                        route={props.route}
                                        navigation={{
                                            ...props.navigation,
                                            ...integrations.navigation
                                        }}
                                    />
                                )
                            }
                        }}
                        initialParams={params}
                    />
                </RootStack.Navigator>
            )
        }
    }
}

it('renders correctly', async () => {
    const {
        render,
        resolvers: {
            Query: { season }
        }
    } = setup()

    season.mockImplementation(() => {
        return {
            id: 'season-1',
            name: 'season 1'
        }
    })
    const app = render(RootStackRoute.SeasonSettings, {
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

    season.mockImplementation(() => {
        return {
            id: 'season-1'
        }
    })
    const app = render(RootStackRoute.SeasonSettings, {
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
        expect(navigate).toHaveBeenCalledWith(RootStackRoute.SeasonSettings, {
            seasonId: 'season-1'
        })
    })
})
