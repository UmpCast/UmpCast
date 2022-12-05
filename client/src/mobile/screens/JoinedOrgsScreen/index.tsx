import { HStack, Text, useDisclose, VStack } from 'native-base'

import ActionsheetX from '@/components/OverlaySheet'
import DividedList from '@/components/DividedList'
import MaterialIcon from '@/components/MaterialIcon'
import MenuItem from '@/components/MenuItem'
import ScreenContainer from '@/components/ScreenContainer'
import OrgLogo from '@/features/OrgLogo'
import { NavRoute } from '@/mobile/navigation/routes'
import { TabsStackScreenProps } from '@/mobile/navigation/types'

import { useScreenQuery } from './index.generated'
import React from 'react'
import NxIconButton from '@/components/IconButton'

type Props = TabsStackScreenProps<NavRoute.JoinedOrgs>

export default function JoinedOrgsScreen({ navigation }: Props) {
    const { navigate } = navigation

    const addOrgSheetDisclose = useDisclose()

    const [{ data: screenData }] = useScreenQuery()

    if (!screenData) {
        return null
    }

    const { viewer } = screenData

    const onOrgPress = (orgId: string) => {
        navigate(NavRoute.Org, {
            orgId
        })
    }

    const onCreateNewPress = () => {
        navigate(NavRoute.CreateOrg)
        addOrgSheetDisclose.onClose()
    }

    const onJoinExistingPress = () => {
        navigate(NavRoute.JoinOrg)
        addOrgSheetDisclose.onClose()
    }

    const onAddOrgPress = () => {
        addOrgSheetDisclose.onOpen()
    }

    return (
        <ScreenContainer
            title="Organizations"
            headerRight={
                <NxIconButton variant="primary.ghost" onPress={onAddOrgPress}>
                    <MaterialIcon name="plus" color="primary.solid" size="lg" />
                </NxIconButton>
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
                    <MenuItem
                        icon={
                            <MaterialIcon name="plus" color="primary.solid" />
                        }
                    >
                        <Text>Create new</Text>
                    </MenuItem>
                </ActionsheetX.Item>
                <ActionsheetX.Item onPress={onJoinExistingPress}>
                    <MenuItem
                        icon={
                            <MaterialIcon name="check" color="primary.solid" />
                        }
                    >
                        <Text>Join existing</Text>
                    </MenuItem>
                </ActionsheetX.Item>
            </ActionsheetX.Content>
        </ScreenContainer>
    )
}
