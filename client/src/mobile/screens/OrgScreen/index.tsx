import { Heading, HStack, Text, useDisclose, VStack } from 'native-base'

import OptionSheet from '@/components/AppActionsheet'
import DividedList from '@/components/DividedList'
import MaterialIcon from '@/components/MaterialIcon'
import AppPressable from '@/components/AppPressable'
import ScreenContainer from '@/components/ScreenContainer'
import OrgLogo from '@/features/OrgLogo'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'

import { useScreenQuery } from './index.generated'
import OptionsButton from '@/components/OptionsButton'
import { useDeleteOrgMutation } from '@/graphql/mutations/DeleteOrg/index.generated'
import IconOption from '../../../components/MenuItem'

type Props = RootStackScreenProps<RootStackRoute.Org>

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
        navigate(RootStackRoute.OrgAbout, {
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
        navigate(RootStackRoute.OrgMembers, {
            orgId
        })
    }

    const onOrgSeasonsPress = (orgId: string) => {
        navigate(RootStackRoute.OrgSeasons, {
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
                        <HStack alignItems="center" justifyContent="space-between" space="md">
                            <Heading>Palo Alto Little League</Heading>
                        </HStack>
                        <Text color="secondary.mute">Ages 7 - 15 for kids in the PA Bay Area</Text>
                    </VStack>
                </VStack>
                <DividedList.Group>
                    <DividedList.Item onPress={() => onOrgMembersPress(org.id)}>
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
                    <DividedList.Item onPress={() => onOrgSeasonsPress(org.id)}>
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
                    <IconOption
                        icon={<MaterialIcon name="information-outline" color="primary.solid" />}
                    >
                        <Text>About</Text>
                    </IconOption>
                </OptionSheet.Item>
                <OptionSheet.Item onPress={onOrgBillingPress}>
                    <IconOption icon={<MaterialIcon name="wallet-outline" color="primary.solid" />}>
                        <Text>Billing</Text>
                    </IconOption>
                </OptionSheet.Item>
                <OptionSheet.Item onPress={onOrgTemplatesPress}>
                    <IconOption icon={<MaterialIcon name="content-copy" color="primary.solid" />}>
                        <Text>Templates</Text>
                    </IconOption>
                </OptionSheet.Item>
                <OptionSheet.Item onPress={() => onOrgDeletePress(org.id)}>
                    <IconOption icon={<MaterialIcon name="delete-outline" color="danger.solid" />}>
                        <Text color="danger.solid" bold>
                            Delete
                        </Text>
                    </IconOption>
                </OptionSheet.Item>
            </OptionSheet.Content>
        </ScreenContainer>
    )
}
