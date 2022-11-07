import { HStack, VStack, Text, Heading, useDisclose } from 'native-base'

import OptionSheet from '@/components/AppActionsheet'
import SurfaceList from '@/components/DividedList'
import IconButton from '@/components/IconButton'
import MaterialIcon from '@/components/MaterialIcon'
import IconOption from '@/components/MenuItem'
import Navigable from '@/components/Navigable'
import ScreenContainer from '@/components/ScreenContainer'
import OrgLogo from '@/features/OrgLogo'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'

import { useScreenQuery } from './index.generated'

type Props = RootStackScreenProps<RootStackRoute.Season>

export default function SeasonScreen({ navigation, route }: Props) {
    const { navigate } = navigation
    const { params } = route

    const { seasonId } = params

    const [{ data: screenData }] = useScreenQuery({
        variables: {
            seasonId
        }
    })

    const optionSheetDisclose = useDisclose()

    if (!screenData) {
        return null
    }

    const { season } = screenData
    const { organization: org } = season

    const onShowOptionsPress = () => {
        optionSheetDisclose.onOpen()
    }

    const onCalendarPress = () => {
        navigate(RootStackRoute.SeasonCalendar, {
            seasonId
        })
    }

    const onParticipantsPress = () => {
        navigate(RootStackRoute.SeasonParticipants, {
            seasonId
        })
    }

    const onAboutPress = () => {
        optionSheetDisclose.onClose()

        navigate(RootStackRoute.SeasonAbout, {
            seasonId
        })
    }

    const onDivisionsPress = () => {
        optionSheetDisclose.onClose()

        navigate(RootStackRoute.SeasonDivisions, {
            seasonId
        })
    }

    return (
        <ScreenContainer
            headerRight={
                <IconButton
                    name="dots-horizontal"
                    variant="secondary"
                    onPress={onShowOptionsPress}
                />
            }
            title="Season"
        >
            <VStack space="md">
                <VStack space="xs">
                    <HStack alignItems="center" space="xs">
                        <OrgLogo org={org} size="xs" />
                        <Text
                            color="secondary.mute"
                            fontSize="sm"
                            fontWeight="semibold"
                        >
                            {org.name}
                        </Text>
                    </HStack>
                    <Heading>{season.name}</Heading>
                </VStack>
                <SurfaceList.Group>
                    <SurfaceList.Item onPress={onCalendarPress}>
                        <Navigable>
                            <IconOption icon={<MaterialIcon name="calendar" />}>
                                <Text>Calendar</Text>
                            </IconOption>
                        </Navigable>
                    </SurfaceList.Item>
                    <SurfaceList.Item onPress={onParticipantsPress}>
                        <Navigable
                            extra={
                                <Text color="secondary.mute">
                                    {season.participantCount}
                                </Text>
                            }
                        >
                            <IconOption icon={<MaterialIcon name="account" />}>
                                <Text>Participants</Text>
                            </IconOption>
                        </Navigable>
                    </SurfaceList.Item>
                </SurfaceList.Group>
            </VStack>
            <OptionSheet.Content {...optionSheetDisclose}>
                <OptionSheet.Item onPress={onAboutPress}>
                    <HStack alignItems="center" space="sm">
                        <MaterialIcon name="information-outline" />
                        <Text>About</Text>
                    </HStack>
                </OptionSheet.Item>
                <OptionSheet.Item onPress={onDivisionsPress}>
                    <HStack alignItems="center" space="sm">
                        <MaterialIcon name="subdirectory-arrow-right" />
                        <Text>Divisions</Text>
                    </HStack>
                </OptionSheet.Item>
            </OptionSheet.Content>
        </ScreenContainer>
    )
}
