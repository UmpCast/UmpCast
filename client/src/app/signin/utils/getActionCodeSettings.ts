import { appNavConfig } from '@/app/navigation/components/AppNavigationContainer'
import { AppExtra } from '@/app/common/utils/appExtra'

export default function getActionCodeSettings(extra: AppExtra) {
    const {
        APP_URL,
        APP_PACKAGE_NAME,
        ANDROID_MINIMUM_VERSION,
        DYNAMIC_LINK_DOMAIN
    } = extra

    return {
        url: new URL(appNavConfig.screens.EmailSignInReceived, APP_URL).href,
        iosBundleId: APP_PACKAGE_NAME,
        androidPackageName: APP_PACKAGE_NAME,
        dynamicLinkDomain: DYNAMIC_LINK_DOMAIN,
        androidMinimumVersion: ANDROID_MINIMUM_VERSION
    }
}
