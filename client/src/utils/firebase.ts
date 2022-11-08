import { TabsStackRoute } from '@/mobile/navigation/navigators/TabsStack/types'

import { ExpoExtra } from './expo'

export function getActionCodeSettings(extra: ExpoExtra) {
    const {
        APP_URL,
        APP_PACKAGE_NAME,
        ANDROID_MINIMUM_VERSION,
        DYNAMIC_LINK_DOMAIN
    } = extra

    return {
        url: new URL(TabsStackRoute.LoginLink, APP_URL).href,
        iosBundleId: APP_PACKAGE_NAME,
        androidPackageName: APP_PACKAGE_NAME,
        dynamicLinkDomain: DYNAMIC_LINK_DOMAIN,
        androidMinimumVersion: ANDROID_MINIMUM_VERSION
    }
}
