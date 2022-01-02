import SignInView from './components/SignIn'
import EmailSignInReceivedHOC from './containers/EmailSignInRecieved'
import EmailSignInSentHOC from './containers/EmailSignInSent'

export const Screens = {
    Main: SignInView,
    EmailSent: EmailSignInSentHOC,
    EmailReceived: EmailSignInReceivedHOC
}
