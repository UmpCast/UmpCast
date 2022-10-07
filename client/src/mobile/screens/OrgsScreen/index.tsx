import DividedList from '@/components/DividedList'
import ScreenContainer from '@/components/ScreenContainer'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import { useScreenQuery } from './index.generated'
import { HStack, Text } from 'native-base'
import Navigable from '@/components/Navigable'
import ActionButton from '@/components/ActionButton'
import OrgLogo from '@/features/OrgLogo'

type Props = RootStackScreenProps<RootStackRoute.Orgs>

export default function OrgsScreen({ navigation }: Props) {
    const { navigate } = navigation
    const [{ data: screenData }] = useScreenQuery()

    if (!screenData) {
        return null
    }

    const { viewer } = screenData

    const onCreatePress = () => {
        navigate(RootStackRoute.CreateOrg)
    }

    const onOrgPress = (orgId: string) => {
        navigate(RootStackRoute.Org, {
            orgId
        })
    }

    return (
        <ScreenContainer
            title="Organizations"
            headerRight={<ActionButton onPress={onCreatePress}>Create</ActionButton>}
        >
            <DividedList.Group>
                {viewer.joinedOrganizations.map((joinedOrg) => {
                    const { organization: org } = joinedOrg
                    return (
                        <DividedList.Item key={org.id} onPress={() => onOrgPress(org.id)}>
                            <HStack space="sm" alignItems="center">
                                <OrgLogo org={org} size="sm" />
                                <Text>{org.name}</Text>
                            </HStack>
                        </DividedList.Item>
                    )
                })}
            </DividedList.Group>
        </ScreenContainer>
    )
}
