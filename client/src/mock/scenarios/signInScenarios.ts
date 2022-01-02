import { IResolvers } from '@graphql-tools/utils'
import { sendSignInLinkToEmail, getAuth } from 'firebase/auth'

type SignInScenarioOption = 'EMAIL_SIGN_IN_DEFAULT'

const signInScenarios: Record<SignInScenarioOption, IResolvers> = {
    EMAIL_SIGN_IN_DEFAULT: {
        Mutation: {
            sendSignInLink: (_, args) => {
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
        }
    }
}

export default signInScenarios
