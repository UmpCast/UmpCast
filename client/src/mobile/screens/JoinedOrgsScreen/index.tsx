import DividedList from '@/components/DividedList'
import ScreenContainer from '@/components/ScreenContainer'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import { useScreenQuery } from './index.generated'
import { HStack, Text, useDisclose, VStack } from 'native-base'
import OrgLogo from '@/features/OrgLogo'
import ActionsheetX from '@/components/AppActionsheet'
import MaterialIcon from '@/components/MaterialIcon'
import IconOption from '@/components/MenuItem'
import AppPressable from '@/components/AppPressable'
import IconButton from '@/components/IconButton'

type Props = RootStackScreenProps<RootStackRoute.JoinedOrgs>

export default function JoinedOrgsScreen({ navigation }: Props) {
    const { navigate } = navigation

    const addOrgSheetDisclose = useDisclose()

    const [{ data: screenData }] = useScreenQuery()

    if (!screenData) {
        return null
    }

    const { viewer } = screenData

    const onOrgPress = (orgId: string) => {
        navigate(RootStackRoute.Org, {
            orgId
        })
    }

    const onCreateNewPress = () => {
        navigate(RootStackRoute.CreateOrg)
        addOrgSheetDisclose.onClose()
    }

    const onJoinExistingPress = () => {
        navigate(RootStackRoute.JoinOrg)
        addOrgSheetDisclose.onClose()
    }

    const onAddOrgPress = () => {
        addOrgSheetDisclose.onOpen()
    }

    return (
        <ScreenContainer
            title="Organizations"
            headerRight={<IconButton name="plus" variant="primary" onPress={onAddOrgPress} />}
        >
            <VStack space="sm">
                <DividedList.Group>
                    {viewer.joinedOrganizations.map((joinedOrg) => {
                        const { organization: org } = joinedOrg
                        return (
                            <DividedList.Item key={org.id} onPress={() => onOrgPress(org.id)}>
                                <HStack space="sm" alignItems="center">
                                    <OrgLogo org={org} size="sm" />
                                    <Text fontWeight="semibold">{org.name}</Text>
                                </HStack>
                            </DividedList.Item>
                        )
                    })}
                </DividedList.Group>
            </VStack>
            <ActionsheetX.Content {...addOrgSheetDisclose}>
                <ActionsheetX.Item onPress={onCreateNewPress}>
                    <IconOption icon={<MaterialIcon name="plus" color="primary.solid" />}>
                        <Text>Create new</Text>
                    </IconOption>
                </ActionsheetX.Item>
                <ActionsheetX.Item onPress={onJoinExistingPress}>
                    <IconOption icon={<MaterialIcon name="check" color="primary.solid" />}>
                        <Text>Join existing</Text>
                    </IconOption>
                </ActionsheetX.Item>
            </ActionsheetX.Content>
        </ScreenContainer>
    )
}
