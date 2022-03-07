// eslint-disable-next-line import/no-import-module-exports
import { _useNavigation, _useRoute } from '@/testing/modules/reactNavigation'

const actual = jest.requireActual('@react-navigation/native')

module.exports = {
    ...actual,
    useNavigation: () => ({
        ...actual.useNavigation(),
        ..._useNavigation
    }),
    useRoute: _useRoute
}
