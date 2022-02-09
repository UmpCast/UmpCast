// eslint-disable-next-line import/no-import-module-exports
import navigationNative from '@/mock/modules/navigationNative'

const actual = jest.requireActual('@react-navigation/native')

module.exports = {
    ...actual,
    useNavigation: navigationNative.useNavigation,
    useRoute: navigationNative.useRoute
}
