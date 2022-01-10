import { Route } from '@react-navigation/native'

import AppNavigator from '@/components/AppNavigator'
import { appNavConfig } from '@/components/AppProd'
import MockAppProvider from '@/components/MockAppProvider'
import SignInLinkRedirectScreen from '@/components/SignInLinkRedirectScreen'
import { buildSignInParams } from '@/mocks/factories/buildSignInParams'
import RootStack, { RootStackRoutes } from '@/rootStack'
import { TestRenderOptions } from '@/types/render'
import { loadAppExtra } from '@/utils/expo'
import urqlMockingClient from '@/utils/urql'
import { addURLParams } from '@/utils/web'
import { render as rtlRender } from '@testing-library/react-native'

export const build = ({ platform }: { platform: 'web' | 'mobile' }) => {
    const { APP_URL, FIREBASE_AUTH_URL } = loadAppExtra()

    const [baseUrl, redirectRoute] =
        platform === 'web'
            ? [APP_URL, RootStackRoutes.SignInLinkRedirect]
            : [FIREBASE_AUTH_URL, RootStackRoutes.SignInLinkRedirectAlt]

    const redirectPath = appNavConfig.screens[redirectRoute]

    const params = buildSignInParams()

    const urlPath = new URL(redirectPath, baseUrl)

    addURLParams(urlPath, params)
    const path = urlPath.pathname + urlPath.search

    return {
        EMAIL: 'stored@mail.com',
        PARAMS: params,
        ROUTE: {
            name: redirectRoute,
            path,
            params
        }
    }
}

interface EmailReceivedRenderOptions
    extends TestRenderOptions<'button-only' | 'entire-app'> {
    route: Omit<Route<string>, 'key'>
}

export const render = ({
    resolvers,
    uses: use,
    route
}: EmailReceivedRenderOptions) => {
    const client = urqlMockingClient({ resolvers })

    return rtlRender(
        <MockAppProvider initialRoute={route} client={client} withNavigation>
            {use === 'button-only' ? (
                <RootStack.Navigator>
                    <RootStack.Screen
                        component={SignInLinkRedirectScreen}
                        name={RootStackRoutes.SignInLinkRedirect}
                    />
                    <RootStack.Screen
                        component={SignInLinkRedirectScreen}
                        name={RootStackRoutes.SignInLinkRedirectAlt}
                    />
                </RootStack.Navigator>
            ) : (
                <AppNavigator />
            )}
        </MockAppProvider>
    )
}
