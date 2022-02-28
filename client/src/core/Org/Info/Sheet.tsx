import { Actionsheet, Divider, Heading, Text, VStack } from 'native-base'

import {
    OrganizationPermissionLevel,
    OrgInfoSheet_PermitFragment
} from '@/generated'

import OrganizationActionIcon from '../Action/Icon'
import OrganizationActionItem from '../Action/Item'
import OrgLogo from '../Logo/Logo'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'

interface OrgInfoSheetProps {
    permit: OrgInfoSheet_PermitFragment | null
    isOpen: boolean
    onClose: () => void
}

type ScreenNavigationProp = NavigationProp<
    RootStackParamList,
    RootStackRoutes.Home
>

export default function OrgInfoSheet({
    permit,
    isOpen,
    onClose
}: OrgInfoSheetProps) {
    const { navigate } = useNavigation<ScreenNavigationProp>()

    if (!permit) return null

    const {
        organization: { id, title, description },
        permissionLevel
    } = permit

    return (
        <Actionsheet
            hideDragIndicator
            isOpen={isOpen}
            onClose={onClose}
            testID="org-info-sheet"
        >
            <Actionsheet.Content alignItems="stretch" p={4}>
                <VStack space={3}>
                    <OrgLogo org={permit.organization} />
                    <VStack space={2}>
                        <Heading color="blueGray.700" fontSize="md">
                            {title}
                        </Heading>
                        <Text color="blueGray.600" fontSize="xs">
                            {description}
                        </Text>
                    </VStack>
                    <Divider color="blueGray.200" />
                    <VStack>
                        <OrganizationActionItem
                            borderTopRadius={5}
                            icon={<OrganizationActionIcon name="team" />}
                            onPress={() => {
                                navigate(RootStackRoutes.OrgMembers, {
                                    id
                                })
                                onClose()
                            }}
                            title="Members"
                        />
                        <OrganizationActionItem
                            borderBottomRadius={5}
                            icon={<OrganizationActionIcon name="bells" />}
                            onPress={() => {}}
                            title="Notifications"
                        />
                    </VStack>
                    {permissionLevel === OrganizationPermissionLevel.Owner ? (
                        <OrganizationActionItem
                            borderRadius={5}
                            icon={<OrganizationActionIcon name="setting" />}
                            onPress={() => {
                                navigate(RootStackRoutes.OrgSettings, {
                                    id
                                })
                                onClose()
                            }}
                            title="Settings"
                        />
                    ) : null}
                </VStack>
            </Actionsheet.Content>
        </Actionsheet>
    )
}
