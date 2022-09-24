import { Heading, HStack, Text, VStack } from 'native-base'

import OrgProfileLogo from '@/features/Org/core/Profile/Logo'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import DividedList from '@/nx/components/DividedList'
import MaterialIcon from '@/nx/components/MaterialIcon'
import ScreenContainer from '@/nx/components/ScreenContainer'

import { useScreenQuery } from './index.generated'

type Props = RootStackScreenProps<RootStackRoute.CreateSeason>

export default function OrgScreen({ route }: Props) {
    const { params } = route
    const { orgId } = params

    const [{ data }] = useScreenQuery({
        variables: {
            orgId
        }
    })

    if (!data?.organization) {
        return null
    }

    const { organization: org } = data

    return (
        <ScreenContainer title="Organization">
            <VStack space={4}>
                <VStack alignItems="center">
                    <OrgProfileLogo org={org} size="75px" />
                </VStack>
                <VStack alignItems="center" space={1}>
                    <HStack alignItems="center" justifyContent="space-between" space={4}>
                        <Heading>Palo Alto Little League</Heading>
                    </HStack>
                    <Text color="secondary.400">Ages 7 - 15 for kids in the PA Bay Area</Text>
                </VStack>
                {/* <VStack space={4}>
                    <HStack justifyContent="space-between" alignItems="center" mr={2}>
                        <HStack space={3} alignItems="center">
                            <MaterialIcon name="map-marker" color="secondary.600" size="lg" />
                            <Text>Palo Alto CA</Text>
                        </HStack>
                        <PressableX borderRadius="full" variant="primary.ghost" p={1}>
                            <MaterialIcon name="arrow-top-right" color="primary.600" size="sm"/>
                        </PressableX>
                    </HStack>
                    <HStack justifyContent="space-between" alignItems="center" mr={2}>
                        <HStack space={3} alignItems="center">
                            <MaterialIcon name="email" color="secondary.600" size="lg" />
                            <Text>bob@pabaseball.org</Text>
                        </HStack>
                        <PressableX borderRadius="full" variant="primary.ghost" p={1}>
                            <MaterialIcon name="arrow-top-right" color="primary.600" size="sm"/>
                        </PressableX>
                    </HStack>
                </VStack> */}
                <DividedList.Container mt={2}>
                    <DividedList.Item>
                        <HStack alignItems="center" justifyContent="space-between">
                            <Text>Members</Text>
                            <HStack alignItems="center" space={4}>
                                <HStack alignItems="center">
                                    <Text color="secondary.400">27</Text>
                                    <MaterialIcon color="secondary.400" name="account" />
                                </HStack>
                                <MaterialIcon color="primary.600" name="chevron-right" />
                            </HStack>
                        </HStack>
                    </DividedList.Item>
                    <DividedList.Item>
                        <HStack alignItems="center" justifyContent="space-between">
                            <Text>Seasons</Text>
                            <HStack alignItems="center" space={4}>
                                <HStack alignItems="center" space={1}>
                                    <MaterialIcon color="primary.600" name="record" size="xs" />
                                    <Text color="secondary.400">3 active</Text>
                                </HStack>
                                <MaterialIcon color="primary.600" name="chevron-right" />
                            </HStack>
                        </HStack>
                    </DividedList.Item>
                </DividedList.Container>
            </VStack>
        </ScreenContainer>
    )
}
