import { NavigationContainer } from '@react-navigation/native'
import { act, fireEvent } from '@testing-library/react-native'
import { Text } from 'native-base'

import { RootStack, RootStackRoutes } from '@/navigation'
import MockAppProvider from '@/test/components/MockAppProvider'
import { createRender } from '@/test/setup'

import CreatePositionScreen from '.'

function MockSeasonStructScreen() {
    return <Text>Season Structure</Text>
}

const setup = () =>
    createRender((client) => (
        <MockAppProvider client={client}>
            <NavigationContainer
                initialState={{
                    routes: [
                        {
                            name: RootStackRoutes.CreatePosition,
                            params: {
                                divisionId: 'division-1'
                            }
                        }
                    ]
                }}
            >
                <RootStack.Navigator
                    initialRouteName={RootStackRoutes.CreatePosition}
                >
                    <RootStack.Screen
                        component={CreatePositionScreen}
                        name={RootStackRoutes.CreatePosition}
                    />
                    <RootStack.Screen
                        component={MockSeasonStructScreen}
                        name={RootStackRoutes.SeasonStructure}
                    />
                </RootStack.Navigator>
            </NavigationContainer>
        </MockAppProvider>
    ))

it('should render correctly when shown', async () => {
    const utils = setup()

    await utils.findByText(/create position/i)
})

it('should redirect to season struct when created', async () => {
    const positionInput = {
        name: 'new position'
    }

    // Render form
    const utils = setup()

    // Submit valid form
    utils.resolvers.Mutation.createPosition.mockReturnValue({
        errors: []
    })

    await act(() => utils.fillForm(positionInput))
    fireEvent.press(await utils.findByText(/^create$/i))

    await utils.findByText(/season structure/i)
})
