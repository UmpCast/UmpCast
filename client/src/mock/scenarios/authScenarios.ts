import { sendSignInLinkToEmail, getAuth } from 'firebase/auth'

const authScenarios = {
    EMAIL_SIGNIN_DEFAULT: {
        Mutation: () => ({
            sendEmailVerification: (args: any) => {
                const {
                    email,
                    actionCodeSettings: {
                        url,
                        androidPackageName,
                        iosBundleId,
                        androidMinimumVersion,
                        dynamicLinkDomain
                    }
                } = args
                sendSignInLinkToEmail(getAuth(), email, {
                    url,
                    iOS: {
                        bundleId: iosBundleId
                    },
                    android: {
                        packageName: androidPackageName,
                        minimumVersion: androidMinimumVersion
                    },
                    handleCodeInApp: true,
                    dynamicLinkDomain
                })

                return {
                    errors: null
                }
            }
        })
    }
}

export default authScenarios
