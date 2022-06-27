import { Feather } from '@expo/vector-icons'
import { Button, VStack } from 'native-base'

import ScreenContainer from '@/blocks/Screen/Container'
import SettingsItem from '@/blocks/Settings/Item'
import SettingsItemGroup from '@/blocks/Settings/ItemGroup'
import SettingsItemIcon from '@/blocks/Settings/ItemIcon'
import SettingsItemPressable from '@/blocks/Settings/ItemPressable'
import UserAccountBanner from '@/features/User/core/Account/Banner'
import { useMeScreenQuery } from '@/generated'
import { HomeBottomTabRoute } from '@/navigation/navigators/Home/BottomTab'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { HomeBottomTabScreenProp } from '@/navigation/types'

export type MeScreenProps = HomeBottomTabScreenProp<HomeBottomTabRoute.Me>

export default function MeScreen({ navigation }: MeScreenProps) {
    const { navigate } = navigation
    const [{ data }] = useMeScreenQuery()

    return (
        <ScreenContainer pt={6}>
            <VStack space={6}>
                {data?.viewer && <UserAccountBanner user={data.viewer} />}
                <VStack space={6}>
                    <SettingsItemGroup divider={false}>
                        <SettingsItemPressable
                            onPress={() => {
                                navigate(RootStackRoute.Account, undefined)
                            }}
                        >
                            <SettingsItem
                                icon={
                                    <SettingsItemIcon
                                        as={Feather}
                                        name="user"
                                    />
                                }
                                navigateIcon={false}
                                title="Account"
                            />
                        </SettingsItemPressable>
                        <SettingsItem
                            icon={<SettingsItemIcon as={Feather} name="bell" />}
                            navigateIcon={false}
                            title="Notifications"
                        />
                    </SettingsItemGroup>
                    <Button colorScheme="indigo" variant="subtle">
                        Log out
                    </Button>
                </VStack>
            </VStack>
        </ScreenContainer>
    )
}
