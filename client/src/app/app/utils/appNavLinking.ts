import { loadAppExtra } from '@/app/common/utils/appBuild'

export const appNavConfig = {
    screens: {
        VerificationSent: 'verification-sent',
        EmailVerification: 'email-verification',
        Verify: 'verify'
    }
}

const appNavLinking = {
    prefixes: [loadAppExtra().APP_URL, `${loadAppExtra().APP_SCHEME}://`],
    config: appNavConfig
}

export default appNavLinking
