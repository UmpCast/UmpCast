import ListItem from '@/components/List/Item'
import ScreenContainer from '@/components/Screen/Container'
import UserAvatar from '@/features/User/Avatar'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import {
    Box,
    Checkbox,
    Divider,
    HStack,
    Icon,
    Input,
    Text,
    VStack
} from 'native-base'
import { useScreenQuery, useSensitiveDetailsQuery } from './index.generated'
import { Feather } from '@expo/vector-icons'

export type SeasonGameNewScreenProps =
    RootStackScreenProps<RootStackRoute.SeasonParticipantProfile>

export default function SeasonParticipantProfileScreen({
    route
}: SeasonGameNewScreenProps) {
    const { params } = route
    const { seasonId, userId } = params

    const [sensitiveDetailsResp] = useSensitiveDetailsQuery({
        variables: {
            seasonId,
            userId
        }
    })

    const canReadSensitiveDetails =
        sensitiveDetailsResp.data?.season?.participant
            .viewerCanReadSensitiveDetails

    const [screenResp] = useScreenQuery({
        variables: {
            seasonId,
            userId,
            includeSensitive: canReadSensitiveDetails as boolean
        },
        pause: canReadSensitiveDetails == null
    })

    if (!screenResp.data?.season) return null

    const season = screenResp.data.season
    const user = season.participant.node
    const { visibility, roles } = season.participant.permit

    const {
        firstName,
        lastName,
        phoneNumber,
        city,
        state,
        zipCode,
        streetAddress
    } = user

    if (!season) return null

    return (
        <ScreenContainer>
            <VStack space={4}>
                <VStack alignItems="center" space={3}>
                    <UserAvatar user={user} size="2xl" />
                    <Text fontSize="xl" bold color="primary.700">
                        {firstName} {lastName}
                    </Text>
                </VStack>
                <VStack space={2}>
                    <Text bold color="primary.700">
                        Phone Number
                    </Text>
                    <Input
                        value={phoneNumber ?? undefined}
                        size="md"
                        py={3}
                        rightElement={
                            <Icon
                                as={Feather}
                                name="edit"
                                size="sm"
                                color="secondary.200"
                                mr={3}
                            />
                        }
                    />
                </VStack>
                {canReadSensitiveDetails && (
                    <VStack space={2}>
                        <Text bold color="primary.700">
                            Address
                        </Text>
                        <Input
                            value={`${streetAddress} ${city}, ${state} ${zipCode}`}
                            size="md"
                            py={3}
                            rightElement={
                                <Icon
                                    as={Feather}
                                    name="edit"
                                    size="sm"
                                    color="secondary.200"
                                    mr={3}
                                />
                            }
                        />
                    </VStack>
                )}
                {canReadSensitiveDetails && (
                    <VStack space={2}>
                        <Text bold color="primary.700">
                            Visibility
                        </Text>
                        <VStack
                            space={2.5}
                            divider={<Divider bg="white" />}
                            bg="secondary.100"
                            rounded="sm"
                            p={3}
                        >
                            {[
                                'AAA / Base',
                                'AAA / Plate',
                                'PCL / Base',
                                'PCL / Plate',
                                'Majors / Base',
                                'Majors / Plate'
                            ].map((name) => {
                                return (
                                    <HStack
                                        space={2}
                                        rounded="sm"
                                        justifyContent="space-between"
                                    >
                                        <Text>
                                            <HStack
                                                space={2}
                                                alignItems="center"
                                            >
                                                <Icon
                                                    as={Feather}
                                                    size="sm"
                                                    name="user"
                                                    color="secondary.400"
                                                />
                                                <Text>{name}</Text>
                                            </HStack>
                                        </Text>
                                        <Checkbox
                                            isDisabled={true}
                                            isChecked={true}
                                            value="ax"
                                        />
                                    </HStack>
                                )
                            })}
                        </VStack>
                    </VStack>
                )}
            </VStack>
        </ScreenContainer>
    )
}
