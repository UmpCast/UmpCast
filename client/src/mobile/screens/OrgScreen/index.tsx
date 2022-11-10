import { Heading, HStack, Text, useDisclose, VStack } from 'native-base'

import OptionSheet from '@/components/OptionSheet'
import DividedList from '@/components/DividedList'
import MaterialIcon from '@/components/MaterialIcon'
import OptionsButton from '@/components/OptionsButton'
import ScreenContainer from '@/components/ScreenContainer'
import OrgLogo from '@/features/OrgLogo'
import { useDeleteOrgMutation } from '@/graphql/mutations/DeleteOrg/index.generated'
import { NavRoute } from "@/mobile/navigation/routes"
import { TabsStackScreenProps } from '@/mobile/navigation/types'

import IconOption from '../../../components/MenuItem'

import { useScreenQuery } from './index.generated'

type Props = TabsStackScreenProps<NavRoute.Org>

export default function OrgScreen({ route, navigation }: Props) {
    const { params } = route
    const { pop, navigate } = navigation
    const { orgId } = params

    const optionSheetDisclose = useDisclose()

    const [, deleteOrg] = useDeleteOrgMutation()

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

    const onOrgDeletePress = async (orgId: string) => {
        await deleteOrg({
            input: {
                organizationId: orgId
            }
        })
        pop()
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
            headerRight={<OptionsButton onPress={onOptionsPress} />}
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
                        <Text color="secondary.mute">
                            {org.description}
                        </Text>
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
            <OptionSheet.Content {...optionSheetDisclose}>
                <OptionSheet.Item onPress={onOrgAboutPress}>
                    <IconOption
                        icon={
                            <MaterialIcon
                                name="information-outline"
                                color="primary.solid"
                            />
                        }
                    >
                        <Text>About</Text>
                    </IconOption>
                </OptionSheet.Item>
                <OptionSheet.Item onPress={onOrgBillingPress}>
                    <IconOption
                        icon={
                            <MaterialIcon
                                name="wallet-outline"
                                color="primary.solid"
                            />
                        }
                    >
                        <Text>Billing</Text>
                    </IconOption>
                </OptionSheet.Item>
                <OptionSheet.Item onPress={onOrgTemplatesPress}>
                    <IconOption
                        icon={
                            <MaterialIcon
                                name="content-copy"
                                color="primary.solid"
                            />
                        }
                    >
                        <Text>Templates</Text>
                    </IconOption>
                </OptionSheet.Item>
                <OptionSheet.Item onPress={() => onOrgDeletePress(org.id)}>
                    <IconOption
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
                    </IconOption>
                </OptionSheet.Item>
            </OptionSheet.Content>
        </ScreenContainer>
    )
}
