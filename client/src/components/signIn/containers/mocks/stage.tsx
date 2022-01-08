import InitializedApp from '@/components/app/containers/InitializedApp'
import AppMockingProvider from '@/components/common/AppMockingProvider'
import RootStack, { RootStackRoutes } from '@/navigation/rootStack'
import { RenderOptions } from '@/utils/test'
import urqlMockingClient from '@/utils/urql'
import { Route } from '@react-navigation/native'
import { fireEvent, render } from '@testing-library/react-native'
import EmailFormContainer from '../EmailFormContainer'
import EmailReceivedContainer from '../EmailReceivedContainer'
import EmailSentContainer from '../EmailSentContainer'
import FacebookButtonContainer from '../FacebookButtonContainer'
import GoogleButtonContainer from '../GoogleButtonContainer'

interface EmailReceivedRenderOptions
    extends RenderOptions<'button-only' | 'sign-in'> {
    route: Omit<Route<string>, 'key'>
}

export const emailForm = ({ resolvers }: RenderOptions<'default'>) => {
    const client = urqlMockingClient({ resolvers })

    const utils = render(
        <AppMockingProvider client={client} withNavigation>
            <RootStack.Navigator>
                <RootStack.Screen
                    component={EmailFormContainer}
                    name={RootStackRoutes.SignIn}
                />
                <RootStack.Screen
                    component={EmailSentContainer}
                    name={RootStackRoutes.SignInEmailSent}
                />
            </RootStack.Navigator>
        </AppMockingProvider>
    )

    const typeEmail = async (email: string) =>
        fireEvent.changeText(await utils.findByTestId('email-input'), email)
    const clickContinue = async () =>
        fireEvent.press(await utils.findByText(/continue with email/i))

    return {
        typeEmail,
        clickContinue,
        ...utils
    }
}

export const emailReceived = ({
    resolvers,
    setup,
    route
}: EmailReceivedRenderOptions) => {
    const client = urqlMockingClient({ resolvers })

    const utils = render(
        <AppMockingProvider initialRoute={route} client={client} withNavigation>
            {setup === 'button-only' ? (
                <RootStack.Navigator>
                    <RootStack.Screen
                        component={EmailReceivedContainer}
                        name={RootStackRoutes.SignInEmailRecieved}
                    />
                </RootStack.Navigator>
            ) : (
                <InitializedApp />
            )}
        </AppMockingProvider>
    )

    return utils
}

export const facebookButton = ({
    resolvers
}: RenderOptions<'default'> = {}) => {
    const client = urqlMockingClient({ resolvers })

    const utils = render(
        <AppMockingProvider client={client}>
            <FacebookButtonContainer />
        </AppMockingProvider>
    )
    const clickContinue = async () =>
        fireEvent.press(await utils.findByText(/continue with facebook/i))

    return {
        clickContinue,
        ...utils
    }
}

export const googleButton = ({ resolvers }: RenderOptions<'default'>) => {
    const client = urqlMockingClient({ resolvers })

    const utils = render(
        <AppMockingProvider client={client}>
            <GoogleButtonContainer />
        </AppMockingProvider>
    )

    const clickContinue = async () =>
        fireEvent.press(await utils.findByText(/continue with google/i))

    return {
        clickContinue,
        ...utils
    }
}
