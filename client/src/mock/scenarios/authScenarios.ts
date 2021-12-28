import { sendSignInLinkToEmail, getAuth } from 'firebase/auth'
import { loadAppExtra } from '@/app/common/utils/appExtra'

const authScenarios = {
    EMAIL_VERIF_DEFAULT: {
        Mutation: () => ({
            sendEmailVerification: (obj: any) => {
                const redirectUrl = new URL(obj.route, loadAppExtra().APP_URL)

                sendSignInLinkToEmail(getAuth(), obj.input.email, {
                    url: redirectUrl.href,
                    android: {
                        packageName: loadAppExtra().ANDROID_PACKAGE
                    },
                    handleCodeInApp: true,
                    dynamicLinkDomain: loadAppExtra().DYNAMIC_LINK_DOMAIN
                })

                return {
                    errors: null
                }
            }
        })
    }
}

export default authScenarios
