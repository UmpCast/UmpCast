import { HStack, Text, useDisclose, VStack } from 'native-base'

import ActionsheetX from '@/components/OptionSheet'
import DividedList from '@/components/DividedList'
import IconButton from '@/components/IconButton'
import MaterialIcon from '@/components/MaterialIcon'
import IconOption from '@/components/MenuItem'
import ScreenContainer from '@/components/ScreenContainer'
import OrgLogo from '@/features/OrgLogo'
import { TabsStackRoute } from '@/mobile/navigation/navigators/TabsStack/types'
import { RootStackScreenProps } from '@/mobile/navigation/types'

import { useScreenQuery } from './index.generated'

type Props = RootStackScreenProps<TabsStackRoute.JoinedOrgs>

export default function JoinedOrgsScreen({ navigation }: Props) {
    const { navigate } = navigation

    const addOrgSheetDisclose = useDisclose()

    const [{ data: screenData }] = useScreenQuery()

    if (!screenData) {
        return null
    }

    const { viewer } = screenData

    const onOrgPress = (orgId: string) => {
        navigate(TabsStackRoute.Org, {
            orgId
        })
    }

    const onCreateNewPress = () => {
        navigate(TabsStackRoute.CreateOrg)
        addOrgSheetDisclose.onClose()
    }

    const onJoinExistingPress = () => {
        navigate(TabsStackRoute.JoinOrg)
        addOrgSheetDisclose.onClose()
    }

    const onAddOrgPress = () => {
        addOrgSheetDisclose.onOpen()
    }

    return (
        <ScreenContainer
            title="Organizations"
            headerRight={
                <IconButton
                    name="plus"
                    variant="primary"
                    onPress={onAddOrgPress}
                />
            }
        >
            <VStack space="sm">
                <DividedList.Group>
                    {viewer.joinedOrganizations.map((joinedOrg) => {
                        const { organization: org } = joinedOrg
                        return (
                            <DividedList.Item
                                key={org.id}
                                onPress={() => onOrgPress(org.id)}
                            >
                                <HStack space="sm" alignItems="center">
                                    <OrgLogo org={org} size="sm" />
                                    <Text fontWeight="semibold">
                                        {org.name}
                                    </Text>
                                </HStack>
                            </DividedList.Item>
                        )
                    })}
                </DividedList.Group>
            </VStack>
            <ActionsheetX.Content {...addOrgSheetDisclose}>
                <ActionsheetX.Item onPress={onCreateNewPress}>
                    <IconOption
                        icon={
                            <MaterialIcon name="plus" color="primary.solid" />
                        }
                    >
                        <Text>Create new</Text>
                    </IconOption>
                </ActionsheetX.Item>
                <ActionsheetX.Item onPress={onJoinExistingPress}>
                    <IconOption
                        icon={
                            <MaterialIcon name="check" color="primary.solid" />
                        }
                    >
                        <Text>Join existing</Text>
                    </IconOption>
                </ActionsheetX.Item>
            </ActionsheetX.Content>
        </ScreenContainer>
    )
}
