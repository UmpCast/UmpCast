import AppMockProvider from '@/core/App/Mock/Provider'
import { createRender } from '@/mock/render'
import { RootStackRoutes, RootStack } from '@/navigation'
import { NavigationContainer } from '@react-navigation/native'
import DivisionCreateScreen from './Screen'

function setup() {
    return createRender((client) => (
        <AppMockProvider client={client}>
            <NavigationContainer
                initialState={{
                    routes: [
                        {
                            name: RootStackRoutes.SeasonStructure,
                            params: {
                                seasonId: 'season-1'
                            }
                        }
                    ]
                }}
            >
                <RootStack.Navigator>
                    <RootStack.Screen
                        name={RootStackRoutes.SeasonStructure}
                        component={DivisionCreateScreen}
                    />
                </RootStack.Navigator>
            </NavigationContainer>
        </AppMockProvider>
    ))
}

it('should render correctly when shown', async () => {
    const utils = setup()

    await utils.findByText(/create division/i)
    await utils.findByText(/^create$/i)
})
