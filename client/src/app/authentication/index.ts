import SignInView from './components/SignIn'
import EmailSignInReceivedHOC from './containers/EmailSignInRecievedHOC'
import EmailSignInSentHOC from './containers/EmailSignInSentHOC'

export const Screens = {
    Main: SignInView,
    EmailSent: EmailSignInSentHOC,
    Email: EmailSignInReceivedHOC
}
