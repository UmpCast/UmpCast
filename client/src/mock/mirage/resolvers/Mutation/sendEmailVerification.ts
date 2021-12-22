import { getAuth, sendSignInLinkToEmail } from 'firebase/auth'
import { loadAppExtra } from '@/app/common/utils/appBuild'
import { AppServerResolver } from '../../createPureMirageServer'

const sendEmailVerification: AppServerResolver = async (_, args) => {
    await sendSignInLinkToEmail(getAuth(), args.input.email, {
        url: `${loadAppExtra().APP_URL}${args.route}`,
        handleCodeInApp: true,
        dynamicLinkDomain: loadAppExtra().DYNAMIC_LINK_DOMAIN
    })

    return {
        errors: null,
        emailSent: true
    }
}

export default sendEmailVerification
