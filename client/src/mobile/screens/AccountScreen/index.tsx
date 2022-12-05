import { VStack, HStack, Text, Heading, useDisclose, Icon } from 'native-base'

import ActionsheetX from '@/components/OverlaySheet'
import DividedList from '@/components/DividedList'
import MaterialIcon from '@/components/MaterialIcon'
import Navigable from '@/components/Navigable'
import ScreenContainer from '@/components/ScreenContainer'
import OrgLogo from '@/features/OrgLogo'
import UserAvatar from '@/features/UserAvatar'
import { NavRoute } from '@/mobile/navigation/routes'

import MenuItem from '../../../components/MenuItem'
import { useAuth } from '../../AuthContext'

import { useScreenQuery } from './index.generated'
import { TabsStackScreenProps } from '@/mobile/navigation/types'
import { useAppTheme } from '@/hooks/useAppTheme'
import { Feather } from '@expo/vector-icons'
import HeaderIconButton from '@/components/HeaderIconButton'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Props = TabsStackScreenProps<NavRoute.Account>

export default function AccountScreen({ navigation }: Props) {
    const { navigate } = navigation

    const theme = useAppTheme()

    const optionSheetDisclose = useDisclose()

    const auth = useAuth()

    const [{ data: screenData }] = useScreenQuery()

    if (!screenData) {
        return null
    }

    const { viewer } = screenData

    const { joinedOrganizations } = viewer

    const onAboutPress = () => {
        navigate(NavRoute.ViewerAbout)
        optionSheetDisclose.onClose()
    }

    const onNotificationsPress = () => {}

    const onLogoutPress = async () => {
        await AsyncStorage.clear()
        auth.signOut()
    }

    const onOptionsPress = () => {
        optionSheetDisclose.onOpen()
    }

    const onOrganizationsPress = () => {
        navigate(NavRoute.JoinedOrgs)
    }

    const onToggleThemePress = () => {
        theme.toggle()
    }

    const { colorMode } = theme

    return (
        <ScreenContainer
            headerRight={
                <HeaderIconButton
                    name="cog"
                    variant="secondary"
                    onPress={onOptionsPress}
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
                    <MenuItem
                        icon={
                            <MaterialIcon
                                name="information-outline"
                                color="primary.solid"
                            />
                        }
                    >
                        <Text>About</Text>
                    </MenuItem>
                </ActionsheetX.Item>
                <ActionsheetX.Item onPress={onNotificationsPress}>
                    <MenuItem
                        icon={
                            <MaterialIcon
                                name="bell-outline"
                                color="primary.solid"
                            />
                        }
                    >
                        <Text>Notifications</Text>
                    </MenuItem>
                </ActionsheetX.Item>
                <ActionsheetX.Item onPress={onToggleThemePress}>
                    <MenuItem
                        icon={
                            <Icon
                                as={Feather}
                                name={colorMode === 'light' ? 'moon' : 'sun'}
                                color="primary.solid"
                            />
                        }
                    >
                        <Text>
                            {colorMode == 'light' ? 'Dark' : 'Light'} mode
                        </Text>
                    </MenuItem>
                </ActionsheetX.Item>
                <ActionsheetX.Item onPress={onLogoutPress}>
                    <MenuItem
                        icon={
                            <MaterialIcon name="logout" color="primary.solid" />
                        }
                    >
                        <Text>Sign out</Text>
                    </MenuItem>
                </ActionsheetX.Item>
            </ActionsheetX.Content>
        </ScreenContainer>
    )
}
