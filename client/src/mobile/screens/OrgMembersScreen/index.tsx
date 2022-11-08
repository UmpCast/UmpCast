import { Heading, useDisclose, Text, VStack, Box } from 'native-base'

import ActionButton from '@/components/ActionButton'
import ActionsheetX from '@/components/OptionSheet'
import ScreenContainer from '@/components/ScreenContainer'
import Subheader from '@/components/Subheader'
import { ORG_JOIN_CODE_OFFSET } from '@/config/constants'
import { TabsStackRoute } from '@/mobile/navigation/navigators/TabsStack/types'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import { OrganizationMemberRoleType } from '@/mock/schema.generated'

import UserItem from '../../../features/UserItem/index'

import { useScreenQuery } from './index.generated'

type Props = RootStackScreenProps<TabsStackRoute.OrgMembers>

export default function OrgMembersScreen({ route }: Props) {
    const { params } = route
    const { orgId } = params

    const [{ data: screenData }] = useScreenQuery({
        variables: {
            orgId
        }
    })

    const inviteSheetDisclose = useDisclose()

    if (!screenData) {
        return null
    }

    const { organization: org } = screenData

    const owners = org.members.filter(
        (member) => member.membership.role === OrganizationMemberRoleType.Owner
    )
    const members = org.members.filter(
        (member) => member.membership.role === OrganizationMemberRoleType.Member
    )

    const onInvitePress = () => {
        inviteSheetDisclose.onOpen()
    }

    return (
        <ScreenContainer
            headerRight={
                <ActionButton onPress={onInvitePress}>Invite</ActionButton>
            }
            title="Members"
        >
            <VStack space="sm">
                {owners.length > 0 && (
                    <VStack space="2xs">
                        <Subheader>Owners</Subheader>
                        {owners.map((owner) => {
                            const { user } = owner
                            return <UserItem key={user.id} user={user} />
                        })}
                    </VStack>
                )}
                {members.length > 0 && (
                    <VStack space="2xs">
                        <Subheader>Members</Subheader>
                        {members.map((member) => {
                            const { user } = member
                            return <UserItem key={user.id} user={user} />
                        })}
                    </VStack>
                )}
            </VStack>
            <ActionsheetX.Content {...inviteSheetDisclose}>
                <Box p={3}>
                    <VStack space="xs">
                        <VStack>
                            <Text bold>Invite Code</Text>
                            <Text color="secondary.mute">
                                Send users the invite code below to join
                            </Text>
                        </VStack>
                        <Heading alignSelf="center" color="primary.solid">
                            {ORG_JOIN_CODE_OFFSET + Number(org.id)}
                        </Heading>
                    </VStack>
                </Box>
            </ActionsheetX.Content>
        </ScreenContainer>
    )
}
