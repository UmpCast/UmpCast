import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import DividedList from '@/nx/components/DividedList'
import MaterialIcon from '@/nx/components/MaterialIcon'
import OptionSheet from '@/nx/components/OptionSheet'
import PressableX from '@/nx/components/PressableX'
import ScreenContainer from '@/nx/components/ScreenContainer'
import OrgLogo from '@/nx/features/OrgLogo'
import { HStack, VStack, Text, Heading, useDisclose } from 'native-base'
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
            title="Season"
            headerRight={
                <PressableX
                    borderRadius="full"
                    onPress={onShowOptionsPress}
                    size="icon"
                    variant="secondary.ghost"
                >
                    <MaterialIcon name="dots-horizontal" size="lg" />
                </PressableX>
            }
        >
            <VStack space="md">
                <VStack space="xs">
                    <HStack space="xs" alignItems="center">
                        <OrgLogo org={org} size="xs" />
                        <Text color="secondary.mute" fontWeight="semibold" fontSize="sm">
                            {org.name}
                        </Text>
                    </HStack>
                    <Heading>{season.name}</Heading>
                </VStack>
                <DividedList.Container>
                    <DividedList.NavigationItem
                        name="Calendar"
                        onPress={onCalendarPress}
                        icon={<MaterialIcon name="calendar" />}
                    />
                    <DividedList.NavigationItem
                        name="Participants"
                        onPress={onParticipantsPress}
                        icon={<MaterialIcon name="account" />}
                        extra={<Text color="secondary.mute">{season.participantCount}</Text>}
                    />
                </DividedList.Container>
            </VStack>
            <OptionSheet.Content {...optionSheetDisclose}>
                <OptionSheet.Item onPress={onAboutPress}>
                    <HStack space="sm" alignItems="center">
                        <MaterialIcon name="information-outline" />
                        <Text>About</Text>
                    </HStack>
                </OptionSheet.Item>
                <OptionSheet.Item onPress={onDivisionsPress}>
                    <HStack space="sm" alignItems="center">
                        <MaterialIcon name="subdirectory-arrow-right" />
                        <Text>Divisions</Text>
                    </HStack>
                </OptionSheet.Item>
            </OptionSheet.Content>
        </ScreenContainer>
    )
}
