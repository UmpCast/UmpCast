import OrgProfileLogo from '@/features/Org/core/Profile/Logo'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import DividedList from '@/nx/components/DividedList'
import MaterialIcon from '@/nx/components/MaterialIcon'
import ScreenContainer from '@/nx/components/ScreenContainer'
import Subheader from '@/nx/components/Subheader'
import TextBox from '@/nx/components/TextBox'
import OrgLogo from '@/nx/features/OrgLogo'
import { Box, Heading, HStack, Text, VStack } from 'native-base'
import { useScreenQuery } from './index.generated'
import Section from '../../../components/Section'
import PressableX from '@/nx/components/PressableX'

type Props = RootStackScreenProps<RootStackRoute.CreateSeason>

export default function OrgScreen({ navigation, route }: Props) {
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
            <OrgProfileLogo size="75px" org={org} />
                <HStack justifyContent="space-between" space={2}>
                    <VStack alignSelf="center" flex={1} space={1}>
                        <HStack space={4} justifyContent="space-between" alignItems="center">
                            <Heading>Palo Alto Little League</Heading>
                        </HStack>
                        <Text color="secondary.400">Ages 7 - 15 for kids in the PA Bay Area</Text>
                    </VStack>
                </HStack>
                <HStack justifyContent="space-between" alignItems="center" mr={2}>
                    <HStack space={4} alignItems="center">
                        <MaterialIcon name="map-marker" color="secondary.600" size="lg" />
                        <Text>Palo Alto CA</Text>
                    </HStack>
                    <PressableX borderRadius="full" variant="primary.ghost" p={1}>
                        <MaterialIcon name="arrow-top-right" color="primary.600" />
                    </PressableX>
                </HStack>
                <HStack justifyContent="space-between" alignItems="center" mr={2}>
                    <HStack space={4} alignItems="center">
                        <MaterialIcon name="email" color="secondary.600" size="lg" />
                        <Text>bob@pabaseball.org</Text>
                    </HStack>
                    <PressableX borderRadius="full" variant="primary.ghost" p={1}>
                        <MaterialIcon name="arrow-top-right" color="primary.600" />
                    </PressableX>
                </HStack>
                <DividedList.Container mt={2}>
                    <DividedList.Item>
                        <HStack justifyContent="space-between" alignItems="center">
                            <Text>Members</Text>
                            <HStack space={4} alignItems="center">
                                <HStack alignItems="center">
                                    <Text color="secondary.400">27</Text>
                                    <MaterialIcon name="account" color="secondary.400" />
                                </HStack>
                                <MaterialIcon name="chevron-right" color="primary.600" />
                            </HStack>
                        </HStack>
                    </DividedList.Item>
                    <DividedList.Item>
                        <HStack justifyContent="space-between" alignItems="center">
                            <Text>Seasons</Text>
                            <HStack space={4} alignItems="center">
                                <HStack alignItems="center" space={1}>
                                    <MaterialIcon name="record" color="primary.600" size="xs" />
                                    <Text color="secondary.400">3 active</Text>
                                </HStack>
                                <MaterialIcon name="chevron-right" color="primary.600" />
                            </HStack>
                        </HStack>
                    </DividedList.Item>
                </DividedList.Container>
            </VStack>
        </ScreenContainer>
    )
}
