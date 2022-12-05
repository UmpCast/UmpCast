import { HStack, VStack, Text, Heading, useDisclose } from 'native-base'

import OverlaySheet from '@/components/OverlaySheet'
import SurfaceList from '@/components/DividedList'
import MaterialIcon from '@/components/MaterialIcon'
import MenuItem from '@/components/MenuItem'
import Navigable from '@/components/Navigable'
import ScreenContainer from '@/components/ScreenContainer'
import OrgLogo from '@/features/OrgLogo'
import { NavRoute } from '@/mobile/navigation/routes'
import { TabsStackScreenProps } from '@/mobile/navigation/types'

import { useScreenQuery } from './index.generated'
import NxIconButton from '@/components/IconButton'
import React from 'react'
import TextPressable from '@/components/TextPressable'
import HeaderIconButton from '@/components/HeaderIconButton'

type Props = TabsStackScreenProps<NavRoute.Season>

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
        navigate(NavRoute.SeasonCalendar, {
            seasonId
        })
    }

    const onParticipantsPress = () => {
        navigate(NavRoute.SeasonParticipants, {
            seasonId
        })
    }

    const onAboutPress = () => {
        optionSheetDisclose.onClose()

        navigate(NavRoute.SeasonAbout, {
            seasonId
        })
    }

    const onOrgPress = () => {
        navigate(NavRoute.Org, {
            orgId: season.organization.id
        })
    }

    const onDivisionsPress = () => {
        optionSheetDisclose.onClose()

        navigate(NavRoute.SeasonDivisions, {
            seasonId
        })
    }

    return (
        <ScreenContainer
            headerRight={
                <HeaderIconButton
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
                        <TextPressable
                            size="sm"
                            variant="secondary.ghost"
                            onPress={onOrgPress}
                        >
                            <Text color="secondary.mute" fontSize="sm">
                                {org.name}
                            </Text>
                        </TextPressable>
                    </HStack>
                    <Heading>{season.name}</Heading>
                </VStack>
                <SurfaceList.Group>
                    <SurfaceList.Item onPress={onCalendarPress}>
                        <Navigable>
                            <MenuItem icon={<MaterialIcon name="calendar" />}>
                                <Text>Calendar</Text>
                            </MenuItem>
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
                            <MenuItem icon={<MaterialIcon name="account" />}>
                                <Text>Participants</Text>
                            </MenuItem>
                        </Navigable>
                    </SurfaceList.Item>
                </SurfaceList.Group>
            </VStack>
            <OverlaySheet.Content {...optionSheetDisclose}>
                <OverlaySheet.Item onPress={onAboutPress}>
                    <HStack alignItems="center" space="sm">
                        <MaterialIcon name="information-outline" />
                        <Text>About</Text>
                    </HStack>
                </OverlaySheet.Item>
                <OverlaySheet.Item onPress={onDivisionsPress}>
                    <HStack alignItems="center" space="sm">
                        <MaterialIcon name="subdirectory-arrow-right" />
                        <Text>Divisions</Text>
                    </HStack>
                </OverlaySheet.Item>
            </OverlaySheet.Content>
        </ScreenContainer>
    )
}
