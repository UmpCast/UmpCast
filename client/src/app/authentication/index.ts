import SignInView from './components/SignIn'
import EmailSignInRedirectHOC from './containers/EmailSignInRedirectHOC'
import EmailSignInSentHOC from './containers/EmailSignInSentHOC'

export const Screens = {
    Main: SignInView,
    EmailSent: EmailSignInSentHOC,
    EmailRedirect: EmailSignInRedirectHOC
}
