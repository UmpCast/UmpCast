import navigationNative from '@/mock/modules/navigationNative'

const actual = jest.requireActual('@react-navigation/native')

module.exports = {
    ...actual,
    useNavigation: () => ({
        navigate: navigationNative.navigate
    })
}
