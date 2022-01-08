import AppMockingProvider from '@/components/common/AppMockingProvider'
import EmailFormContainer from '@/components/signIn/containers/EmailFormContainer'
import EmailSentContainer from '@/components/signIn/containers/EmailSentContainer'
import RootStack, { RootStackRoutes } from '@/navigation/rootStack'
import urqlMockingClient from '@/utils/urql'

export default function Dev() {
    const resolvers = {
        Mutation: {
            sendSignInLink: () => ({
                errors: null
            })
        }
    }

    const client = urqlMockingClient({ resolvers })

    return (
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
}
