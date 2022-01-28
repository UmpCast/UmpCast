import AppMockProvider from '@/core/App/Mock/Provider'
import { createRender } from '@/mock/render'
import { RootStack, RootStackRoutes } from '@/navigation'
import { NavigationContainer } from '@react-navigation/native'
import PositionCreateScreen from './Screen'

function setup() {
    return createRender((client) => (
        <AppMockProvider client={client}>
            <NavigationContainer
                initialState={{
                    routes: [
                        {
                            name: RootStackRoutes.CreatePosition,
                            params: {
                                divisionId: 'divsion-1'
                            }
                        }
                    ]
                }}
            >
                <RootStack.Navigator>
                    <RootStack.Screen
                        name={RootStackRoutes.CreatePosition}
                        component={PositionCreateScreen}
                    />
                </RootStack.Navigator>
            </NavigationContainer>
        </AppMockProvider>
    ))
}

it('should render correctly when shown', async () => {
    const utils = setup()

    await utils.findByText(/create position/i)
    await utils.findByText(/^create$/i)
})
