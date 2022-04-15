import { AntDesign } from '@expo/vector-icons'
import { VStack, Box, Heading, HStack, Button, Icon } from 'native-base'

import OrgSeasonListItem from '@/features/OrgSeason/core/List/Item'
import { useOrganizationSeasonsScreenQuery } from '@/generated'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/screenProps'
import { buildID, IconID, TestID } from '@/testing/testID'

type ScreenProps = RootStackScreenProps<RootStackRoute.OrganizationSeasons>

export default function OrganizationSeasonsScreen({
    navigation,
    route
}: ScreenProps) {
    const { navigate } = navigation
    const {
        params: { orgId }
    } = route
    const [{ data }] = useOrganizationSeasonsScreenQuery({
        variables: {
            id: orgId
        }
    })

    if (!data?.organization?.seasons) return null

    const { seasons } = data.organization

    return (
        <Box p={4}>
            <VStack space={4}>
                <HStack alignItems="center" justifyContent="space-between">
                    <Heading size="sm">Active</Heading>
                    <Button
                        borderRadius={100}
                        colorScheme="blueGray"
                        onPress={() => {
                            navigate(RootStackRoute.OrganizationSeasonNew, {
                                orgId
                            })
                        }}
                        size="sm"
                        testID={buildID(TestID.ICON, IconID.SEASON_CREATE)}
                        variant="ghost"
                    >
                        <Icon as={AntDesign} color="indigo.500" name="plus" />
                    </Button>
                </HStack>
                <VStack space={4}>
                    {seasons.map(
                        (season) =>
                            season && (
                                <OrgSeasonListItem
                                    key={season.id}
                                    onPress={() => {
                                        navigate(RootStackRoute.Settings, {
                                            seasonId: season.id
                                        })
                                    }}
                                    season={season}
                                />
                            )
                    )}
                </VStack>
            </VStack>
        </Box>
    )
}
