import { Heading, HStack, Text, useDisclose, VStack } from 'native-base'

import OrgProfileLogo from '@/features/Org/core/Profile/Logo'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import DividedList from '@/nx/components/DividedList'
import MaterialIcon from '@/nx/components/MaterialIcon'
import ScreenContainer from '@/nx/components/ScreenContainer'

import { useScreenQuery } from './index.generated'
import PressableX from '@/nx/components/PressableX'
import OptionSheet from '@/nx/components/OptionSheet'

type Props = RootStackScreenProps<RootStackRoute.CreateSeason>

export default function OrgScreen({ route }: Props) {
    const { params } = route
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

    const onOrgAboutPress = () => {}

    const onOrgBillingPress = () => {}

    const onOrgTemplatesPress = () => {}

    return (
        <ScreenContainer
            title="Organization"
            headerRight={
                <PressableX
                    borderRadius="full"
                    variant="secondary.ghost"
                    size="icon"
                    onPress={onOptionsPress}
                >
                    <MaterialIcon name="dots-horizontal" size="lg" />
                </PressableX>
            }
        >
            <VStack space={4}>
                <VStack alignItems="center">
                    <OrgProfileLogo org={org} size="75px" />
                </VStack>
                <VStack alignItems="center" space={1}>
                    <HStack alignItems="center" justifyContent="space-between" space={4}>
                        <Heading>Palo Alto Little League</Heading>
                    </HStack>
                    <Text color="secondary.mute">Ages 7 - 15 for kids in the PA Bay Area</Text>
                </VStack>
                {/* <VStack space={4}>
                    <HStack justifyContent="space-between" alignItems="center" mr={2}>
                        <HStack space={3} alignItems="center">
                            <MaterialIcon name="map-marker" color="secondary.600" size="lg" />
                            <Text>Palo Alto CA</Text>
                        </HStack>
                        <PressableX borderRadius="full" variant="primary.ghost" p={1}>
                            <MaterialIcon name="arrow-top-right" color="primary.solid" size="sm"/>
                        </PressableX>
                    </HStack>
                    <HStack justifyContent="space-between" alignItems="center" mr={2}>
                        <HStack space={3} alignItems="center">
                            <MaterialIcon name="email" color="secondary.600" size="lg" />
                            <Text>bob@pabaseball.org</Text>
                        </HStack>
                        <PressableX borderRadius="full" variant="primary.ghost" p={1}>
                            <MaterialIcon name="arrow-top-right" color="primary.solid" size="sm"/>
                        </PressableX>
                    </HStack>
                </VStack> */}
                <DividedList.Container mt={2}>
                    <DividedList.Item>
                        <HStack alignItems="center" justifyContent="space-between">
                            <Text>Members</Text>
                            <HStack alignItems="center" space={4}>
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
                            <HStack alignItems="center" space={4}>
                                <HStack alignItems="center" space={1}>
                                    <MaterialIcon color="primary.solid" name="record" size="xs" />
                                    <Text color="secondary.mute">3 active</Text>
                                </HStack>
                                <MaterialIcon color="primary.solid" name="chevron-right" />
                            </HStack>
                        </HStack>
                    </DividedList.Item>
                </DividedList.Container>
            </VStack>
            <OptionSheet.Container {...optionSheetDisclose}>
                <OptionSheet.Content>
                    <OptionSheet.Item onPress={onOrgAboutPress}>
                        <HStack space={4} alignItems="center">
                            <MaterialIcon name="information-outline" />
                            <Text>About</Text>
                        </HStack>
                    </OptionSheet.Item>
                    <OptionSheet.Item onPress={onOrgBillingPress}>
                        <HStack space={4} alignItems="center">
                            <MaterialIcon name="wallet-outline" />
                            <Text>Billing</Text>
                        </HStack>
                    </OptionSheet.Item>
                    <OptionSheet.Item onPress={onOrgTemplatesPress}>
                        <HStack space={4} alignItems="center">
                            <MaterialIcon name="content-copy" />
                            <Text>Templates</Text>
                        </HStack>
                    </OptionSheet.Item>
                </OptionSheet.Content>
            </OptionSheet.Container>
        </ScreenContainer>
    )
}
