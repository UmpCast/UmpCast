import { GenericStack } from '@/app/common/utils/types'
import { PublicRoutes } from '../utils/publicNavigation'
import PrivacyPolicy from './PrivacyPolicy'

export default function getPublicGroup(Stack: GenericStack) {
    return (
        <Stack.Group key="Public">
            <Stack.Screen
                component={PrivacyPolicy}
                name={PublicRoutes.PrivacyPolicy}
            />
        </Stack.Group>
    )
}
