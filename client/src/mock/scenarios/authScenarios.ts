import { IResolvers } from '@graphql-tools/utils'
import { sendSignInLinkToEmail, getAuth } from 'firebase/auth'

const authScenarios: Record<string, IResolvers> = {
    EMAIL_SIGNIN_DEFAULT: {
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

export default authScenarios
