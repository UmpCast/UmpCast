import SignInView from './components/SignIn'
import EmailSignInReceived from './containers/EmailSignInRecieved'
import EmailSignInSent from './containers/EmailSignInSent'

export const Screens = {
    Main: SignInView,
    EmailSent: EmailSignInSent,
    EmailReceived: EmailSignInReceived
}
