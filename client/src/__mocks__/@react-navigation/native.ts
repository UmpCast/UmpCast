import { mockNavigate } from '@/thing'

const actual = jest.requireActual('@react-navigation/native')

module.exports = {
    ...actual,
    useNavigation: () => ({
        navigate: mockNavigate
    })
}
