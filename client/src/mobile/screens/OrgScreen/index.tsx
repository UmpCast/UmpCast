import { Heading, HStack, Text, useDisclose, VStack } from 'native-base'

import OverlaySheet from '@/components/OverlaySheet'
import DividedList from '@/components/DividedList'
import MaterialIcon from '@/components/MaterialIcon'
import ScreenContainer from '@/components/ScreenContainer'
import OrgLogo from '@/features/OrgLogo'
import { useDeleteOrgMutation } from '@/graphql/mutations/DeleteOrg/index.generated'
import { NavRoute } from '@/mobile/navigation/routes'
import { TabsStackScreenProps } from '@/mobile/navigation/types'

import MenuItem from '../../../components/MenuItem'

import { useScreenQuery } from './index.generated'
import HeaderIconButton from '@/components/HeaderIconButton'
import { alertCancelButton } from '@/components/Alert'
import { Alert } from 'react-native'
import showAlert from '@/components/showAlert'
import { useRemoveOrgMemberMutation } from '@/graphql/mutations/RemoveOrgMember/index.generated'

type Props = TabsStackScreenProps<NavRoute.Org>

export default function OrgScreen({ route, navigation }: Props) {
    const { params } = route
    const { popToTop, navigate } = navigation
    const { orgId } = params

    const optionSheetDisclose = useDisclose()

    const [, deleteOrg] = useDeleteOrgMutation()

    const [, removeOrgMember] = useRemoveOrgMemberMutation()

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
        navigate(NavRoute.OrgAbout, {
            orgId
        })
    }

    const onOrgLeavePress =() => {
        showAlert({
            title: 'Leave Organization',
            buttons: [{
                text: 'Cancel',
                style: 'cancel'
            }, {
                text: 'Confirm',
                style: 'destructive',
                onPress: async () => {
                    await removeOrgMember({
                        input: {
                            organizationId: orgId,
                            userId: null
                        }
                    })

                    popToTop()
                }
            }]
        })
    }

    const onOrgDeletePress = () => {
        Alert.alert('Delete Organization', undefined, [
            alertCancelButton,
            {
                text: 'Confirm',
                style: 'destructive',
                onPress: async () => {
                    await deleteOrg({
                        input: {
                            organizationId: orgId
                        }
                    })
                    popToTop()
                }
            }
        ])
    }

    const onOrgMembersPress = (orgId: string) => {
        navigate(NavRoute.OrgMembers, {
            orgId
        })
    }

    const onOrgSeasonsPress = (orgId: string) => {
        navigate(NavRoute.OrgSeasons, {
            orgId
        })
    }

    const onOrgBillingPress = () => {}

    const onOrgTemplatesPress = () => {}

    return (
        <ScreenContainer
            headerRight={
                <HeaderIconButton
                    name="dots-horizontal"
                    variant="secondary"
                    onPress={onOptionsPress}
                />
            }
            title="Organization"
        >
            <VStack space="lg">
                <VStack space="md">
                    <VStack alignItems="center">
                        <OrgLogo org={org} size="2xl" circle={true} />
                    </VStack>
                    <VStack alignItems="center" space="2xs">
                        <HStack
                            alignItems="center"
                            justifyContent="space-between"
                            space="md"
                        >
                            <Heading>{org.name}</Heading>
                        </HStack>
                        <Text color="secondary.mute">{org.description}</Text>
                    </VStack>
                </VStack>
                <DividedList.Group>
                    <DividedList.Item onPress={() => onOrgMembersPress(org.id)}>
                        <HStack
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Text>Members</Text>
                            <HStack alignItems="center" space="md">
                                <HStack alignItems="center">
                                    <Text color="secondary.mute">27</Text>
                                    <MaterialIcon
                                        color="secondary.mute"
                                        name="account"
                                    />
                                </HStack>
                                <MaterialIcon
                                    color="primary.solid"
                                    name="chevron-right"
                                />
                            </HStack>
                        </HStack>
                    </DividedList.Item>
                    <DividedList.Item onPress={() => onOrgSeasonsPress(org.id)}>
                        <HStack
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Text>Seasons</Text>
                            <HStack alignItems="center" space="md">
                                <HStack alignItems="center" space="2xs">
                                    <MaterialIcon
                                        color="primary.solid"
                                        name="record"
                                        size="xs"
                                    />
                                    <Text color="secondary.mute">3 active</Text>
                                </HStack>
                                <MaterialIcon
                                    color="primary.solid"
                                    name="chevron-right"
                                />
                            </HStack>
                        </HStack>
                    </DividedList.Item>
                </DividedList.Group>
            </VStack>
            <OverlaySheet.Content {...optionSheetDisclose}>
                <OverlaySheet.Item onPress={onOrgAboutPress}>
                    <MenuItem
                        icon={
                            <MaterialIcon
                                name="information-outline"
                                color="primary.solid"
                            />
                        }
                    >
                        <Text>About</Text>
                    </MenuItem>
                </OverlaySheet.Item>
                <OverlaySheet.Item onPress={onOrgBillingPress}>
                    <MenuItem
                        icon={
                            <MaterialIcon
                                name="wallet-outline"
                                color="primary.solid"
                            />
                        }
                    >
                        <Text>Billing</Text>
                    </MenuItem>
                </OverlaySheet.Item>
                <OverlaySheet.Item onPress={onOrgTemplatesPress}>
                    <MenuItem
                        icon={
                            <MaterialIcon
                                name="content-copy"
                                color="primary.solid"
                            />
                        }
                    >
                        <Text>Templates</Text>
                    </MenuItem>
                </OverlaySheet.Item>
                <OverlaySheet.Item onPress={onOrgLeavePress}>
                    <MenuItem
                        icon={
                            <MaterialIcon
                                name="logout"
                                color="danger.solid"
                            />
                        }
                    >
                        <Text color="danger.solid" bold>
                            Leave
                        </Text>
                    </MenuItem>
                </OverlaySheet.Item>
                <OverlaySheet.Item onPress={onOrgDeletePress}>
                    <MenuItem
                        icon={
                            <MaterialIcon
                                name="delete-outline"
                                color="danger.solid"
                            />
                        }
                    >
                        <Text color="danger.solid" bold>
                            Delete
                        </Text>
                    </MenuItem>
                </OverlaySheet.Item>
            </OverlaySheet.Content>
        </ScreenContainer>
    )
}
