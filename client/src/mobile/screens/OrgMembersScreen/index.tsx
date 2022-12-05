import { Heading, useDisclose, Text, VStack, Box } from 'native-base'

import ActionButton from '@/components/ActionButton'
import OverlaySheet from '@/components/OverlaySheet'
import ScreenContainer from '@/components/ScreenContainer'
import Subheader from '@/components/Subheader'
import { ORG_JOIN_CODE_OFFSET } from '@/config/constants'
import { NavRoute } from '@/mobile/navigation/routes'
import { TabsStackScreenProps } from '@/mobile/navigation/types'
import { OrganizationMemberRoleType } from '@/mock/schema.generated'

import UserItem from '../../../features/UserItem/index'

import {
    OrgMembersScreen_OrganizationMemberFragment as OrgMember,
    useScreenQuery
} from './index.generated'
import { useRemoveOrgMemberMutation } from '@/graphql/mutations/RemoveOrgMember/index.generated'
import showAlert from '@/components/showAlert'
import { useState } from 'react'
import MenuItem from '@/components/MenuItem'
import MaterialIcon from '@/components/MaterialIcon'

type Props = TabsStackScreenProps<NavRoute.OrgMembers>

export default function OrgMembersScreen({ route }: Props) {
    const { params } = route
    const { orgId } = params

    const [{ data: screenData }] = useScreenQuery({
        variables: {
            orgId
        }
    })

    const [, removeOrgMember] = useRemoveOrgMemberMutation()

    const inviteSheetDisclose = useDisclose()
    const memberSheetDisclose = useDisclose()

    const [selectedMember, setSelectedMemberId] = useState<OrgMember>()

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

    const onMemberPress = (member: OrgMember) => {
        setSelectedMemberId(member)
        memberSheetDisclose.onOpen()
    }

    const onRemovePress = (member: OrgMember) => {
        showAlert({
            title: 'Remove member',
            buttons: [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Confirm',
                    style: 'destructive',
                    onPress: async () => {
                        await removeOrgMember({
                            input: {
                                organizationId: orgId,
                                userId: member.user.id
                            }
                        })

                        memberSheetDisclose.onClose()
                    }
                }
            ]
        })
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
                            return (
                                <UserItem
                                    key={user.id}
                                    user={user}
                                    onPress={() => onMemberPress(owner)}
                                />
                            )
                        })}
                    </VStack>
                )}
                {members.length > 0 && (
                    <VStack space="2xs">
                        <Subheader>Members</Subheader>
                        {members.map((member) => {
                            const { user } = member
                            return (
                                <UserItem
                                    key={user.id}
                                    user={user}
                                    onPress={() => onMemberPress(member)}
                                />
                            )
                        })}
                    </VStack>
                )}
            </VStack>
            <OverlaySheet.Content {...inviteSheetDisclose}>
                <OverlaySheet.Container>
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
                </OverlaySheet.Container>
            </OverlaySheet.Content>
            {selectedMember && (
                <OverlaySheet.Content {...memberSheetDisclose}>
                    {selectedMember.viewerCanRemove && (
                        <OverlaySheet.Item
                            onPress={() => onRemovePress(selectedMember)}
                        >
                            <MenuItem
                                icon={
                                    <MaterialIcon
                                        color="danger.solid"
                                        name="account-off"
                                    />
                                }
                            >
                                <Text color="danger.solid">Remove</Text>
                            </MenuItem>
                        </OverlaySheet.Item>
                    )}
                </OverlaySheet.Content>
            )}
        </ScreenContainer>
    )
}
