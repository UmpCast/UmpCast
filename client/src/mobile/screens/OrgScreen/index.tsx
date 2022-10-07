import { Heading, HStack, Text, useDisclose, VStack } from 'native-base'

import OptionSheet from '@/components/ActionsheetX'
import DividedList from '@/components/DividedList'
import MaterialIcon from '@/components/MaterialIcon'
import PressableX from '@/components/PressableX'
import ScreenContainer from '@/components/ScreenContainer'
import OrgLogo from '@/features/OrgLogo'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'

import { useScreenQuery } from './index.generated'

type Props = RootStackScreenProps<RootStackRoute.CreateSeason>

export default function OrgScreen({ route, navigation }: Props) {
    const { params } = route
    const { navigate } = navigation
    const { orgId } = params

    const optionSheetDisclose = useDisclose()

    const [{ data }] = useScreenQuery({
        variables: {
            orgId
        }
    })

    if (!data?.organization) {
        return null
    }

    const { organization: org } = data

    const onOptionsPress = () => {
        optionSheetDisclose.onOpen()
    }

    const onOrgAboutPress = () => {
        optionSheetDisclose.onClose()
        navigate(RootStackRoute.OrgAbout, {
            orgId
        })
    }

    const onOrgBillingPress = () => {}

    const onOrgTemplatesPress = () => {}

    return (
        <ScreenContainer
            headerRight={
                <PressableX
                    borderRadius="full"
                    onPress={onOptionsPress}
                    size="icon"
                    variant="secondary.ghost"
                >
                    <MaterialIcon name="dots-horizontal" size="lg" />
                </PressableX>
            }
            title="Organization"
        >
            <VStack space="lg">
                <VStack space="md">
                    <VStack alignItems="center">
                        <OrgLogo org={org} size="2xl" />
                    </VStack>
                    <VStack alignItems="center" space="2xs">
                        <HStack alignItems="center" justifyContent="space-between" space="md">
                            <Heading>Palo Alto Little League</Heading>
                        </HStack>
                        <Text color="secondary.mute">Ages 7 - 15 for kids in the PA Bay Area</Text>
                    </VStack>
                </VStack>
                <DividedList.Group>
                    <DividedList.Item>
                        <HStack alignItems="center" justifyContent="space-between">
                            <Text>Members</Text>
                            <HStack alignItems="center" space="md">
                                <HStack alignItems="center">
                                    <Text color="secondary.mute">27</Text>
                                    <MaterialIcon color="secondary.mute" name="account" />
                                </HStack>
                                <MaterialIcon color="primary.solid" name="chevron-right" />
                            </HStack>
                        </HStack>
                    </DividedList.Item>
                    <DividedList.Item>
                        <HStack alignItems="center" justifyContent="space-between">
                            <Text>Seasons</Text>
                            <HStack alignItems="center" space="md">
                                <HStack alignItems="center" space="2xs">
                                    <MaterialIcon color="primary.solid" name="record" size="xs" />
                                    <Text color="secondary.mute">3 active</Text>
                                </HStack>
                                <MaterialIcon color="primary.solid" name="chevron-right" />
                            </HStack>
                        </HStack>
                    </DividedList.Item>
                </DividedList.Group>
            </VStack>
            <OptionSheet.Content {...optionSheetDisclose}>
                <OptionSheet.Item onPress={onOrgAboutPress}>
                    <HStack alignItems="center" space="md">
                        <MaterialIcon name="information-outline" />
                        <Text>About</Text>
                    </HStack>
                </OptionSheet.Item>
                <OptionSheet.Item onPress={onOrgBillingPress}>
                    <HStack alignItems="center" space="md">
                        <MaterialIcon name="wallet-outline" />
                        <Text>Billing</Text>
                    </HStack>
                </OptionSheet.Item>
                <OptionSheet.Item onPress={onOrgTemplatesPress}>
                    <HStack alignItems="center" space="md">
                        <MaterialIcon name="content-copy" />
                        <Text>Templates</Text>
                    </HStack>
                </OptionSheet.Item>
            </OptionSheet.Content>
        </ScreenContainer>
    )
}
