import { VStack, HStack, Text, Heading, useDisclose } from 'native-base'

import ActionsheetX from '@/components/OptionSheet'
import DividedList from '@/components/DividedList'
import IconButton from '@/components/IconButton'
import MaterialIcon from '@/components/MaterialIcon'
import Navigable from '@/components/Navigable'
import ScreenContainer from '@/components/ScreenContainer'
import OrgLogo from '@/features/OrgLogo'
import UserAvatar from '@/features/UserAvatar'
import { TabsStackRoute } from '@/mobile/navigation/navigators/TabsStack/types'

import IconOption from '../../../components/MenuItem'
import { useAuth } from '../../root/AuthContext'

import { useScreenQuery } from './index.generated'
import { TabsStackScreenProps } from '@/mobile/navigation/types'

type Props = TabsStackScreenProps<TabsStackRoute.Account>

export default function AccountScreen({ navigation }: Props) {
    const { navigate } = navigation

    const optionSheetDisclose = useDisclose()

    const auth = useAuth()

    const [{ data: screenData }] = useScreenQuery()

    if (!screenData) {
        return null
    }

    const { viewer } = screenData

    const { joinedOrganizations } = viewer

    const onAboutPress = () => {
        navigate(TabsStackRoute.ViewerAbout)
        optionSheetDisclose.onClose()
    }

    const onNotificationsPress = () => {}

    const onLogoutPress = async () => {
        auth.signOut()
    }

    const onOptionsPress = () => {
        optionSheetDisclose.onOpen()
    }

    const onOrganizationsPress = () => {
        navigate(TabsStackRoute.JoinedOrgs)
    }

    return (
        <ScreenContainer
            headerRight={
                <IconButton
                    name="cog"
                    onPress={onOptionsPress}
                    variant="secondary"
                    size="lg"
                />
            }
            title="Account"
        >
            <VStack space="lg">
                <VStack space="md">
                    <VStack alignItems="center">
                        <UserAvatar user={viewer} size="2xl" />
                    </VStack>
                    <VStack alignItems="center" space="2xs">
                        <HStack
                            alignItems="center"
                            justifyContent="space-between"
                            space="md"
                        >
                            <Heading>
                                {viewer.firstName} {viewer.lastName}
                            </Heading>
                        </HStack>
                    </VStack>
                </VStack>
                <DividedList.Group>
                    <DividedList.Item onPress={onOrganizationsPress}>
                        <Navigable
                            extra={
                                <HStack space="sm">
                                    {joinedOrganizations.map((joinedOrg) => {
                                        const { organization: org } = joinedOrg
                                        return (
                                            <OrgLogo
                                                org={org}
                                                size="xs"
                                                key={org.id}
                                            />
                                        )
                                    })}
                                </HStack>
                            }
                        >
                            <Text>Organizations</Text>
                        </Navigable>
                    </DividedList.Item>
                </DividedList.Group>
            </VStack>
            <ActionsheetX.Content {...optionSheetDisclose}>
                <ActionsheetX.Item onPress={onAboutPress}>
                    <IconOption
                        icon={
                            <MaterialIcon
                                name="information-outline"
                                color="primary.solid"
                            />
                        }
                    >
                        <Text>About</Text>
                    </IconOption>
                </ActionsheetX.Item>
                <ActionsheetX.Item onPress={onNotificationsPress}>
                    <IconOption
                        icon={
                            <MaterialIcon
                                name="bell-outline"
                                color="primary.solid"
                            />
                        }
                    >
                        <Text>Notifications</Text>
                    </IconOption>
                </ActionsheetX.Item>
                <ActionsheetX.Item onPress={onLogoutPress}>
                    <IconOption
                        icon={
                            <MaterialIcon name="logout" color="primary.solid" />
                        }
                    >
                        <Text>Sign out</Text>
                    </IconOption>
                </ActionsheetX.Item>
            </ActionsheetX.Content>
        </ScreenContainer>
    )
}
