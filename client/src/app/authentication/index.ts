import SignInView from './components/SignIn'
import EmailSignInHOC from './containers/EmailSignInHOC'
import EmailSignInSentHOC from './containers/EmailSignInSentHOC'

export const Screens = {
    Main: SignInView,
    EmailSent: EmailSignInSentHOC,
    Email: EmailSignInHOC
}
