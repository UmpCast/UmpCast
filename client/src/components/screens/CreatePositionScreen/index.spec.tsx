import { RootStack, RootStackRoutes } from '@/navigation'
import MockAppProvider from '@/test/components/MockAppProvider'
import { createRender } from '@/test/setup'
import CreatePositionScreen from '.'
import { Text } from 'native-base'
import { act, fireEvent } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'

const MockSeasonStructScreen = () => {
    return <Text>Season Structure</Text>
}

const setup = () => {
    return createRender((client) => (
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
                        name={RootStackRoutes.CreatePosition}
                        component={CreatePositionScreen}
                    />
                    <RootStack.Screen
                        name={RootStackRoutes.SeasonStructure}
                        component={MockSeasonStructScreen}
                    />
                </RootStack.Navigator>
            </NavigationContainer>
        </MockAppProvider>
    ))
}

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
