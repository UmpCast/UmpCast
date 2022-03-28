import { RootStackRoute } from '@/navigation/navigators/Root/Stack'

import { AppExtra } from './expo'

export function getActionCodeSettings(extra: AppExtra) {
    const {
        APP_URL,
        APP_PACKAGE_NAME,
        ANDROID_MINIMUM_VERSION,
        DYNAMIC_LINK_DOMAIN
    } = extra

    return {
        url: new URL(RootStackRoute.LoginLink, APP_URL).href,
        iosBundleId: APP_PACKAGE_NAME,
        androidPackageName: APP_PACKAGE_NAME,
        dynamicLinkDomain: DYNAMIC_LINK_DOMAIN,
        androidMinimumVersion: ANDROID_MINIMUM_VERSION
    }
}
