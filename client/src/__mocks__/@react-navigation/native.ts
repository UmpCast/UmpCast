// eslint-disable-next-line import/no-import-module-exports
import { _useNavigation, _useRoute } from '@/mock/modules/reactNavigation'

const actual = jest.requireActual('@react-navigation/native')

module.exports = {
    ...actual,
    useNavigation: () => _useNavigation,
    useRoute: _useRoute
}
